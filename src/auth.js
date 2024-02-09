import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "./Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
        // You can store additional user data here if needed
      }
      setIsAuthenticated(true);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        alert("Incorrect password. Please try again.");
      } else {
        console.error("Error logging in:", error.code);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const register = async (email, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore.collection("users").doc(user.uid).set({
        email: user.email,
        user: user.uid,
        password: password,
      });

      console.log("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
