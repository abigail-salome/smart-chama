import { createContext, useEffect, useState } from "react";
import { logIn, logOut, signUp } from "../Services/authService";
import { db } from "../db/db"; // make sure your Dexie instance is here

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // prevents redirect before user is restored

  // Restore user from localStorage + Dexie on first load
  useEffect(() => {
    const restoreUser = async () => {
      const storedUserId = localStorage.getItem("currentUserId");
      if (storedUserId) {
        const dbUser = await db.users.get(Number(storedUserId));
        if (dbUser) {
          setUser(dbUser);
        } else {
          handleLogOut(); // cleanup if user no longer exists
        }
      }
      setLoading(false);
    };

    restoreUser();
  }, []);

  // Sign up + auto login
  const handleSignUp = async (fullname, email, password) => {
    try {
      const newUser = await signUp(fullname, email, password);

      setUser(newUser);
      localStorage.setItem("currentUserId", newUser.id); // store only ID

      return newUser;
    } catch (err) {
      throw new Error("Sign up failed: " + err.message);
    }
  };

  // Log in
  const handleLogIn = async (email, password) => {
    try {
      const loggedUser = await logIn(email, password);
      setUser(loggedUser);
      localStorage.setItem("currentUserId", loggedUser.id);
      return loggedUser;
    } catch (err) {
      throw new Error("Invalid email or password");
    }
  };

  // Log out
  const handleLogOut = () => {
    logOut();
    setUser(null);
    localStorage.removeItem("currentUserId");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleSignUp, handleLogIn, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
