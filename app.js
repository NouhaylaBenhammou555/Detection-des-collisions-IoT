var coap        = require('coap')
  , server      = coap.createServer()

server.on('request', function(req, res) {
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})

// the default CoAP port is 5683
server.listen(function() {
  var req = coap.request('coap://localhost/Matteo')

  /*req.on('response', function(res) {
    res.pipe(process.stdout)
    res.on('end', function() {
      process.exit(0)
    })
  })*/

  //req.end()
})

//Connect to database
const {createPool} = require('mysql')

const pool = createPool({
  host:'localhost',
  user:'root',
  password:'kaoutarpw',
  connectionLimit: 10
})
module.exports=pool;

console.log(pool)

// check your database connection
connection.connect(function(err) {

  if (err) {
    console.log('Connexion unsuccessful!')
      return console.error('error: ' + err.message);
  }

  console.log('Connected to the database.');
});
