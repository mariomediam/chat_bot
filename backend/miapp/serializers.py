from rest_framework import serializers

from .models import ChatSession, ChatSessionMessage

class ChatSessionMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSessionMessage
        fields = '__all__'

class ChatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = '__all__'