import { Typography } from "@mui/material";
import StyledEmptyState from "./EmptyStateStyles";

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <StyledEmptyState>
      <Typography className="empty-title">{title}</Typography>
      <Typography className="empty-message">{message}</Typography>
    </StyledEmptyState>
  );
};

export default EmptyState;
