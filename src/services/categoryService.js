
const baseUrl = "http://localhost:8080/api/categories"

const categoryService = {

    async getAll() {
        return fetch(baseUrl).then(res => res.json())
    }

}

export default categoryService