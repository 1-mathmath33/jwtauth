const http = require('http');
const app=require('./app.js');
server=http.createServer(app);
//server.listen(3000 , "localhost" , ()=>{console.log("listening for request")});