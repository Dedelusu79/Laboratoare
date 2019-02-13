const express = require('express');
const app = express();
const path    = require("path");
const fs = require("fs");

app.use(express.static('MyRepo'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/mysite.html'));
});
app.get('/site', (req, res) => {
    res.sendFile(path.join(__dirname+'/mysite2.html'));
});

app.get('/file', (req, res) => {
	fs.readFile('myfile.txt', 'utf8', function(err, contents) {
    res.send(contents);
});
})

app.get('/api', (req, res) => {
  res.statusCode = 302;
  res.setHeader("Location", "http://www.google.com");
  res.end();
});

app.get('/ajax', (req, res) => {
  res.sendFile(path.join(__dirname+'/mysitewithajax.html'));
});
