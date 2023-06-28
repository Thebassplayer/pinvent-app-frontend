//Axios
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PRODUCTS_API_URL = `${BACKEND_URL}/api/products`;

// Create new Product

const createProduct = async formData => {
  const response = await axios.post(PRODUCTS_API_URL, formData);
  return response.data;
};

const productService = {
  createProduct,
};

export default productService;
