import { createBrowserRouter } from "react-router-dom";
import { Error } from "./components/common/Error";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

const routerList = [
  {
    path: "/",
    element: <Home />,
  },
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
