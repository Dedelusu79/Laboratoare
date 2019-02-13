var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql'); 

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	io.emit('display messages');
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    const sql_insert_messages = "insert msg(msg) values('"+ msg +"')";
	con.query(sql_insert_messages, function (err, result) {
		if (err) throw err;
		console.log("New message was insert");
	});
  });
  const sql_display_all_messages = "select * from msg";
	con.query(sql_display_all_messages, function (err, result) {
		if (err) throw err;
			for(var i = 0; i < result.length; i++) {
				io.emit('chat message', result[i].msg);
				console.log(result[i].msg);
			}
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
