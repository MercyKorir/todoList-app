import React from "react";
import { useState } from "react";
import { addTodo } from "../pages/api/todo";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../firebase-config";
import { getAuth } from "firebase/auth";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const firebaseAuth = getAuth(firebaseApp);
  const [user] = useAuthState(firebaseAuth);
  const handleTodoCreate = async () => {
    if (!user) {
      console.log("You must be logged in to continue");
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");
    console.log("Task created successfully");
  };

  return (
    <div className="w-2/3 block my-0 mx-auto h-auto max-sm:w-5/6 xl:w-10/12">
      <div className="flex flex-col">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-gray-900 mt-10 outline-none rounded-sm mb-3 p-2 max-sm:mt-1 max-sm:mb-2 max-sm:p-1.5 xl:mb-5 xl:p-4 xl:text-2xl"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-gray-900 outline-none resize-none rounded-sm mb-3 p-2 max-sm:mb-2 max-sm:p-1.5 xl:mb-5 xl:p-5 xl:text-2xl"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-gray-900 rounded-sm mb-3 w-1/3 p-2 max-sm:mb-2.5 max-sm:p-1 xl:w-1/3 xl:mb-5 xl:p-4 xl:text-xl"
        >
          <option
            value={"pending"}
            className="text-yellow-400 font-semibold cursor-pointer"
          >
            Pending
          </option>
          <option
            value={"completed"}
            className="text-green-500 font-semibold cursor-pointer"
          >
            Completed
          </option>
        </select>
        <button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variant="solid"
          className="bg-red-300 w-36 text-center hover:bg-slate-500 cursor-pointer rounded-sm py-2 pl-3 pr-3 max-sm:w-fit max-sm:pt-0.5 max-sm:py-1 max-sm:p-6 xl:py-4 xl:pl-6 xl:pr-6 xl:text-xl xl:w-1/4"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
