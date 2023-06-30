import { useEffect, useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../services/authServices";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
// Custom Hooks
import useRedirectLoggedOutUser from "../../Hooks/useRedirectLoggedOutUser";
// Styles
import "./Profile.scss";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      const data = await getUser();
      console.log(data);
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    };
    getProfile();
  }, [dispatch]);
  return <div>Profile</div>;
};

export default Profile;
