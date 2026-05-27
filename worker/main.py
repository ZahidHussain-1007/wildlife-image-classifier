from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.applications.efficientnet import preprocess_input
from PIL import Image
import numpy as np
import io
import json
import os
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.keras")
LABELS_PATH = os.path.join(BASE_DIR, "models", "labels.json")
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOADS_DIR, exist_ok=True)

model = None
class_names = None


@app.on_event("startup")
def load_model_and_labels():
    global model, class_names

    if not os.path.exists(MODEL_PATH):
        print(f"Warning: model file not found: {MODEL_PATH}")
        return

    if not os.path.exists(LABELS_PATH):
        print(f"Warning: labels file not found: {LABELS_PATH}")
        return

    print("Loading fine-tuned EfficientNet model...")
    model = tf.keras.models.load_model(MODEL_PATH)

    with open(LABELS_PATH, encoding="utf-8") as f:
        class_names = json.load(f)

    print("Model and labels loaded successfully!")


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "labels_loaded": class_names is not None,
        "model_path": MODEL_PATH,
        "labels_path": LABELS_PATH,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global model, class_names

    if model is None or class_names is None:
        return {
            "error": "Model is not loaded. Check that model.keras and labels.json exist inside worker/models/."
        }

    contents = await file.read()

    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        return {"error": "Invalid image file."}

    safe_filename = Path(file.filename or "uploaded_image.jpg").name
    upload_target = os.path.join(UPLOADS_DIR, safe_filename)
    image.save(upload_target)

    image = image.resize((224, 224))
    img_array = np.array(image, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    predictions = model.predict(img_array)

    highest_index = int(np.argmax(predictions[0]))
    predicted_class = class_names[highest_index].title()
    confidence = round(float(predictions[0][highest_index]) * 100, 2)

    return {
        "prediction": predicted_class,
        "confidence": confidence,
    }