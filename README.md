# campus-connect
AI-Powered Lost &amp; Found System with FastAPI and React.

# CampusConnect - Developer Startup Guide

## 🛑 1. Wake Up the AI (Google Colab)
Since we use a free Cloud GPU, the server turns off when we close the tab.
1. Open the Google Colab Notebook: [Link to your notebook]
2. Go to **Runtime > Change runtime type** and ensure **T4 GPU** is selected.
3. **Run the Code Cell** (Play button).
4. Enter your Ngrok Token if asked.
5. **COPY** the public URL from the output:
   `🚀 YOUR PUBLIC URL IS: https://xxxx-xxxx.ngrok-free.app/analyze`
   *(Keep the Colab tab OPEN!)*

## 🔑 2. Update Configuration (Local)
1. Open this project in VS Code.
2. Open the file `backend/.env`.
3. Find `COLAB_AI_URL=` and **PASTE** the new URL there.
   Example: `COLAB_AI_URL=https://xxxx-xxxx.ngrok-free.app/analyze`
4. Save the file.

## 🚀 3. Start the Backend Server
1. Open a Terminal in VS Code.
2. Navigate to the backend:
   cd backend
3. Activate the Virtual Environment:
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
4. Start the Server:
   uvicorn app.main:app --reload

## 🧪 4. Verify System
Since we don't have a frontend yet, test the AI connection manually:
1. Open a second terminal.
2. Run the test script:
   python backend/test_ai.py