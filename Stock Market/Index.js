import { Login } from "./UserClass.js";

var user = new Login();

document.getElementById('login').addEventListener('click' , () => {
    let userRole = user.authenticateUser();

    if(userRole === null){
        alert("Error! User not found or invalid credentials")
    } else {
        if(userRole === "Administrator"){
            window.location.href = './Admin%20Panel/Index.html'
        } else {
            window.location.href = './User%20Panel/Index.html'
        }
    }
})