import { useState, useEffect } from "react";
import { auth, firestore } from "./Firebase";

const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {
        try {
          const userDoc = await firestore
            .collection("users")
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setLoggedInUser({
              uid: user.uid,
              email: user.email,
              isTeacher: userData.isTeacher ?? false,
              name: userData.name ?? "",
              photoURL: userData.photoURL ?? "",
            });
          } else {
            console.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setLoggedInUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  console.log("Logged in user");
  console.log(loggedInUser);

  return loggedInUser;
};

export default useLoggedInUser;
