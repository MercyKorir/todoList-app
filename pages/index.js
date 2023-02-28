import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase-config";

export default function Home() {
  const firebaseAuth = getAuth(firebaseApp);
  const router = useRouter();
  const [user, loading] = useAuthState(firebaseAuth);

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    router.push("/Login")
    return <div>Please sign in to continue</div>
  }

  return (
    <div className="max-w-7xl pb-20 pt-40 max-sm:pt-36 xl:pt-64 font-sans">
      <Auth />
      <AddTodo />
      <TodoList />
    </div>
  );
}
