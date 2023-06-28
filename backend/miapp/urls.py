from django.urls import path
from .views import CrearVectorStore, ChatBot, ChatSessionView


urlpatterns= [
    path("crear-vector-store", CrearVectorStore.as_view()),
    path("chat-session/", ChatSessionView.as_view()),
    path("conversar", ChatBot.as_view()),
]
