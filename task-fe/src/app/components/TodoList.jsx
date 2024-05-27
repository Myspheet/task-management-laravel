"use client";

import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "next-client-cookies";
import { selectAllTasks, getTasks } from "../store/taskSlice";
import { useEffect } from "react";
import Row from "./Row";
import { userDetails } from "../constatns";

const TodoList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);

    const cookies = useCookies();
    const user = JSON.parse(cookies.get(userDetails) ?? "{}");

    const fetchTaskStatus = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    useEffect(() => {
        if (fetchTaskStatus === "idle") {
            dispatch(getTasks(user.accessToken));
        }
    }, [fetchTaskStatus]);

    if (fetchTaskStatus === "loading") {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (!tasks.length) {
        return "";
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-lg">
                {/* head */}
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <Row key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
