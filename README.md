# Wildlife Image Classifier

A full-stack deep learning application for classifying wildlife images into ten categories using Convolutional Neural Networks and Transfer Learning.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](#)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](#)

<!-- Placeholder for Hero Screenshot -->
<!-- <img src="docs/assets/demo_screenshot.png" alt="Wildlife Image Classifier Web Interface" width="800"/> -->

---

## Project Overview

This project is an educational machine learning application focused on image classification and AI inference workflows. It utilizes an EfficientNetB3 model to predict the species of an animal from user-uploaded images, achieving a test accuracy of 98.20%.

## Features

- **Classification**: Utilizes an optimized EfficientNetB3 architecture for image prediction.
- **Client-Server Architecture**: Combines a React frontend with a Python FastAPI inference engine.
- **Authentication**: Implements secure OAuth login via Supabase.
- **History Tracking**: Authenticated users have access to their historical prediction data securely managed by Row Level Security (RLS).
- **Deployment Ready**: Containerized using Docker for decoupled frontend and backend deployment.

## System Architecture

<!-- Placeholder for Architecture Diagram -->
<!-- ![System Architecture](docs/assets/system_architecture.png) -->

The application is structured into three primary components:
1. **Frontend (React + Vite)**: Manages user interface state, file uploads, and data presentation.
2. **Inference API (FastAPI)**: Receives image payloads, executes preprocessing required by EfficientNet, and runs predictions using the stored `.keras` model.
3. **Database & Identity (Supabase)**: Provides OAuth session management and PostgreSQL database services for historical data storage.

## Model Architecture

- **Base Architecture**: EfficientNetB3 (pre-trained on ImageNet).
- **Training Method**: Transfer Learning.
- **Rationale**: EfficientNetB3 employs compound scaling to uniformly scale depth, width, and resolution. This architecture provides a robust balance of computational efficiency and high accuracy, improving upon older architectures like VGG16 by requiring fewer parameters while delivering better performance.

## Training Metrics and Evaluation

**Final Test Accuracy**: 98.20%

<!-- Placeholder for Accuracy/Loss Graph -->
<!-- ![Training Accuracy and Loss Graph](docs/assets/accuracy_loss_graph.png) -->
*Training and validation curves showing convergence over epochs.*

<!-- Placeholder for Confusion Matrix -->
<!-- ![Confusion Matrix](docs/assets/confusion_matrix.png) -->
*Confusion matrix indicating true positive rates across classification categories.*

## Dataset

The model is trained on a standardized version of the Animals-10 dataset, strictly partitioned into training, validation, and testing sets to prevent data leakage.
Supported classification categories:
`Dog`, `Cat`, `Horse`, `Spider`, `Butterfly`, `Chicken`, `Sheep`, `Cow`, `Squirrel`, `Elephant`.

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS, TypeScript
- **Backend Services**: Python, FastAPI, Uvicorn
- **Machine Learning**: TensorFlow, Keras
- **Data & Identity**: Supabase (PostgreSQL, Google OAuth)
- **Containerization**: Docker, Nginx, Docker Compose

## Installation and Setup

1. **Environment Configuration:**
   ```bash
   cp .env.example .env
   ```

2. **Required Frontend Variables:**
   Configure the following in your `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_WORKER_API_URL=http://127.0.0.1:8000
   ```

3. **Frontend Initialization:**
   ```bash
   npm install
   npm run dev
   ```

4. **Inference API Initialization (Requires Python 3.9+):**
   ```bash
   cd worker
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Docker Deployment

To launch the complete stack using Docker Compose:
```bash
docker compose up --build
```
The application will be available at `http://localhost:8080`.

## Future Scope

- **User Interface**: Implementation of drag-and-drop file uploads and improved loading states during API requests.
- **Infrastructure**: Migration of the FastAPI inference service to a serverless GPU platform to handle increased traffic loads cost-effectively.
- **Optimization**: Client-side image compression prior to API submission to minimize bandwidth and latency.

## Team

- **Zahid Hussain**: Frontend and Backend Development
- **Deekshanth**: Research and Project Architecture Design
- **Pranav Reddy**: Database and Google OAuth Integration
- **Daryl Joseph**: Model Development and FastAPI Integration
