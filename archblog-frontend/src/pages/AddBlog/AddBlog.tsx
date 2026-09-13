import { useState } from "react";
import { usePostAddBlogMutation } from "../../app/services/blogApi";
import StyledAddBlog from "./AddBlogStyles";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const AddBlog = () => {
  const [addBlog] = usePostAddBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addBlog(formData).unwrap();
      setSuccess(true);
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to add blog:", err);
      setError("Something went wrong while adding the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) return <Navigate to="/home" />;
  if (isSubmitting) return <Loader />;

  return (
    <StyledAddBlog>
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
            disabled={isSubmitting}
          >
            Post Blog
          </Button>
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>
      </div>
    </StyledAddBlog>
  );
};

export default AddBlog;
