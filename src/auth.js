import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "./Firebase";
import useLoggedInUser from "./loggedInUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loggedInUser = useLoggedInUser();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const getUserId = () => {
    if (isAuthenticated) {
      const user = auth.currentUser;
      return user ? user.uid : null;
    } else {
      return null;
    }
  };

  const login = async (email, password, rememberMe) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem("uid", userCredential.user.uid);

      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
      }

      setIsAuthenticated(true);

      const currentUser = userCredential.user;

      await firestore.collection("users").doc(currentUser.uid).update({
        lastSeen: new Date.now().toString(),
      });
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
      localStorage.removeItem("uid");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      alert("Failed to send password reset email. Please try again.");
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

      localStorage.setItem("uid", user.uid);

      localStorage.setItem("isAuthenticated", "true");

      await firestore.collection("users").doc(user.uid).set({
        photoURL: "https://firebasestorage.googleapis.com/v0/b/learnsynchub-fc3b1.appspot.com/o/user_images%2Fdefault%2F1%20avatar1.jpeg?alt=media&token=2721236f-5350-4fa5-8caa-3bee61fcfbd5",
        email: user.email,
        password: password,
        joinedAt: Date.now().toString(),
        lastSeen: Date.now().toString(),
        isTeacher: false,
      });

      setIsAuthenticated(true);

      console.log("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        getUserId,
        handleForgotPassword,
        loggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
