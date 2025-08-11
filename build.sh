#!/bin/bash
# ===== BACKEND =====
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000 --daemon
deactivate
cd ..

# ===== FRONTEND =====
cd frontend
npm install
npm run build
cd ..

echo "Backend und Frontend wurden erfolgreich gebaut!"