import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledAppLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflow: "hidden",
}));

export const Header = styled(Box)(({ theme }) => ({
  flexShrink: 0,
}));

export const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
}));

export const Footer = styled(Box)(({ theme }) => ({
  flexShrink: 0,
}));
