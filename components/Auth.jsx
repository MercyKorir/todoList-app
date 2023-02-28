import React from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { firebaseApp } from "../firebase-config";
import useAuth from "../pages/hooks/useAuth";

function Auth() {
  const firebaseAuth = getAuth(firebaseApp);
  /*const { toggleColorMode, colorMode } = useColorMode();*/
  const { isLoggedIn, user } = useAuth();
  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <div className="fixed top-0.5 left-0 pt-2 pl-3">
        <h2 className="text-xl font-bold">TODO</h2>
      </div>
      <div className="fixed top-0.5 right-0 mr-5">
        {isLoggedIn && (
          <div>
            <h3 className="text-slate-300 mb-4 mt-2 text-lg">{user.email}</h3>
            <button
              onClick={() => firebaseAuth.signOut()}
              className="cursor-pointer bg-red-400 pt-1 pl-2 pr-2 pb-1 rounded-sm hover:bg-slate-500"
            >
              Logout
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => handleAuth()}
            className="mr-3 p-2 flex text-lg text-center"
          >
            <a className="text-slate-300 pr-2 text-center m-auto">
              <FaGoogle />
            </a>
            <h3 className="text-orange-500">Login with Google</h3>
          </button>
        )}
      </div>
    </div>
  );
}
export default Auth;
