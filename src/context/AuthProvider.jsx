import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

// Custom Hook
export const useContextValue = () => {
  const value = useContext(UserContext);
  return value;
};

// Context Provider
const CustomContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserId(user.uid);
      } else {
        setLoggedIn(false);
        setUserId(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default CustomContextProvider;
