import axios from "axios"

//const baseUrl = "http://localhost:8080/api/users"
const baseUrl = "https://po-manager-back.herokuapp.com/api/users"

const userService = {
  async logIn(userToLogin) {
    return fetch(baseUrl + "/login", {
      method: "post",
      body: JSON.stringify(userToLogin),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          return data.payload
        })
      } else {
        return null
      }
    })
  },
  /*async getOrdersForUserId(id, isOpen) {
    let url = baseUrl + "/" + id + "/orders"
    if (isOpen !== null) {
      url += "?isOpen=" + String(Boolean(isOpen))
    }
    return fetch(url).then((res) => res.json())
  },*/
  async getOrdersForUserId(id, isOpen) {
    let url = baseUrl + "/" + id + "/orders"
    if (isOpen !== null) {
      url += "?isOpen=" + String(Boolean(isOpen))
    }
    return axios.get(url)
  },
}

export default userService
