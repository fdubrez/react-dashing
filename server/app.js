var express = require('express');
var schedule = require('node-schedule');
var fetch = require('node-fetch');

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

const sendEvent = (msg) => {
	for (clientId in clients) {
		clients[clientId].write("data: "+ JSON.stringify(msg) + "\n\n"); // <- Push a message to a single attached client
	};
}

schedule.scheduleJob('*/1 * * * *', () => {
	console.log("Search available bicycles...")
	const url = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-des-stations-le-velo-star-en-temps-reel&sort=idstation&facet=nom&faceat=etat&facet=nombreemplacementsactuels&facet=nombreemplacementsdisponibles&facet=nombrevelosdisponibles&refine.nom=Champs+Libres&refine.nombrevelosdisponibles=15"
	fetch(url)
	  .then(resp => {
			if (!resp.ok) {
				throw new Error(`Failed to retrieve bicycle count!, ${resp.status}`)
			}

			return resp.json()
		})
		.then(json => {
			const count = json.parameters.refine.nombrevelosdisponibles
			sendEvent({ current: count, id: 'bicycle-availables-champslibres'})
		})
		.catch(err => {
			console.error("Something went wrong: ", err.message)
		})
})

app.listen(process.env.PORT || 8080);
