import { useState } from "react";
// Components
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
// Styles
import "./Profile.scss";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const intialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(intialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = e => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async e => {
    e.preventDefault();
  };

  const dispatch = useDispatch();
  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={profile?.email}
                disabled
              />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                name="image"
                id="photo"
                onChange={handleImageChange}
              />
            </p>
            <div>
              <button className="--btn --btn-primary">Save Changes</button>
            </div>
          </span>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;