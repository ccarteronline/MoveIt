//Handle the login toggle on the homepage
function handleRegistrationAndLogin(){
    var loginItem = document.getElementById('loginForm')
    var regItem = document.getElementById('registerForm');
    this.toggle = function(param){
        if(param == 'login'){
            loginItem.style.display = "block";
            regItem.style.display = "none";
        }else if(param == 'register'){
            loginItem.style.display = "none";
            regItem.style.display = "block";
        }
    }
}
var regLog = new handleRegistrationAndLogin();