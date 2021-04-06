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
# -----------------------Consumer for handling message from Layering addition--------------------
class LayerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'room_%s' % self.room_name

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
        if(text_data_json['type']=="add_canvas_layer"):
            await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': text_data_json['type'],
                'sender_channel_name':str(self.channel_name)
            }
        )

    # Receive message from room group
    async def add_canvas_layer(self, event):
        if(str(self.channel_name) == str(event['sender_channel_name'])):
            print("same")
        else:
            await self.send(text_data = json.dumps({
                'type' : 'add_canvas_layer'
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
        print("---------------------------------------")
        # Leave Canvas group
        await self.channel_layer.group_discard(
            self.canvas_group,
            self.channel_name
        )
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # Check message type and send the message to its corresponding message type
        if(text_data_json['type'] == "stroke" or  text_data_json['type'] == "eraser"):
            await self.channel_layer.group_send(
                self.canvas_group,
                {
                    'type': text_data_json['type'],
                    'startPos': text_data_json['startPos'],
                    'stroke': text_data_json['stroke'],
                    'brushColor': text_data_json['color'],
                    'brushSize': text_data_json['brushSize'],
                    'brushOpacity': text_data_json['brushOpacity'],
                    'sender_channel_name':str(self.channel_name)
                }
            )
        elif(text_data_json['type'] == "answer_permission"):
            await self.channel_layer.group_send(
                self.canvas_group,
                {
                    'type': text_data_json['type'],
                    'sender_channel_name': text_data_json['sender_channel_name'],
                    'permission':text_data_json['permission']
                }
            )
        elif(text_data_json['type'] == "init_answer_permission"):
            await self.channel_layer.group_send(
                self.canvas_group,
                {
                    'type': text_data_json['type'],
                    'sender_channel_name': text_data_json['sender_channel_name'],
                    'permission':text_data_json['permission']
                }
            )
        elif(text_data_json['type'] == "init_ask_permission"):
            await self.channel_layer.group_send(
                self.canvas_group,
                {
                    'type': "init_ask_permission",
                    'sender_channel_name': str(self.channel_name)
                }
            )
        elif(text_data_json['type'] == "ask_permission"):
            await self.channel_layer.group_send(
                self.canvas_group,
                {
                    'type': "ask_permission",
                    'sender_channel_name': str(self.channel_name)
                }
            )
        
    # Message for rendering brush stroke
    async def stroke(self, event):
        if(str(self.channel_name) == str(event['sender_channel_name'])):
            print("same")
        else:
            await self.send(text_data = json.dumps({
                'type' : 'stroke',
                'startPos': event['startPos'],
                'stroke': event['stroke'],
                'color': event['brushColor'],
                'brushSize': event['brushSize'],
                'brushOpacity': event['brushOpacity']
            }))
    # Message for rendering eraser strokes
    async def eraser(self, event):
        # Send stroke to own WebSocket, then from there, to the client
        if(str(self.channel_name) == str(event['sender_channel_name'])):
                print("same channel")
        else:
            await self.send(text_data = json.dumps({
                'type' : 'eraser',
                'startPos': event['startPos'],
                'stroke': event['stroke'],
                'color': event['brushColor'],
                'brushSize': event['brushSize'],
                'brushOpacity': event['brushOpacity']
            }))
    # Message for initializing the current channel layer            
    async def init_ask_permission(self, event):
        await self.send(text_data = json.dumps({
                'type' : 'init_ask_permission',
                'sender_channel_name': event['sender_channel_name'],
                'receiver_channel_name':str(self.channel_name)
            }))
    # Message for asking permission to draw on a canvas layer
    async def ask_permission(self, event):
        # Send stroke to own WebSocket, then from there, to the client different from current channel client
        if(str(self.channel_name) == str(event['sender_channel_name'])):
            print("init_ask_permission message ")
        else:
            # Ask if current channel has permission
            await self.send(text_data = json.dumps({
                'type' : 'ask_permission',
                'sender_channel_name': event['sender_channel_name']
            }))
            
    # Message for give or deny permission
    async def answer_permission(self, event):
        # Send answer for permission back to the channel asking
        if(str(self.channel_name) == str(event['sender_channel_name'])):
            # if there exist a channel with permission=True, don't allow permission
            await self.send(text_data = json.dumps({
                'type' : 'answer_permission',
                'sender_channel_name': event['sender_channel_name'],
                'permission':event['permission']
                }))
    # Message for give or deny permission
    async def init_answer_permission(self, event):
        # Send answer for permission back to the channel asking
        if(str(self.channel_name) == str(event['sender_channel_name'])):
            # if there exist a channel with permission=True, don't allow permission
            await self.send(text_data = json.dumps({
                'type' : 'init_answer_permission',
                'sender_channel_name': event['sender_channel_name'],
                'permission':event['permission']
                }))
                


            
