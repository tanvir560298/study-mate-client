import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import MainLayout from "../layouts/MainLayout";

import Start from "../pages/Start";
import Home from "../pages/Home";
import FindPartners from "../pages/FindPartners";
import CreateProfile from "../pages/CreateProfile";
import MyConnections from "../pages/MyConnections";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PartnerDetails from "../pages/PartnerDetails";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";

import PrivateRoute from "./PrivateRoute"; // ✅ ADD THIS

const router = createBrowserRouter([
  // ✅ Public (No Navbar / No Footer)
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Start /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  // ✅ App (Protected + Has Navbar / Footer)
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> }, // /app
      // { path: "home", element: <Home /> }, // (optional) remove to avoid duplicate
      { path: "find-partners", element: <FindPartners /> },
      { path: "create-profile", element: <CreateProfile /> },
      { path: "my-connections", element: <MyConnections /> },
      { path: "profile", element: <Profile /> },
      { path: "partner/:id", element: <PartnerDetails /> },
    ],
  },
]);

export default router;
