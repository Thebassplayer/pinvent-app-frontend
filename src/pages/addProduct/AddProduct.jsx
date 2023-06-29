import { useState } from "react";
// Components
import Loader from "../../components/loader/Loader";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Slices
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
// React Router
import { useNavigate } from "react-router-dom";
// Styles
import ProductForm from "../../components/product/productForm/ProductForm";

const initialState = {
  name: "",
  category: "",
  price: "",
  quantity: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, category, price, quantity } = product;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = e => {
    const newImage = e.target.files[0];
    setProductImage(newImage);
    setImagePreview(URL.createObjectURL(newImage));
  };

  const generateSKU = category => {
    const SKUPrefix = category.slice(0, 3).toUpperCase();
    const SKUUniqueNumber = Date.now();
    const SKU = `${SKUPrefix}-${SKUUniqueNumber}`;

    return SKU;
  };

  const saveProductOnDB = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add new Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProductOnDB={saveProductOnDB}
      />
    </div>
  );
};

export default AddProduct;