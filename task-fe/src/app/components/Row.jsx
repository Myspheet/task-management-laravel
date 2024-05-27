import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask, setId } from "../store/taskSlice";

const Row = ({ task }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const removeTask = () => {
        dispatch(
            deleteTask({ taskId: task.id, accessToken: user.accessToken })
        );
    };

    const editTask = (e) => {
        e.preventDefault();
        dispatch(setId(task.id));

        document.getElementById("editTask").showModal();
    };

    const markComplete = (e) => {
        e.preventDefault();
        dispatch(
            completeTask({
                taskId: task.id,
                accessToken: user.accessToken,
                completed: true,
            })
        );
    };

    const markIncompleted = (e) => {
        e.preventDefault();
        dispatch(
            completeTask({
                taskId: task.id,
                accessToken: user.accessToken,
                completed: false,
            })
        );
    };
    return (
        <tr>
            <th>{`${task.title}`}</th>
            <td>{`${task.description}`}</td>
            <td>{`${task.due_date}`}</td>
            <td>{task.completed ? "Yes" : "No"}</td>
            <td className="flex flex-row">
                <FaRegEdit
                    onClick={editTask}
                    size={18}
                    className="ml-4 cursor-pointer"
                />{" "}
                {!task.completed ? (
                    <IoMdCheckmark
                        onClick={markComplete}
                        size={18}
                        className="ml-4 cursor-pointer"
                    />
                ) : (
                    <FaXmark
                        onClick={markIncompleted}
                        size={18}
                        className="ml-4 cursor-pointer"
                    />
                )}{" "}
                <MdDelete
                    onClick={removeTask}
                    size={18}
                    className="ml-4 cursor-pointer"
                />
            </td>
        </tr>
    );
};

export default Row;
