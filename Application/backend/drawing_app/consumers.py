# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import random

# -----------------------Consumer for handling message from chatbox--------------------
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
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
                'user': text_data_json['username']
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


# --------------------Consumer for handling stroke from different channel------------------------
class CanvasConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.canvas_id = self.scope['url_route']['kwargs']['canvas_id']
        self.canvas_group = 'canvas_' + str(self.canvas_id)

        # Join Canvas group
        await self.channel_layer.group_add(
            self.canvas_group,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave Canvas group
        await self.channel_layer.group_discard(
            self.canvas_group,
            self.channel_name
        )

    # Receive stroke from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # Send stroke to canvas
        await self.channel_layer.group_send(
            self.canvas_group,
            {
                'type': text_data_json['type'],
                'startPos': text_data_json['startPos'],
                'stroke': text_data_json['stroke'],
                'no':text_data_json['no'],
                'sender_channel_name':str(self.channel_name)
            }
        )

    # Receive stroke from canvas group
    async def stroke(self, event):
        # Send stroke to own WebSocket, then from there, to the client
        if(str(self.channel_name) == str(event['sender_channel_name'])):
            print("same channel")
        else:
            await self.send(text_data = json.dumps({
                'type' : 'stroke',
                'startPos': event['startPos'],
                'stroke': event['stroke']
            }))
