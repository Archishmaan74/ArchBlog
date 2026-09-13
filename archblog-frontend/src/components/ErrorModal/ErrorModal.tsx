import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, DialogContent, DialogTitle, Typography } from "@mui/material";
import StyledErrorModal, { StyledDialogActions } from "./ErrorModalStyles";

interface ErrorModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ open, message, onClose }: ErrorModalProps) => {
  return (
    <StyledErrorModal open={open} onClose={onClose}>
      <DialogTitle>
        <ErrorOutlineIcon />
        Something went wrong
      </DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <StyledDialogActions>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </StyledDialogActions>
    </StyledErrorModal>
  );
};

export default ErrorModal;
