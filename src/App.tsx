import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { GlobalStyle } from "./style/global";
import Home from "./pages/Home";
import { Error } from "./components/common/Error";

const routerList = [
  {
    path: "/",
    element: <Home />,
  },
];

const router = createBrowserRouter(
  routerList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
