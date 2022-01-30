import axios from "axios"
import { SERVER } from "./config"

const baseUrl = SERVER + "/orders"

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
  async addDetailForUser(detail, userId) {
    return axios.post(baseUrl + "/detail/" + userId, detail)
  },
  async confirm(order, id) {
    return axios.post(baseUrl + "/confirm/" + id, order)
  },
}

export default orderService
