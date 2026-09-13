import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import {
  useGetLoggedInUserQuery,
  usePutUpdateUserMutation,
} from "../../app/services/authApi";
import StyledProfile from "./ProfileStyles";
import { TextField, Button } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { getApiErrorMessage } from "../../utils/apiError";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetLoggedInUserQuery();
  const [updateUser, { error: updateError }] = usePutUpdateUserMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    companyName: "",
  });
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        companyName: user.companyName || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (error || updateError) {
      setShowError(true);
    }
  }, [error, updateError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateUser(formData).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (isLoading) return <Loader />;

  const currentError = error || updateError;

  return (
    <StyledProfile>
      <ErrorModal
        open={showError}
        message={currentError ? getApiErrorMessage(currentError) : ""}
        onClose={() => setShowError(false)}
      />

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

          <Button
            variant="outlined"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </form>
      </div>
    </StyledProfile>
  );
};

export default Profile;
