"use client";

import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import DownloadTasksBtn from "./components/DownloadTasksBtn";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./store/taskSlice";
import Authenticated from "./components/Authenticated";
import EditTask from "./components/EditTask";
import { useCookies } from "next-client-cookies";
import { userDetails } from "./constatns";
import axios from "axios";
import { config } from "./helper/config";

export default function Home() {
    const tasks = useSelector(selectAllTasks) ?? [];
    const router = useRouter();
    const cookies = useCookies();

    const logout = async () => {
        const userToken = JSON.parse(cookies.get(userDetails)).accessToken;
        try {
            await axios.get(`${config.baseUrl}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            cookies.remove(userDetails);
            router.push("login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Authenticated>
            <main className="max-w-6xl mx-auto mt-4">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold flex justify-between">
                        {" "}
                        Task Management App{" "}
                        <span className="flex-end">
                            <button
                                onClick={() => logout()}
                                className="btn btn-primary"
                            >
                                Logout
                            </button>
                        </span>
                    </h1>
                    <AddTask />
                    {tasks.length ? <DownloadTasksBtn /> : ""}
                </div>
                <TodoList />
                <EditTask />
            </main>
        </Authenticated>
    );
}
