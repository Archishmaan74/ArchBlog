import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store";

import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import Loader from "./components/Loader/Loader";

const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const Home = lazy(() => import("./pages/Home/Home"));
const AddBlog = lazy(() => import("./pages/AddBlog/AddBlog"));
const MyBlogs = lazy(() => import("./pages/MyBlogs/MyBlogs"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/write" element={<AddBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
