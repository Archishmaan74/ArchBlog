import { Typography } from "@mui/material";
import StyledNavFooter from "./NavFooterStyles";

const NavFooter = () => {
  return (
    <StyledNavFooter>
      <Typography variant="body2" className="footer-text">
        &copy; {new Date().getFullYear()} ArchBlog. All rights reserved.
      </Typography>
    </StyledNavFooter>
  );
};

export default NavFooter;
