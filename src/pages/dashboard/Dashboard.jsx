import { useEffect } from "react";
// Custom Hooks
import useRedirectLogedOutUser from "../../Hooks/useRedirectLogedOutUser";
// Redux
import { useDispatch, useSelector } from "react-redux";
//Redux Slices
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
//Components
import ProductList from "../../components/product/productList/ProductList";

const Dashboard = () => {
  useRedirectLogedOutUser("login");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { products, isLoading, isError, message } = useSelector(
    state => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoading, isError, message]);
  return (
    <div>
      <h2>Dashboard</h2>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
