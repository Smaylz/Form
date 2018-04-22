var express = require("express");
var bodyParser = require("body-parser");
var pg = require('pg');
var app = express();

var parser = bodyParser.json();
 
app.use(express.static(__dirname));
app.set('views', __dirname + '/views');

app.post("/register",parser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
	console.log(!request.body);
    console.log(request.body);
	
	var event={
		name: request.body.name,
		email: request.body.email,
		password: request.body.password
	};

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    	client.query('SELECT * FROM register', function(err, result) {
      	done();
      	if (err){ 
       			console.error(err); 
       			response.send("Error " + err); 
       		}
      	else{ 
       			client.query('INSERT INTO register(name, email, password) values($1, $2, $3)',[event.name, event.email, event.password] );
       			response.send(event);
        	}
    	});
  	});

	/*var fs = require("fs");

	var data = JSON.parse(fs.readFileSync("base.json","utf8"));
	data['base'].push(event);
	var item = JSON.stringify(data);

	fs.writeFile("base.json", item, function(error){
 
                if(error) throw error; 
                console.log("Запись файла завершена");
               	response.send(data);
});	*/
});

app.get('/listen', function(request,response){
	var results =[];
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    	var query = client.query('SELECT * FROM register', function(err, result) {
      	done();
      	if (err){ 
       			console.error(err); 
       			response.send("Error " + err); 
       		}
      	else{
       			response.send(result);
        	}
    	});
  	});
})

app.get('/home',function(request, response){
     response.render("home.hbs");
});

app.listen(process.env.PORT || 3000);
