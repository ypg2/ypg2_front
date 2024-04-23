import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./style/global";
import { router } from "./router";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
