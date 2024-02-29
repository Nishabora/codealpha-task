// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { ChatGPT } = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const chatGPT = new ChatGPT({
  apiKey: 'YOUR_OPENAI_API_KEY' // Replace with your API key
});

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(message) {
    try {
      const response = await chatGPT.sendMessage(message);
      ws.send(response.choices[0].text);
    } catch (error) {
      console.error('ChatGPT request failed:', error);
    }
  });
});

server.listen(3000, function listening() {
  console.log('Server listening on port 3000');
});
