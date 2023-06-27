// Redux
import { useDispatch } from "react-redux";

// Redux Actions
import { SET_LOGIN } from "../../../redux/features/auth/authSlice";

//Services
import { logoutUser } from "../../services/authServices";

// React Router
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    navigate("/");
  };
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">Roy</span>
        </h3>
        <button className="--btn --btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
