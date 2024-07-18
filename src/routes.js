import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Orders from "./pages/Orders";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useContextValue } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, userId } = useContextValue();
  return <>{isLoggedIn && userId ? element : <Navigate to="/login" />}</>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "orders", element: <ProtectedRoute element={<Orders />} /> },
      { path: "carts", element: <ProtectedRoute element={<Carts />} /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);
