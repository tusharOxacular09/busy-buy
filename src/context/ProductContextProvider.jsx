import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

// Custom Hook
export const useProductContextValue = () => {
  const value = useContext(ProductContext);
  return value;
};

// Context Provider
const ProductContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <ProductContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
