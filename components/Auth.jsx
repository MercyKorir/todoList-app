import React from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function Auth() {
  const firebaseAuth = getAuth(firebaseApp);
  const [user] = useAuthState(firebaseAuth);
  return (
    <div>
      <div className="fixed top-0.5 left-0 pt-2 pl-3 max-sm:pl-2 xl:pl-5 xl:pt-3">
        <h2 className="text-xl font-bold max-sm:text-lg xl:text-4xl">TODO</h2>
      </div>
      <div className="fixed top-0.5 right-0 mr-5 max-sm:mr-2 xl:mr-6">
        <div>
          <h3 className="text-slate-300 mb-4 mt-2 text-lg max-sm:mb-2 max-sm:text-base max-sm:hidden xl:mb-4 xl:text-2xl xl:mt-4">{user.email}</h3>
          <button
            onClick={() => firebaseAuth.signOut()}
            className="cursor-pointer bg-red-400 pt-1 pl-2 pr-2 pb-1 rounded-sm hover:bg-slate-500 max-sm:pt-0.5 max-sm:pl-2 max-sm:pr-2 max-sm:pb-1.5 max-sm:mt-3 max-sm:text-sm max-sm:font-semibold xl:pt-2.5 xl:text-2xl xl:font-semibold xl:rounded-sm xl:pb-2.5 xl:pl-4 xl:pr-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Auth;
