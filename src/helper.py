import os
from PyPDF2 import PdfReader
from dotenv import load_dotenv

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI  # ✅ Updated imports
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Set API key in environment if not already set
if OPENAI_API_KEY:
    os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY


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
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")  # ✅ From langchain-openai
    vector_store = FAISS.from_texts(chunks, embeddings)
    return vector_store


def get_conversational_chain(vector_store):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)  # ✅ From langchain-openai
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
