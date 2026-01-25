import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import FindPartners from "../pages/FindPartners";
import CreateProfile from "../pages/CreateProfile";
import MyConnections from "../pages/MyConnections";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PartnerDetails from "../pages/PartnerDetails";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "find-partners", element: <FindPartners /> },
      { path: "create-profile", element: <CreateProfile /> },
      { path: "my-connections", element: <MyConnections /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "partner/:id", element: <PartnerDetails /> },
    ],
  },
]);

export default router;
