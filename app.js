//create the server
//Collect data from the client (android app)

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs=require('fs');
const StringDecoder=require('string_decoder').StringDecoder;

fs.readFile(__dirname+'smya dyal l file mnin hanakhed data','utf-8',function(err,data){
  
  const server = http.createServer((req, res) => {
    let buffer='';
    let decoder=new StringDecoder('uft-8');
    const readFile=fs.createReadStream('');
    readFile.pipe(res);


    req.on('data',function(){
      buffer+=decoder.write(data)
    })

    req.on('end',function(data){
      buffer+=decoder.end();
      console.log(buffer);
    })
    

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data);
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
})


//Connect the server to the database
const {createPool} = require('mysql')

const pool = createPool({
  host:'localhost',
  user:'root',
  password:'kaoutarpw',
  connectionLimit: 10
})


/*pool.query('Select * from smya d al table',(err,res,fields)=>{
  if(err){
    return console.log(err);
  }
  return console.log(res);
})
module.exports=pool;*/


//store data into our database

const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
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