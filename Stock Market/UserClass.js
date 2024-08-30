export class Login {
    roles=  {
        buyer: "Buyer",
        admin: "Administrator"
    }

    #credentials = [
        { username: "IshaanJoshi2001", password: "IshaanJoshi2001", role: this.roles.buyer },
        { username: "JohnDoe123", password: "JohnDoe123", role: this.roles.admin },
        { username: "JaneSmith456", password: "JaneSmith456", role: this.roles.buyer },
        { username: "AdminUser789", password: "AdminUser789", role: this.roles.admin },
        { username: "EmilyDavis77", password: "EmilyDavis77", role: this.roles.buyer },
        { username: "admin", password: "admin", role: this.roles.admin }
    ];

    #getCredentials () {
        return this.#credentials;
    }

    #getUserCredentials () {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        return { username , password }
    }
    
    authenticateUser() {
        var credentials = this.#getCredentials();
        var { inputUsername , inputPassword } = this.#getUserCredentials();

        var validUser = credentials.find((cred) => (cred.username === inputUsername && cred.password === inputPassword))
        
        if(validUser !== undefined){
            return validUser.role;
        } else {
            return null;
        }
    }
      

    verifyCred   
}