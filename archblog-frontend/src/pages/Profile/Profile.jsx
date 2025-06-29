import { useState } from "react";
import {
  useGetLoggedInUserQuery,
  useUpdateUserMutation,
} from "../../app/services/blogApi";
import StyledProfile from "./ProfileStyles";
import { TextField, Button } from "@mui/material";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const { data: user, isLoading, error } = useGetLoggedInUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    companyName: "",
  });

  if (user && !formData.firstName) {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      companyName: user.companyName,
    });
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile!");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <StyledProfile>Failed to load user profile.</StyledProfile>;
  }

  return (
    <StyledProfile>
      <div className="profile-paper">
        <h2 className="profile-title">My Profile</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            className="profile-textfield"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            className="profile-textfield"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            name="gender"
            label="Gender"
            variant="outlined"
            fullWidth
            className="profile-textfield"
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            name="companyName"
            label="Company Name"
            variant="outlined"
            fullWidth
            className="profile-textfield"
            value={formData.companyName}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" className="submit-button">
            Save Changes
          </Button>
        </form>
      </div>
    </StyledProfile>
  );
};

export default Profile;
