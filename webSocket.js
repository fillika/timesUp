const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT || 3010 });

server.on('connection', ws => {

  ws.on('message', message => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(message);
        client.send(message)
      }
    })
  })

  ws.send('Welcome');
})