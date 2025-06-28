import { useGetBlogsQuery } from "../../app/services/blogApi";
import { CircularProgress, Box, Typography } from "@mui/material";

const Home = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to load blogs. Please try again.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4, color: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        All Blogs
      </Typography>

      {blogs?.length > 0 ? (
        blogs.map((blog) => (
          <Box
            key={blog.id}
            sx={{ mb: 3, p: 2, backgroundColor: "#1f1f1f", borderRadius: 2 }}
          >
            <Typography variant="h6" color="orange">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="gray">
              {blog.genre}
            </Typography>
            <Typography variant="body1" mt={1}>
              {blog.content}
            </Typography>
            <Typography variant="caption" display="block" mt={1} color="gray">
              {blog.dateOfBlog} - {blog.timeOfBlog}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>No blogs found.</Typography>
      )}
    </Box>
  );
};

export default Home;
