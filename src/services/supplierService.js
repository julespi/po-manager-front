import { SERVER } from "./config"

const baseUrl = SERVER + "/suppliers"

const supplierService = {
  async getAll() {
    return fetch(baseUrl).then((res) => res.json())
  },
  async getById(id) {
    return fetch(baseUrl + "/" + id).then((res) => res.json())
  },
}

export default supplierService
