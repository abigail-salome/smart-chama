import { createContext, useEffect, useState } from "react";
import { logIn, logOut, signUp } from "../Services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //  Restore user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sign up + auto login
  const handleSignUp = async (fullname, email, password) => {
    const newUser = await signUp(fullname, email, password);

    //  auto-login immediately
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return newUser;
  };

  //  Log in
  const handleLogIn = async (email, password) => {
    const loggedUser = await logIn(email, password);
    setUser(loggedUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedUser));
    return loggedUser;
  };

  //  Log out
  const handleLogOut = () => {
    logOut();
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleSignUp, handleLogIn, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
