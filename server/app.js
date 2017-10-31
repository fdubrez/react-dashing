var express = require('express');
var app = express();

var clientId = 0;
var clients = {};  // <- Keep a map of attached clients

// Called once for each new client. Note, this response is left open!
app.get('/events/', function(req, res) {
	req.socket.setTimeout(Number.MAX_VALUE);
    res.writeHead(200, {
    	'Content-Type': 'text/event-stream',  // <- Important headers
    	'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Access-Control-Allow-Origin': '*'
    });
    res.write('\n');
    (function(clientId) {
        clients[clientId] = res;  // <- Add this client to those we consider "attached"
        req.on("close", function(){delete clients[clientId]});  // <- Remove this client when he disconnects
    })(++clientId)
});

const messages = [
	{
		value: 1, id: 'test', updatedAt: new Date()
	},
	{
		current: 5, last: 1, id: 'toto', updatedAt: new Date()
	},
	
]

setInterval(function(){
	var msg = Math.random();
	console.log("Clients: " + Object.keys(clients) + " <- " + msg);
	for (clientId in clients) {
		clients[clientId].write("data: "+ msg + "\n\n"); // <- Push a message to a single attached client
	};
}, 2000);

app.listen(process.env.PORT || 8080);
