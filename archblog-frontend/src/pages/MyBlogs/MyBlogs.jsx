import { useState } from "react";
import {
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Paper,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save,
  Close,
} from "@mui/icons-material";
import {
  useGetMyBlogsQuery,
  useDeleteBlogMutation,
  useEditBlogMutation,
} from "../../app/services/blogApi";
import StyledMyBlogs from "./MyBlogsStyles";
import Loader from "../../components/Loader/Loader";
import { formatDateTime } from "../../utils/helper";

const MyBlogs = () => {
  const { data: blogs, error, isLoading } = useGetMyBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [editBlog] = useEditBlogMutation();

  const [editModeId, setEditModeId] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", content: "" });

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      await deleteBlog(id).unwrap();
      alert("Blog deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  const handleEditClick = (blog) => {
    setEditModeId(blog.id);
    setEditedData({ title: blog.title, content: blog.content });
  };

  const handleCancel = () => {
    setEditModeId(null);
    setEditedData({ title: "", content: "" });
  };

  const handleSave = async (id) => {
    try {
      await editBlog({ id, ...editedData }).unwrap();
      alert("Blog updated successfully.");
      setEditModeId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update blog.");
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <StyledMyBlogs>
        <Typography color="error">
          Failed to load your blogs. Please try again.
        </Typography>
      </StyledMyBlogs>
    );
  }

  return (
    <StyledMyBlogs>
      <Typography className="home-title">Your Blogs</Typography>

      {blogs?.length > 0 ? (
        blogs.map((blog) => {
          const {
            id,
            firstName,
            lastName,
            title,
            content,
            timeOfBlog,
            dateOfBlog,
          } = blog;
          const { dateStr, timeStr } = formatDateTime(dateOfBlog, timeOfBlog);

          return (
            <Paper elevation={1} className="blog-card" key={id}>
              {editModeId === id ? (
                <>
                  <TextField
                    name="title"
                    label="Title"
                    fullWidth
                    value={editedData.title}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    name="content"
                    label="Content"
                    fullWidth
                    multiline
                    rows={3}
                    value={editedData.content}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                  />
                  <Box className="action-buttons">
                    <Tooltip title="Save">
                      <IconButton
                        color="success"
                        onClick={() => handleSave(id)}
                      >
                        <Save />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton onClick={handleCancel}>
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <>
                  <Box className="blog-header">
                    <Typography className="blog-title">{title}</Typography>
                    <Box className="flex-box">
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(blog)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography className="blog-content">{content}</Typography>
                  <Typography className="blog-date">
                    {firstName} {lastName}
                  </Typography>
                  <Typography className="blog-date">
                    {dateStr} - {timeStr}
                  </Typography>
                </>
              )}
            </Paper>
          );
        })
      ) : (
        <Typography>No blogs posted by you yet.</Typography>
      )}
    </StyledMyBlogs>
  );
};

export default MyBlogs;
