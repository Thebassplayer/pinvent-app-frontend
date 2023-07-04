import { useState } from "react";
// React Toastify
import { toast } from "react-toastify";
// React Router
import { useNavigate } from "react-router-dom";

const useProfileEditor = (initialProfile, userImage, onUpdate) => {
  const [profile, setProfile] = useState(initialProfile);
  console.log("--- profile @ useProfileEditor: ", profile);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("handleSubmit @ EditProfile fired");
    try {
      const formData = new FormData();
      formData.append("username", profile?.name);
      formData.append("email", profile?.email);
      formData.append("phone", profile?.phone);
      formData.append("bio", profile?.bio);
      if (userImage) {
        formData.append("photo", userImage);
      }
      console.log("--- formData @ EditProfile: ", [...formData]);

      const data = await onUpdate(formData);
      console.log(data);
      toast.success("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return { profile, setProfile, handleSubmit, handleInputChange };
};

export default useProfileEditor;
