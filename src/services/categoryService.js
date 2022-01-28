import { SERVER } from "./config"

const baseUrl = SERVER + "/categories"

const categoryService = {
  async getAll() {
    return fetch(baseUrl).then((res) => res.json())
  },
}

export default categoryService
