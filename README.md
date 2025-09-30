# AI Health Assistant

A simple AI-powered chatbot that predicts diseases based on user symptoms and provides relevant information including home remedies, allopathy, and homeopathy suggestions.

---

## How to Use

1. **Clone the repository**

```bash
git clone https://github.com/Pandeyjee5/AI-Health-Assistance-.git
cd AI-Health-Assistance-


#Create & activate virtual environment

python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # Mac/Linux


#Install backend dependencies

pip install -r requirements.txt


#Start the backend

cd backend
uvicorn main:app --reload --port 8000

#Start the frontend (in a new terminal)

cd ../frontend
npm install       # if not already done
npm run dev


#Open in browser

      #Go to http://localhost:5173 to chat with the bot.


#Features

#Predicts diseases from symptoms typed by the user

#Provides description, home remedies, allopathy, and #homeopathy suggestions

#Can handle multiple symptoms


#Project Structure

PROJECT1/
├── backend/          # FastAPI backend
│   ├── main.py
│   └── knowledge_base.json
├── frontend/         # React frontend
├── requirements.txt
└── README.md



#Tools & Technologies Used

#Python, FastAPI, Uvicorn (Backend)

#React, JavaScript (Frontend)

#JSON (Knowledge base)


#Author

#Pandey Jee


---

This README is **short, clear, and works for both teachers and friends** who want to run your project.  

If you want, I can also **write a 2–3 minute “explaining script”** for you, so you can easily present this project to your teacher.  

Do you want me to do that?
