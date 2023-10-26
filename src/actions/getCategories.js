import axios from 'axios';

export const getCategories = () => {
    try {
        const categories = axios.get('http://localhost:8080/categories').then((response) => {
            const result = response.data.map((category) => ({
                display: category.display,
                categorySlug: category.categorySlug
            }))
            return result
        })
        return categories
    } catch (error) {
        console.log(error)
        return []
    }
}