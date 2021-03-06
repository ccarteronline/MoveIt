var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var util = require('util');
var qs = require('querystring');
var reg = require('./_js/loginControls.js');
var io = require('socket.io').listen(3000);
//

http.createServer(function (req, res) {
    var pathName = url.parse(req.url).pathname;
    var extension = path.extname(pathName);
    //routes for pages
    if(pathName === '/'){
        io.sockets.on('connection', function(socket){
            var address = socket.handshake.address;
            console.log('New connection from ' + address.address + ":" + address.port);
        });

        fs.readFile('./index.html', function(err, html){
            if (err)
                throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        });

    }else if(pathName ==='/about'){
        fs.readFile('./about.html', function(err, html){
            if (err)
                throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        });
    }else if(pathName === '/register'){
        reg.register(req, res, qs,util);
    }else if(pathName === '/login'){
        reg.login(req, res, qs,util)
    }else if(pathName === '/dashboard'){
        if(reg.isLoggedIn()){
            console.log('display user');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<p>Welcome to the Dashboard</p>");
            res.end();
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<p>You must log in to see this page</p>");
            res.end();
        }
    }
    //routes for extensions loading in
    else if(extension === ".css"){
        res.writeHead(200, {"Content-Type": "text/css"});
        fs.readFile('./'+ pathName, 'utf8', function(err, fd){
            res.end(fd);
        });
    }
    else if(extension === ".js"){
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fs.readFile('./'+ pathName, 'utf8', function(err, fd){
            res.end(fd);
        });
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write("404 error!");
        res.end();
    }





}).listen(8080, '192.168.51.117');


function popupateUsers(){
    MongoClient.connect("mongodb://localhost:27017/moveIt", function(err, db){
        if(err) throw err;

        var storedUsers = db.collection('users');
        var newUser = {'email':_email, 'password':_password}
        storedUsers.insert(newUser);
        db.close();
    })
}

function checkIfUserIsLoggedIn(){
    if(loggedIn){
        return true;
    }else{
        return false;
    }
}
console.log('Server running');