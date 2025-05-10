from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from mian import generate_response

app = FastAPI()

# Allow frontend access (you can restrict origins in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use your domain instead
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_endpoint(data: ChatRequest):
    try:
        result = generate_response(data.message)
        return {"reply": result.get("openai_response", "No reply generated.")}
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}
