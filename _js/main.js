function myLogin(_email, _password){
    //define properties
    this.isLoggedIn = false;
    this.msg;
    this.pushedUser;
    this.testVariable = "test";
    //
    this.login = function(_email, _password){
        //validation checking
        if(!this.validateEmail(_email)){
            this.msg = "You must provide an email address";
        }else if(_password =="" || _password =="password"){
            this.msg = "You must provide a password";
        }else{
            this.msg = 'success, log the user in';
            this.connectToDBAndInsert(_email, _password);
        }
        console.log(this.msg);

    }
    this.validateEmail = function(emailAdd){
        var re = /\S+@\S+\.\S+/;
        return re.test(emailAdd);
    }
    this.connectToDBAndInsert = function(_email, _password){
        pushedUser = {'email':_email, 'password': _password};
        //localStorage.setItem(pushedUser,true);
       // window.location = '/postUsers';



    }
};

var myLogin = new myLogin();


function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}