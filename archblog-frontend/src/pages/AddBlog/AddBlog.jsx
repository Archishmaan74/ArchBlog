import { useState } from "react";
import {
  useGetLoggedInUserQuery,
  useAddBlogMutation,
} from "../../app/services/blogApi";
import StyledAddBlog from "./AddBlogStyles";
import { TextField, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

const AddBlog = () => {
  const { data: user, isLoading, error } = useGetLoggedInUserQuery();
  const [addBlog] = useAddBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();

    const blogData = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      companyName: user.companyName,
      title: formData.title,
      content: formData.content,
      dateOfBlog: now.toISOString().split("T")[0],
      timeOfBlog: now.toTimeString().split(" ")[0],
    };

    try {
      await addBlog(blogData).unwrap();
      alert("Blog added successfully!");
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to add blog:", err);
      alert("Something went wrong!");
    }
  };

  if (isLoading) {
    return (
      <StyledAddBlog>
        <CircularProgress color="warning" />
      </StyledAddBlog>
    );
  }

  if (error?.status === 401) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return <StyledAddBlog>Error loading user!</StyledAddBlog>;
  }
  console.log("✅ AddBlog.jsx mounted");

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
          <Button type="submit" variant="contained" className="submit-button">
            Post Blog
          </Button>
        </form>
      </div>
    </StyledAddBlog>
  );
};

export default AddBlog;
