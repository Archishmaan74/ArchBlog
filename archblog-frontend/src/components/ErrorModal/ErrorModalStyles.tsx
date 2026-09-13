import { Dialog, DialogActions, styled } from "@mui/material";

const StyledErrorModal = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px",
    overflow: "hidden",
    animation: "modalEnter 0.25s ease-out",
  },
  "@keyframes modalEnter": {
    from: {
      opacity: 0,
      transform: "scale(0.92)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  "& .MuiDialogTitle-root": {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 700,
    paddingBottom: "8px",
  },
  "& .MuiDialogTitle-root svg": {
    color: "#ff6f00",
    fontSize: "30px",
  },
  "& .MuiDialogContent-root p": {
    color: "text.secondary",
    lineHeight: 1.6,
  },
});

export const StyledDialogActions = styled(DialogActions)({
  padding: "8px 24px 20px",
  "& .MuiButton-root": {
    backgroundColor: "#ff6f00",
    borderRadius: "8px",
    padding: "8px 24px",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#e65100",
    },
  },
});

export default StyledErrorModal;
