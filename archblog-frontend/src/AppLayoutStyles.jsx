import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledAppLayout = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflow: "hidden",
}));

export const Header = styled(Box)(({}) => ({
  flexShrink: 0,
}));

export const Main = styled(Box)(({}) => ({
  flexGrow: 1,
  overflowY: "auto",
}));

export const Footer = styled(Box)(({}) => ({
  flexShrink: 0,
}));
