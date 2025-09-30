#(This will be your API file where we write the backend code.)


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

# ------------------- Enable CORS -------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------- Request Model -------------------
class UserInput(BaseModel):
    text: str

# ------------------- Load Knowledge Base -------------------
KB_FILE = "knowledge_base.json"

if os.path.exists(KB_FILE):
    with open(KB_FILE, "r", encoding="utf-8") as f:
        knowledge_base = json.load(f)
else:
    knowledge_base = {}

# ------------------- Prediction Endpoint -------------------
@app.post("/predict")
def predict(input: UserInput):
    user_text = input.text.lower()
    response_list = []

    # Check if user_text matches any disease keyword
    matched = False
    for disease, info in knowledge_base.items():
        keywords = info.get("keywords", [])
        if any(k.lower() in user_text for k in keywords) or disease.lower() in user_text:
            response_list.append({
                "disease": disease,
                "info": info
            })
            matched = True

    # If nothing matched, return unknown
    if not matched:
        response_list.append({
            "disease": "Unknown",
            "info": {"description": "Information not available",
                     "home_remedies": [],
                     "allopathy": [],
                     "homeopathy": []}
        })

    return response_list
