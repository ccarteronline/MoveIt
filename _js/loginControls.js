exports.loginControl = function(req, res, qs, util){
    var MongoClient = require('mongodb').MongoClient, format = require('util').format;
    var assert = require('assert');
    //
    if(req.method == 'POST'){
        //console.log('[200]', req.method, 'to', req.url);
        var fullBody = '';
        req.on('data', function(chunk){
            //append the current chunk of data to the fullBody variable
            fullBody += chunk.toString();
        });
        req.on('end', function(){
            //request ended -> do something with the data
            //res.writeHead(200, "OK", {'Content-Type':'text/html'});
            //parse the received body data
            var decodedBody = qs.parse(fullBody);

            //output the decoded data to the HTTP response
           // res.write('<html><head><title>Post Data</title></head><body><pre>');
            //res.write(util.inspect(decodedBody));
            validation(decodedBody.name, decodedBody.email, decodedBody.password);

           // res.write('</pre></body></html>');
           // res.end();
        });
    }else{
        console.log('[405]' + req.method + ' to ' + req.url);
        res.writeHead(405, 'Method not supported', {'Content-Type': 'text/html'});
        res.end('<html><head><title>405 -Method not supported</title></head><bod><h1>Method not supported.</h1></bod></html>');
    }

    function validation(_name, _email, _password){
        var re = /\S+@\S+\.\S+/;

        if(_name =="" || _name =="Your name"){
            console.log("please use a legitimate name");
        }else if(!re.test(_email)){
            console.log("Please provide a valid email address");
        }else if(_password =="" || _password =="password"){
            console.log("Please use a legitimate password");
        }
        else{
            //encrypt password with some really good encryption please!
            var loginStuff = {'name':_name,'email': _email, 'password': _password}
            pushToDB(loginStuff);
        }

    }
    function pushToDB(loginItems){
        res.end();
        MongoClient.connect("mongodb://localhost:27017/moveIt", function(err, db){
            console.log('connected to database');
            if(err) throw err;

            var storedUsers = db.collection('users');
                storedUsers.count({'email':loginItems.email}, function(err, items){
                    if(items != 0){
                        console.log('There is already a user with that email');
                    }else{
                        console.log('Push this new user to db!');
                        storedUsers.insert(loginItems);
                    }
                });


            //db.close();
        });
    }
};

