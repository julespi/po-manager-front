import axios from "axios"
import { SERVER } from "./config"

let baseUrl = SERVER + "/users"

const userService = {
  async logIn(userToLogin) {
    console.log(baseUrl)
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
  async getOrdersForUserId(id, isOpen) {
    let url = baseUrl + "/" + id + "/orders"
    if (isOpen !== null) {
      url += "?isOpen=" + String(Boolean(isOpen))
    }
    return axios.get(url)
  },
}

export default userService
