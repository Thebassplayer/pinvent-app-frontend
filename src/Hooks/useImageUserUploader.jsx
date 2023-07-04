import { useState } from "react";

import { toast } from "react-toastify";

const useImageUserUploader = () => {
  const [userImage, setUserImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  console.log("userImage @ useImageUserUploader: ", userImage);

  const handleImageChange = e => {
    const file = e.target.files[0];
    console.log("file @ useImageUserUploader: ", file);

    // Check if a file is selected
    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "gif", "png"];
      const extension = file.name.split(".").pop().toLowerCase();

      // Check if the file extension is allowed
      if (allowedExtensions.includes(extension)) {
        setUserImage(file);
        console.log("userImage @ useImageUserUploader: ", userImage);
        setImagePreview(URL.createObjectURL(file));
      } else {
        // Display an error or show a notification to the user
        toast.error(
          "Invalid image format. Please select a JPG, JPEG, GIF, or PNG file."
        );
      }
    }
  };

  return {
    userImage,
    imagePreview,
    handleImageChange,
    setImagePreview,
  };
};

export default useImageUserUploader;
