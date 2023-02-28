import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase-config";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../pages/api/todo";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const firebaseAuth = getAuth(firebaseApp);
  const [user] = useAuthState(firebaseAuth);
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(
      collection(firebaseDB, "todo"),
      where("user", "==", user.uid)
    );
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
  useEffect(() => {
    refreshData();
  }, [user]);
  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      console.log("Task deleted successfully");
    }
  };
  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    console.log("Status updated Successfully");
  };

  const [search, setSearch] = useState("");

  return (
    <div className="mt-8 w-10/12 my-0 mx-auto h-auto flex flex-col max-sm:mt-4 max-sm:w-5/6 xl:mt-10 xl:w-11/12">
      <textarea
        placeholder="Search status"
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 ml-auto mr-2 w-32 text-center rounded-sm outline-none resize-none text-gray-900 max-sm:mb-2 max-sm:max-h-7 max-sm:w-28 xl:mb- xl:text-xl xl:pt-3 xl:w-40"
      ></textarea>
      <div className="grid grid-cols-1 gap-8 h-auto w-full tracking-wider max-sm:gap-6">
        {todos &&
          todos
            .filter((todo) => {
              return search.toLowerCase() === ""
                ? todo
                : todo.status.toLowerCase().includes(search.toLowerCase());
            })
            .map((todo) => (
              <div className="w-auto p-5 shadow-xl shadow-slate-400 transition ease-in-out delay-200 hover:shadow-2xl h-auto overflow-auto max-sm:p-2.5 xl:p-7">
                <h3 className="text-xl font-sans p-2 max-sm:text-lg max-sm:p-1.5 xl:p-4 xl:text-3xl border-b-2 border-slate-500 shadow-sm shadow-slate-300">
                  {todo.title}{" "}
                  <div
                    className="text-red-500 bg-inherit transition duration-200 hover:bg-inherit hover:scale-125 float-right text-sm ml-2 cursor-pointer max-sm:text-lg max-sm:ml-1 xl:ml-2.5 xl:text-2xl"
                    onClick={() => handleTodoDelete(todo.id)}
                  >
                    <FaTrash />
                  </div>
                  <div
                    className="bg-inherit transition ease-in-out duration-200 hover:bg-inherit hover:scale-125 float-right text-sm ml-2 cursor-pointer max-sm:text-lg max-sm:ml-1 xl:ml-2.5 xl:text-2xl"
                    onClick={() => handleToggle(todo.id, todo.status)}
                  >
                    {todo.status == "pending" ? (
                      <FaToggleOff />
                    ) : (
                      <FaToggleOn />
                    )}
                  </div>
                  <div
                    className="float-right opacity-70 max-sm:hidden"
                  >
                    {todo.status}
                  </div>
                </h3>
                <p className="text-lg break-all mt-2 ml-3 mr-3 mb-3 max-sm:text-base max-sm:mt-1 max-sm:ml-2 max-sm:mr-2 max-sm:mb-2 xl:text-2xl xl:mt-3 xl:ml-4 xl:mr-4 xl:mb-4">
                  {todo.description}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
export default TodoList;
