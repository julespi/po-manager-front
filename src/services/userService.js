
const baseUrl = "http://localhost:8080/api/users"

const adminUser = {
    name: "julian Spinelli",
    email: "admin"
}

const userService = {

    /*async logIn(userToLogin) {
        if(adminUser.email === email && adminUser.password === password){
            return adminUser
        }else{
            return null
        }
    }*/
    async logIn(userToLogin) {
        return fetch(baseUrl + "/login", {
            method: "post",
            body: JSON.stringify(userToLogin),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            if(res.ok){
                return res.json().then( data => {
                    return data.payload
                })
            }else{
                return null
            }           
            
        })
    }

}

export default userService