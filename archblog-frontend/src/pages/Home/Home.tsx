import { useEffect, useState } from "react";
import { useGetBlogsQuery } from "../../app/services/blogApi";
import { Typography } from "@mui/material";
import StyledHome from "./HomeStyles";
import Loader from "../../components/Loader/Loader";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import EmptyState from "../../components/EmptyState/EmptyState";
import { formatDateTime } from "../../utils/helper";
import { getApiErrorMessage } from "../../utils/apiError";

const Home = () => {
  const { data: blogs, error, isLoading } = useGetBlogsQuery();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <StyledHome>
        <ErrorModal
          open={showError}
          message={getApiErrorMessage(error)}
          onClose={() => setShowError(false)}
        />
      </StyledHome>
    );
  }

  return (
    <StyledHome>
      <Typography className="home-title">All Blogs</Typography>

      {blogs && blogs.length > 0 ? (
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
          },
        )
      ) : (
        <EmptyState
          title="No blogs yet"
          message="There are no blogs available right now. Check back later."
        />
      )}
    </StyledHome>
  );
};

export default Home;
