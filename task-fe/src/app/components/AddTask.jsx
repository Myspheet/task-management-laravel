import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/taskSlice";
import ErrorMessage from "./Error";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");
    const user = useSelector((state) => state.user.user);
    const fetchTaskStatus = useSelector((state) => state.tasks.status);

    const dispatch = useDispatch();

    const setInput = (value, setFunction) => {
        setFunction(value);
        setError("");
    };

    const userAddTask = () => {
        if (!dueDate || !title || !description) {
            setError("All fields are required");
            return;
        }
        const date = new Date(dueDate);
        const due_date = date.toISOString().split("T")[0];
        dispatch(
            addTask({
                title,
                description,
                due_date,
                accessToken: user.accessToken,
            })
        );

        document.getElementById("addTask").close();
        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <div>
            <button
                onClick={() => document.getElementById("addTask").showModal()}
                className="btn btn-primary w-full"
            >
                ADD NEW TASK <FaPlus size={18} className="ml-2" />{" "}
            </button>

            <dialog id="addTask" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Task</h3>
                    {fetchTaskStatus === "loading" ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div>
                            <div className="pb-5 pt-5">
                                {error && <ErrorMessage message={error} />}
                            </div>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setInput(e.target.value, setTitle)
                                    }
                                    className="grow"
                                    placeholder="Title"
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setInput(e.target.value, setDescription)
                                    }
                                    className="grow"
                                    placeholder="Description"
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) =>
                                        setInput(e.target.value, setDueDate)
                                    }
                                    className="grow"
                                    placeholder="Name"
                                />
                            </label>

                            <div className="pt-5">
                                <button
                                    onClick={() => userAddTask()}
                                    className="btn btn-primary w-full"
                                >
                                    Add Task
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default AddTask;
