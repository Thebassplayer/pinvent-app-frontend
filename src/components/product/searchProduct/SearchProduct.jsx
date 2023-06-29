// Icons
import { BiSearch } from "react-icons/bi";
// Styles
import styles from "./SearchProduct.module.scss";
const SearchProduct = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search product"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchProduct;
