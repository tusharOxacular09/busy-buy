import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import CustomContextProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContextProvider from "./context/ProductContextProvider";

function App() {
  return (
    <>
      <CustomContextProvider>
        <ProductContextProvider>
          <RouterProvider router={router} />
        </ProductContextProvider>
      </CustomContextProvider>
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default App;
