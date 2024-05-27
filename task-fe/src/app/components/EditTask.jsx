import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addTask, selectAllTasks, updateTask } from "../store/taskSlice";

const EditTask = () => {
    const tasks = useSelector(selectAllTasks) ?? [];
    const taskId = useSelector((state) => state.tasks.selectedId);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const task = tasks.find((task) => task.id === taskId) ?? {};
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date);
    }, [taskId]);

    const setInput = (value, setFunction) => {
        setFunction(value);
        setError("");
    };

    const editTask = () => {
        const date = new Date(dueDate);
        const due_date = date.toISOString().split("T")[0];
        dispatch(
            updateTask({
                taskId,
                data: { title, description, due_date },
                accessToken: user.accessToken,
            })
        );

        document.getElementById("editTask").close();
    };

    return (
        <div>
            <dialog id="editTask" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Task</h3>
                    <div>
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

                        <button
                            onClick={editTask}
                            className="btn btn-primary w-full"
                        >
                            Update Task
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default EditTask;
