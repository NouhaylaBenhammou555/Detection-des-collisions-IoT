const coap = require('coap');
 
const requestListener = (req, res)=>{
  console.log("Request is Incoming");
     
  const responseData = {"ID":123,"Nom":"bekraoui","Prenom":"simo","Matricule":"L45263"}
    
    //endingMessage:"DATA was sent successfuly"
  
   
  const jsonContent = JSON.stringify(responseData);
  res.end(jsonContent);
};
 
const server = coap.createServer(requestListener);
 
server.listen(3000,'localhost', function(){
    console.log("Server is Listening at Port 3000!");
});

const req = coap.request('coap://localhost:3000')


req.on('response', (res) => {
    res.pipe(process.stdout)
})
req.end()

// check your database connection
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "10.238.68.190",
  user: "root",
  database: "VCD"
  
});



  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO Info_user (ID,Nom,Prenom,Matricule) VALUES ?";
    var values = [
      Info_user['ID'], Info_user['Nom'],Info_user['Prenom'],Info_user['Matricule']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
