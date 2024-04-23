import { createBrowserRouter } from "react-router-dom";
import { Error } from "./components/common/Error";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import path from "path";
import Login from "./pages/Login";
import Join from "./pages/Join";

const routerList = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "/join", element: <Join /> },
];

export const router = createBrowserRouter(
  routerList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);
