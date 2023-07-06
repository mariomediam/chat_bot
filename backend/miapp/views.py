from rest_framework.views import APIView  
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

# from django.http import JsonResponse  

from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.vectorstores import Chroma

from .serializers import ChatSessionSerializer, ChatSessionMessageSerializer
from .models import ChatSession, ChatSessionMessage

# Create your views here.
class CrearVectorStore(APIView):  

 def get(self, request, format=None):
    
    try:
      generarVectorStore()    
      return Response(data={
               'message': 'Vectores creados correctamente',
               'content': None
             }, status=status.HTTP_201_CREATED)  
    except Exception as e:
      return Response(data={
                  'message': e.args,
                  'content': None
               }, status=400) 
    

class ChatSessionView(CreateAPIView):

   def post(self, request: Request):      
      try:
         chat_session = ChatSession.objects.create()
         chat_session.save()
      
         return Response(data={
                              'message': None,
                              'content': chat_session.chatSessionId
                        }, status=status.HTTP_201_CREATED)
      except Exception as e:
               return Response(data={
                  'message': e.args,
                  'content': None
               }, status=400)
 

def setChatSessionMessage(chat_session_id, query, result):
   chat_session = ChatSession.objects.get(chatSessionId=chat_session_id)
   chat_session_message = ChatSessionMessage.objects.create(chatSession=chat_session, chatSessionMessageQuery=query, chatSessionMessageResult=result)
   chat_session_message.save()

def getChatHistory(chat_session_id):
   chat_session = ChatSession.objects.get(chatSessionId=chat_session_id)
   chat_session_messages = ChatSessionMessage.objects.filter(chatSession=chat_session)

   chat_history = []

   for chat_session_message in chat_session_messages:
      chat_history.append((chat_session_message.chatSessionMessageQuery, chat_session_message.chatSessionMessageResult))
            
   return chat_history 


def generarVectorStore():
    
    loader = PyPDFDirectoryLoader("/code/backend/miapp/docs")
    document = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=1024, chunk_overlap=64)
    documents = text_splitter.split_documents(document)

    embeddings = HuggingFaceEmbeddings()    
    persist_directory = '/code/backend/miapp/vectorstore'
    vectorstore = Chroma.from_documents(documents=documents, embedding=embeddings, persist_directory=persist_directory)
    vectorstore.persist()


class ChatBot(CreateAPIView):
   
   def post(self, request: Request):
      num_outputs = 512
      try:

        
         template = """Eres un asistente de la Municipalidad Provincial de Piura y SOLO conoces los servicios que brinda la Municipalidad. 
Utiliza el siguiente contexto  para ayudar al usuario encontrar lo que busca
Si la pregunta no está relacionada a los servicios de la Municipalidad, responde que SOLO puedes proporcionarle información de los diferentes servicios que la Municipalidad Provincial de Piura ofrece en base al Texto Unico de Procedimientos Administrativos (TUPA) 
Si no puede encontrar la respuesta, simplemente diga que solo sabe del TUPA de la municipalidad de Piura, no intente inventar una respuesta.
Debes de responder de forma amigable.
         
-------------------------
{context}
\"""

Human: {question}
\"""
"""
         
         system_message_prompt = SystemMessagePromptTemplate.from_template(template)

         chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt])

         llm=ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo", max_tokens=num_outputs)

         embeddings = HuggingFaceEmbeddings()

         persist_directory = '/code/backend/miapp/vectorstore'

         vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
         
         qa = ConversationalRetrievalChain.from_llm(llm, vectorstore.as_retriever(), return_source_documents=True, verbose=True, combine_docs_chain_kwargs={"prompt": chat_prompt})


         chat_session_id = request.data.get("chatSessionId")

         chat_history = getChatHistory(chat_session_id)

         query = request.data.get("consulta")         

         result = qa({"question": query, "chat_history": chat_history})

         respuesta = result["answer"]
         
         setChatSessionMessage(chat_session_id, query, respuesta)

         vectorstore = None

         return Response(data={
                              'message': respuesta,
                              'content': None
                        }, status=status.HTTP_201_CREATED)
      except Exception as e:
               return Response(data={
                  'message': e.args,
                  'content': None
               }, status=400)      
      

class ChatSessionMessageView(ListCreateAPIView):
   serializer_class = ChatSessionMessageSerializer

   def post(self, request: Request):
      try:
          
         chat_session = ChatSession.objects.get(chatSessionId=request.data.get("chatSessionId"))
         chat_session_message_query = request.data.get("chatSessionMessageQuery")
         chat_session_message_result = request.data.get("chatSessionMessageResult")         
         
         chat_session_message = ChatSessionMessage.objects.create(chatSession=chat_session, chatSessionMessageQuery=chat_session_message_query, chatSessionMessageResult=chat_session_message_result)
         chat_session_message.save()

         serializer = self.serializer_class(instance=chat_session_message)
         serialized_data = serializer.data
      
         return Response(data={
                              'message': None,
                              'content': serialized_data
                        }, status=status.HTTP_201_CREATED)

      except Exception as e:
               return Response(data={
                  'message': e.args,
                  'content': None
               }, status=400)      
      

   def get(self, request: Request):
      try:
            # Retorna todos los chat_session_message de una sesionId
            id = request.query_params.get('id')
            chat_session = ChatSession.objects.get(chatSessionId=id)
            chat_session_messages = ChatSessionMessage.objects.filter(chatSession=chat_session)
            serializer = self.serializer_class(instance=chat_session_messages, many=True)
            serialized_data = serializer.data

            return Response(data={
                                 'message': None,
                                 'content': serialized_data
                           }, status=status.HTTP_200_OK)
      except Exception as e:
               return Response(data={
                  'message': e.args,
                  'content': None
               }, status=400)