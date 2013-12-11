var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var util = require('util');
var qs = require('querystring');
var reg = require('./_js/loginControls.js');
//
var loggedIn = false;

http.createServer(function (req, res) {
    var pathName = url.parse(req.url).pathname;
    var extension = path.extname(pathName);
    //routes for pages
    if(pathName === '/'){
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





}).listen(1337, '127.0.0.1');


function popupateUsers(){
    MongoClient.connect("mongodb://localhost:27017/moveIt", function(err, db){
        if(err) throw err;

        var storedUsers = db.collection('users');
        var newUser = {'email':_email, 'password':_password}
        storedUsers.insert(newUser);
        db.close();
    })
}










console.log('Server running at http://127.0.0.1:1337/');