//create the server
const coap = require('coap') 
const server = coap.createServer()

const hostname = '127.0.0.1';
const port = 5684;


server.on('request', (req, res) => {
    res.end('Hello ' + req.url.split('/')[1] + '\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



//Collect data from the client (android app)

//Connect to database
const {createPool} = require('mysql')

const pool = createPool({
  host:'localhost',
  user:'root',
  password:'kaoutarpw',
  connectionLimit: 10
})
module.exports=pool;


//store data into our database

const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(5684, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

//quering database

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.send(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

//envoi de mail 
