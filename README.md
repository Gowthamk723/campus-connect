# 🎓 Campus Lost & Found (CampusConnect)

[![Deploy Status](https://img.shields.io/badge/Vercel-Live-green?style=for-the-badge&logo=vercel)](https://campus-lost-found-nine.vercel.app/
)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**CampusConnect** is a full-stack, AI-powered web application designed to streamline the process of reporting and recovering lost items on college campuses. 

By leveraging a custom AI Image Captioning Model (BLIP), the platform automatically generates highly accurate titles and descriptions from user-uploaded images, removing friction from the reporting process. It also features real-time, secure communication and a comprehensive administrative dashboard.

🚀 **[View Live Demo Here](https://campus-lost-found-nine.vercel.app/
)** *(Note: The AI auto-captioning feature requires the backend Colab instance to be active).*

---

## ✨ Key Features

* **🤖 AI Auto-Generation (BLIP Model):** Upload an image, and the integrated AI automatically generates a meaningful, searchable title and description.
* **🎨 Modern, Animated UI:** Fully responsive frontend built with Tailwind CSS, Radix UI primitives, and Framer Motion for smooth, accessible interactions (including a Bento Grid layout and Dark Mode support).
* **💬 Secure Real-Time Chat:** Users can coordinate item returns instantly via a private inbox, protecting personal phone numbers and emails.
* **🛡️ Role-Based Admin Dashboard:** Dedicated admin portal to monitor system security logs, moderate chats, and delete inappropriate posts.
* **🔐 JWT Authentication:** Secure, token-based login and registration flows.

---

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* Radix UI & Shadcn Components
* Framer Motion (Animations)
* Axios

**Backend & Database:**
* FastAPI (Python)
* MongoDB (Motor Async Driver)
* JWT Authentication

**AI & Deployment:**
* BLIP Image Captioning Model (Hosted via Google Colab + Ngrok)
* **Frontend Hosting:** Vercel
* **Backend Hosting:** Render

---

## 💻 Local Installation & Setup

### Prerequisites
* Node.js (v18+)
* Python (v3.10+)
* MongoDB (Atlas)
* Git

### 1. Clone the Repository
```bash
git clone [https://github.com/Gowthamk723/campus-connect.git]
cd campus-connect
```
### 2. Start the AI Service (Google Colab)
 * Since the BLIP model runs on a free GPU to process images:

 * Open the BLIP Google Colab Notebook.

 * Go to Runtime → Change runtime type → Select T4 GPU.

 * Run all cells.

 * Copy the Ngrok Public URL generated (e.g., https://xxxx-xxxx.ngrok-free.app/analyze).
 * Note: Keep the Colab tab open while using the app.

### 3. Backend Setup
Open a new terminal and navigate to the backend directory:

```Bash
cd backend
python -m venv venv
Activate the virtual environment:

Windows: venv\Scripts\activate

Mac/Linux: source venv/bin/activate
```
Install dependencies and set up environment:

```Bash
pip install -r requirements.txt
```
Create a .env file inside the /backend folder:
```Bash
# Code snippet
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net
DB_NAME=campus_connect_db
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Paste your Colab Ngrok URL here:
COLAB_AI_URL=[https://xxxx-xxxx.ngrok-free.app/analyze]

# Allow CORS for local frontend
FRONTEND_URL=http://localhost:5173
```
Initialize Admin and Start Server:

```Bash
python create_admin.py
uvicorn app.main:app --reload
# Backend runs at: http://localhost:8000
```
### 4. Frontend Setup
Open a new terminal and navigate to the frontend directory:

```Bash
cd frontend
npm install
```
Create a .env file inside the /frontend folder:
```Bash
# Code snippet
VITE_API_URL=http://localhost:8000
```
Start the development server:

```Bash
npm run dev
# Frontend runs at: http://localhost:5173
```
### 👥 User Roles & Access
## Regular User:

* Post lost/found items with AI assistance.

* Chat privately with other users.

* Manage personal post history.

## Admin:

* Full moderation access (Delete any post).

* Monitor chat logs for safety.

* View system security logs.

Default Admin Credentials (if create_admin.py was run):

Email: admin@campusconnect.com

Password: admin

🚀 Roadmap & Future Improvements
* Replace polling chat with native WebSockets.

* Migrate BLIP model from Colab to a dedicated cloud GPU server.

* Implement automated AI-based image moderation for inappropriate content.