import { useState } from "react";
// Components
import { SpinnerImg } from "../../loader/Loader";
import SearchProduct from "../searchProduct/SearchProduct";
// Utilitys
import nameShorter from "../../../utils/nameShorter.js";
//Styles
import "./ProductList.scss";
// Icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const ProductList = ({ products, isLoading }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Item</h3>
          </span>
          <span>
            <SearchProduct
              value={searchInputValue}
              onChange={e => searchInputValue(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No product found, please add a product</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{nameShorter(name, 18)}</td>
                      <td>{category}</td>
                      <td>{`$${price}`}</td>
                      <td>{quantity}</td>
                      <td>{`$${price * quantity}`}</td>
                      <td className="icons">
                        <span>
                          <AiOutlineEye size={25} color={"purple"} />
                        </span>
                        <span>
                          <FaEdit size={20} color={"green"} />
                        </span>
                        <span>
                          <FaTrashAlt size={20} color={"red"} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
