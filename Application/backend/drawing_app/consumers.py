# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import random


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.userName = "User " + str(random.randint(0, 1000))
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': text_data_json['type'],
                'message': text_data_json['msg'],
                'user':self.userName
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type' : 'message',
            'message': str(event['message']),
            'user':str(event['user'])
        }))
