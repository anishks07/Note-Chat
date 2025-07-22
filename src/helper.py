import os
from PyPDF2 import PdfReader
from dotenv import load_dotenv

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq  # ✅ Updated to use Groq
from langchain_huggingface import HuggingFaceEmbeddings  # ✅ Updated to use HuggingFace embeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Set API key in environment if not already set
if GROQ_API_KEY:
    os.environ["GROQ_API_KEY"] = GROQ_API_KEY


def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text() or ""  # Avoid NoneType
    return text


def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
    chunks = text_splitter.split_text(text)
    return chunks


def get_vector_store(chunks):
    # Using HuggingFace embeddings (free, no API key required)
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = FAISS.from_texts(chunks, embeddings)
    return vector_store


def get_conversational_chain(vector_store):
    # Using Groq LLM with correct model parameter name
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)  # ✅ Updated to use ChatGroq
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True,
        output_key="answer"  # ✅ Required for multiple output keys
    )
    conversational_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(),
        memory=memory,
        return_source_documents=True,
        output_key="answer"  # ✅ Prevents ambiguity in memory storage
    )
    return conversational_chain
