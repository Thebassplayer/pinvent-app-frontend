import { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getLoginStatus } from "./services/authServices";

import { SET_LOGIN } from "./redux/features/auth/authSlice";

// Axios
import axios from "axios";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Sidebar from "./components/sidebar/sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loginStatus = async () => {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    };
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
