import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { usePostAddBlogMutation } from "../../app/services/blogApi";
import StyledAddBlog from "./AddBlogStyles";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { getApiErrorMessage } from "../../utils/apiError";

const AddBlog = () => {
  const [addBlog, { isLoading, error }] = usePostAddBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addBlog(formData).unwrap();
      setSuccess(true);
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (success) return <Navigate to="/home" />;
  if (isLoading) return <Loader />;

  return (
    <StyledAddBlog>
      <ErrorModal
        open={showError}
        message={error ? getApiErrorMessage(error) : ""}
        onClose={() => setShowError(false)}
      />

      <div className="addblog-paper">
        <div className="addblog-header">
          <h2 className="addblog-title">Add a New Blog</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Blog Title"
            variant="outlined"
            fullWidth
            className="addblog-textfield"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TextField
            name="content"
            label="Blog Content"
            variant="outlined"
            multiline
            rows={8}
            fullWidth
            className="addblog-textfield"
            value={formData.content}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            className="submit-button"
            disabled={isLoading}
          >
            Post Blog
          </Button>
        </form>
      </div>
    </StyledAddBlog>
  );
};

export default AddBlog;
