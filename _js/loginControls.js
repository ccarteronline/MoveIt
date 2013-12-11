exports.register = function(req, res, qs, util){
    //store mongo in variable
    var MongoClient = require('mongodb').MongoClient, format = require('util').format;
    //use post method
    if(req.method == 'POST'){
        var fullBody = '';
        req.on('data', function(chunk){
            //append the current chunk of data to the fullBody variable
            fullBody += chunk.toString();
        });
        req.on('end', function(){
            var decodedBody = qs.parse(fullBody);//parse the content (name, email, password)
            validation(decodedBody.name, decodedBody.email, decodedBody.password);
        });
    }else{
        res.writeHead(405, 'Method not supported', {'Content-Type': 'text/html'});
        res.end('<html><head><title>405 -Method not supported</title></head><bod><h1>Method not supported.</h1></bod></html>');
    }

    function validation(_name, _email, _password){
        var re = /\S+@\S+\.\S+/;//emal regex

        //check name email and password to see if they are valid
        if(_name =="" || _name =="Your name" || _name =="Your Name"){
            res.write('<script>alert("Please use a legitimate name");</script>');
            res.end();
        }else if(!re.test(_email)){
            res.write('<script>alert("Please provide a valid email address");</script>');
            res.end();
        }else if(_password =="" || _password =="password"){
            res.write('<script>alert("Please use a legitimate password");</script>');
            res.end();
        }
        else{
            //encrypt password with some really good encryption please!
            var loginStuff = {'name':_name,'email': _email, 'password': _password}
            pushToDB(loginStuff);
        }

    }
    function pushToDB(loginItems){
        //connect to the database and run db actions
        MongoClient.connect("mongodb://localhost:27017/moveIt", function(err, db){
            if(err) throw err;
            //
            var storedUsers = db.collection('users');//connect to users collection

            //check to see if the user's email address is already in the database
            storedUsers.count({'email':loginItems.email}, function(err, items){
                if(items != 0){
                    res.write('<script>alert("There is already a user with that email");</script>');
                    res.end();
                    db.close();
                }else{//insert the new user's credentials to the database
                    storedUsers.insert(loginItems, function(err, myInsert){
                        if (err) throw err;
                        res.write('<script>alert("Thanks for registering! Go Login");</script>');
                        res.end();
                        db.close();
                    });
                }
            });//end storedUsers.count
        });//end mongo connect
    }//end pushtoDB
};

