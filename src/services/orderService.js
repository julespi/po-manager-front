import axios from "axios"

//const baseUrl = "http://localhost:8080/api/orders"
const baseUrl = "https://po-manager-back.herokuapp.com/api/orders"

const orderService = {
  async getAll() {
    return fetch(baseUrl).then((res) => res.json())
  },
  async getById(id) {
    return fetch(baseUrl + "/" + id).then((res) => res.json())
  },
  async create(order) {
    return fetch(baseUrl, {
      method: "post",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data.payload)
  },
  async deleteDetail(id) {
    return axios.delete(baseUrl + "/" + id + "/detail")
  },
  async update(order, id) {
    return axios.put(baseUrl + "/" + id, order)
  },
}

export default orderService
