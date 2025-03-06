import axios from 'axios';

const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:4004/products');
        return response.data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export default fetchProducts;
