import { useState, useEffect } from "react";
// Components
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
// React Router
import { useNavigate, useParams } from "react-router-dom";
// Custom Hook
import useImageProductUploader from "../../Hooks/useImageProductUploader";
import useProductEditor from "../../Hooks/useProductEditor";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  // const [product, setProduct] = useState(productEdit);
  // const [description, setDescription] = useState("");
  const { productImage, imagePreview, handleImageChange, setImagePreview } =
    useImageProductUploader();
  console.log("ProductImage @ EditProduct.jsx: ", productImage);

  const {
    product,
    setProduct,
    description,
    setDescription,
    handleInputChange,
    handleSubmit,
  } = useProductEditor(
    productEdit,
    productEdit?.description || "",
    async formData => {
      await Promise.all([
        dispatch(updateProduct({ id, formData })),
        dispatch(getProducts()),
      ]);
      navigate("/dashboard");
    },
    productImage
  );

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.url}` : null
    );
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);
  // const handleInputChange = e => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  // };

  console.log("product @ EditProduct.jsx: ", product);

  // const saveProductOnDB = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", product?.name);
  //   formData.append("category", product?.category);
  //   formData.append("quantity", product?.quantity);
  //   formData.append("price", product?.price);
  //   formData.append("description", description);
  //   if (productImage) {
  //     formData.append("image", productImage);
  //   }
  //   console.log("formData @ EditProduct.jsx: ", formData);
  //   await Promise.all([
  //     dispatch(updateProduct({ id, formData })),
  //     dispatch(getProducts()),
  //   ]);
  //   navigate("/dashboard");
  // };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProductOnDB={handleSubmit}
      />
    </div>
  );
};

export default EditProduct;
