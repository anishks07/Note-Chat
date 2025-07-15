from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from src.helper import get_pdf_text, get_text_chunks, get_vector_store, get_conversational_chain

from pydantic import BaseModel

app = FastAPI()

# Allow CORS so your frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global conversational chain
conversational_chain = None


@app.post("/upload/")
async def upload_pdfs(files: list[UploadFile] = File(...)):
    contents = ""
    for file in files:
        contents += get_pdf_text([file.file])
    chunks = get_text_chunks(contents)
    vector_store = get_vector_store(chunks)
    global conversational_chain
    conversational_chain = get_conversational_chain(vector_store)
    return {"message": "PDFs processed successfully!"}


class Question(BaseModel):
    question: str


@app.post("/ask/")
async def ask_question(data: Question):
    global conversational_chain
    if not conversational_chain:
        return {"error": "Please upload PDF documents first."}
    response = conversational_chain.invoke({"question": data.question})
    return {
        "answer": response["answer"],
        "chat_history": [
            {"role": "user" if i % 2 == 0 else "ai", "content": m.content}
            for i, m in enumerate(response["chat_history"])
        ]
    }
