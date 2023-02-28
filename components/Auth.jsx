import React from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function Auth() {
  const firebaseAuth = getAuth(firebaseApp);
  const [user] = useAuthState(firebaseAuth);
  return (
    <div>
      <div className="fixed top-0.5 left-0 pt-2 pl-3">
        <h2 className="text-xl font-bold">TODO</h2>
      </div>
      <div className="fixed top-0.5 right-0 mr-5">
        <div>
          <h3 className="text-slate-300 mb-4 mt-2 text-lg">{user.email}</h3>
          <button
            onClick={() => firebaseAuth.signOut()}
            className="cursor-pointer bg-red-400 pt-1 pl-2 pr-2 pb-1 rounded-sm hover:bg-slate-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Auth;
