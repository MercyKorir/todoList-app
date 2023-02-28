import React from "react";
import { useEffect, useState } from "react";
import { firebaseApp } from "../../firebase-config";
import { getAuth } from "firebase/auth";

function useAuth() {
  const firebaseAuth = getAuth(firebaseApp);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  });

  return { user, isLoggedIn };
}

export default useAuth;
