import { useGetMyBlogsQuery } from "../../app/services/blogApi";
import { Typography } from "@mui/material";
import StyledMyBlogs from "./MyBlogsStyles";
import Loader from "../../components/Loader/Loader";
import { formatDateTime } from "../../utils/helper";

const MyBlogs = () => {
  const { data: blogs, error, isLoading } = useGetMyBlogsQuery();

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
        blogs.map(
          ({
            id,
            firstName,
            lastName,
            title,
            content,
            timeOfBlog,
            dateOfBlog,
          }) => {
            const { dateStr, timeStr } = formatDateTime(dateOfBlog, timeOfBlog);

            return (
              <div className="blog-card" key={id}>
                <Typography className="blog-title">{title}</Typography>
                <Typography className="blog-content">{content}</Typography>
                <Typography className="blog-date">
                  {firstName} {lastName}
                </Typography>
                <Typography className="blog-date">
                  {dateStr} - {timeStr}
                </Typography>
              </div>
            );
          }
        )
      ) : (
        <Typography>No blogs posted by you yet.</Typography>
      )}
    </StyledMyBlogs>
  );
};

export default MyBlogs;
