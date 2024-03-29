import React from "react";
import { firebaseApp } from "../firebase-config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function Login() {
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(firebaseAuth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    router.push("/");
    return <div>Loading...</div>;
  }

  const loginGoogle = async () => {
    const response = await signInWithPopup(firebaseAuth, provider);
  };

  return (
    <div className="p-7 pt-16 text-center max-sm:pt-20">
      <h1 className="text-center text-4xl max-sm:text-3xl">Login/Sign Up</h1>
      <h2 className="pt-2 text-center text-lg max-sm:pt-1.5 max-sm:text-base">Please Sign In to continue</h2>
      <div className=" bg-red-300 p-5 pt-10 pb-10 rounded max-w-xl mx-auto mt-5 max-sm:pt-7 max-sm:pb-7 max-sm:max-w-lg">
        <form>
          <button
            type="button"
            onClick={loginGoogle}
            className="cursor-pointer p-3 w-1/4 max-sm:w-1/2 rounded bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 my-auto"
          >
            Google Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
