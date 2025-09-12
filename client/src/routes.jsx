import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";

 const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {element:<ProtectedRoutes/>,
    children:[
       {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
   {
    path: "/setup-2fa",
    element: <Setup2FA />,
    errorElement: <Error />,
  },
  {
    path: "/verify-2fa",
    element: <Verify2FA />,
    errorElement: <Error />,
  },
    ]
  }
]);
export default router