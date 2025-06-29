import { useGetBlogsQuery } from "../../app/services/blogApi";
import { Typography } from "@mui/material";
import StyledHome from "./HomeStyles";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <StyledHome>
        <Typography color="error">
          Failed to load blogs. Please try again.
        </Typography>
      </StyledHome>
    );
  }

  return (
    <StyledHome>
      <Typography className="home-title">All Blogs</Typography>

      {blogs?.length > 0 ? (
        blogs.map(
          ({
            id,
            firstName,
            lastName,
            title,
            content,
            timeOfBlog,
            dateOfBlog,
          }) => (
            <div className="blog-card" key={id}>
              <Typography className="blog-title">{title}</Typography>
              <Typography className="blog-content">{content}</Typography>
              <Typography className="blog-date">
                {firstName} {lastName}
              </Typography>
              <Typography className="blog-date">
                {dateOfBlog} - {timeOfBlog}
              </Typography>
            </div>
          )
        )
      ) : (
        <Typography>No blogs found.</Typography>
      )}
    </StyledHome>
  );
};

export default Home;
