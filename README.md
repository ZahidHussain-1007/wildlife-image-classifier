<div align="center">
  <!-- Placeholder for Hero Screenshot -->
  <!-- <img src="docs/assets/demo_screenshot.png" alt="Animal Predictor Web Interface" width="800"/> -->

  <h1>🐾 Wildlife Classification with EfficientNetB3</h1>
  <p>A portfolio-grade deep learning project classifying wildlife into ten categories using state-of-the-art Convolutional Neural Networks and Transfer Learning.</p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](#)
  [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](#)
  [![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](#)
</div>

---

## 📖 Project Overview

This project is an educational, full-stack deep learning application built as a hands-on exploration of advanced image classification, AI inference workflows, and modern web architectures. It accurately predicts the species of an animal from an uploaded image using an **EfficientNetB3** model, achieving an impressive **98.20% test accuracy**.

## ✨ Features

- **High-Accuracy Predictions**: Uses Google's modern, optimized EfficientNetB3 CNN architecture.
- **Full-Stack Architecture**: A React web client paired with a Python FastAPI AI inference engine.
- **User Authentication**: Secure Google OAuth login using Supabase.
- **Prediction History**: Authenticated users can view their past predictions stored securely via Row Level Security (RLS).
- **Containerized Deployment**: Fully Dockerized environments for frontend and backend separation.

## 🏗️ Architecture Diagram

<!-- Placeholder for Architecture Diagram -->
<!-- ![System Architecture](docs/assets/system_architecture.png) -->

The system is decoupled into three primary services:
1. **Frontend (React + Vite)**: Handles user interaction, image uploading, and results display.
2. **AI Inference Worker (FastAPI)**: Receives images, preprocesses them to match EfficientNet expectations, and runs predictions against the `.keras` model.
3. **Database & Auth (Supabase)**: Manages OAuth sessions and Postgres database interactions.

## 🧠 Model Details

- **Base Model**: `EfficientNetB3` (pre-trained on ImageNet).
- **Technique**: Transfer Learning & Fine-tuning.
- **Why EfficientNetB3?**: Compared to older models like VGG16, EfficientNetB3 uses compound scaling to balance depth, width, and resolution, resulting in far fewer parameters, significantly faster inference times, and much higher accuracy.

## 📈 Training Metrics & Evaluation

**Final Test Accuracy**: `98.20%`

<!-- Placeholder for Accuracy/Loss Graph -->
<!-- ![Training Accuracy & Loss Graph](docs/assets/accuracy_loss_graph.png) -->
*The model exhibited steady convergence during training with minimal overfitting thanks to appropriate regularization and early stopping.*

<!-- Placeholder for Confusion Matrix -->
<!-- ![Confusion Matrix](docs/assets/confusion_matrix.png) -->
*The confusion matrix reveals excellent true positive rates across all classes.*

## 📊 Dataset Info

The model was trained on a modified version of the **Animals-10 dataset**, split into training, validation, and testing sets.
It accurately identifies the following 10 classes:
`Dog`, `Cat`, `Horse`, `Spider`, `Butterfly`, `Chicken`, `Sheep`, `Cow`, `Squirrel`, `Elephant`.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, TypeScript
- **Backend / AI Worker**: Python, FastAPI, Uvicorn
- **Machine Learning**: TensorFlow, Keras
- **Database / Auth**: Supabase (PostgreSQL, Google OAuth)
- **Deployment**: Docker, Nginx, Docker Compose

## 🚀 Installation & Setup

1. **Clone the repository and prepare environment files:**
   ```bash
   cp .env.example .env
   ```

2. **Required frontend environment variables:**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_WORKER_API_URL=http://127.0.0.1:8000
   ```

3. **Install JavaScript dependencies & Run Frontend:**
   ```bash
   npm install
   npm run dev
   ```

4. **Run the AI Inference Worker (Requires Python 3.9+):**
   ```bash
   cd worker
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Docker Deployment

Alternatively, you can spin up the entire frontend and AI worker using Docker:
```bash
docker compose up --build
```
Navigate to `http://localhost:8080` in your browser.

## 🔮 Future Improvements

- **UI/UX**: Add drag-and-drop support for file uploads and skeleton loading states.
- **Serverless GPU**: Migrate the FastAPI inference engine to serverless providers (e.g., Modal, AWS SageMaker) for scale.
- **Payload Optimization**: Compress user images in the browser before sending them to the worker API to reduce latency.

## 👥 Contributors

- **Zahid Hussain**: Frontend and Backend Development
- **Deekshanth**: Research and Project Architecture Design
- **Pranav Reddy**: Database and Google OAuth Integration
- **Daryl Joseph**: Model Development and FastAPI Integration
