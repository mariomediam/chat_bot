from django.db import models

class ChatSession(models.Model):
    chatSessionId = models.AutoField(primary_key=True)    
    chatSessionDate = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chat_session'

class ChatSessionMessage(models.Model):
    chatSessionMessageId = models.AutoField(primary_key=True)
    chatSession = models.ForeignKey(ChatSession, on_delete=models.CASCADE)
    chatSessionMessageDate = models.DateTimeField(auto_now_add=True)
    chatSessionMessageQuery = models.TextField()
    chatSessionMessageResult = models.TextField()

    class Meta:
        db_table = 'chat_session_message'
