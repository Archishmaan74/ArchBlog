import { Outlet } from "react-router-dom";
import NavHeader from "./components/NavHeader/NavHeader";
import NavFooter from "./components/NavFooter/NavFooter";
import { StyledAppLayout, Header, Main, Footer } from "./AppLayoutStyles";

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header>
        <NavHeader />
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        <NavFooter />
      </Footer>
    </StyledAppLayout>
  );
};

export default AppLayout;
