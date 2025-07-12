import streamlit as st
from src.helper import get_pdf_text, get_text_chunks, get_vector_store, get_conversational_chain

def main():
    st.set_page_config("Information Retrieval")
    st.header("Information Retrieval System")
    
    user_input = st.text_input("Ask a question about the uploaded documents:")
    with st.sidebar:
        st.title("Menu")
        pdf_docs= st.file_uploader("Upload your PDF documents and Click on the Submit & Process Button", type=["pdf"], accept_multiple_files=True)
        if st.button("Submit & Process"):
            with st.spinner("Processing..."):
                raw_text=get_pdf_text(pdf_docs)
                text_chunks=get_text_chunks(raw_text)
                vector_store=get_vector_store(text_chunks)
                
                st.session_state.conversational_chain = get_conversational_chain(vector_store)  
                
                st.success("Files processed successfully!")
if __name__ == "__main__":
    main()
    