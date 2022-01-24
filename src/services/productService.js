const baseUrl = "http://localhost:8080/api/products"

const productService = {
  async getAll(filter, page, size) {
    if (filter == null) {
      filter = ""
    }
    if (page == null) {
      page = 0
    }
    if (size == null) {
      size = 5
    }
    console.log(
      baseUrl + "?filter=" + filter + "&page=" + page + "&size=" + size
    )
    return fetch(
      baseUrl + "?filter=" + filter + "&page=" + page + "&size=" + size
    ).then((res) => res.json())
  },
  async getById(id) {
    return fetch(baseUrl + "/" + id).then((res) => res.json())
  },
  async update(product, id) {
    return fetch(baseUrl + "/" + id, {
      method: "put",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  },
  async getByDescription(description) {
    return fetch(baseUrl + "/search?description=" + description).then((res) =>
      res.json()
    )
  },
  async create(product) {
    let ok = false
    return fetch(baseUrl, {
      method: "post",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        ok = res.ok
        return res.json()
      })
      .then((data) => {
        if (ok) {
          return data.payload
        }
        throw data.message
      })
  },
}

export default productService
