"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import ErrorMessage from "../components/Error";
import { userDetails } from "../constatns";
import { config } from "../helper/config";
import axios from "axios";
import { setTasks } from "../store/taskSlice";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const user = useSelector((state) => state.user.user);
    const cookies = useCookies();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTasks([]));
    }, []);

    const router = useRouter();

    const fetchUserStatus = useSelector((state) => state.user.status);

    const login = async (e) => {
        e.preventDefault();
        try {
            setError("");
            const response = await axios.post(`${config.baseUrl}/auth/login`, {
                email: email,
                password: password,
            });
            if (response.data.accessToken) {
                cookies.set(userDetails, JSON.stringify(response.data));
                router.push("/");
            }
        } catch (err) {
            setError("Email or Password incorrect");
        }
    };

    if (fetchUserStatus === "loading") {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <main className="max-w-4xl mx-auto ">
            <div className="text-center my-5 flex flex-col min-h-screen justify-center gap-4">
                <h1 className="text-2xl font-bold">Login</h1>
                {error && <ErrorMessage message={error} />}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="grow"
                        placeholder="Email"
                        data-testid="email"
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="grow"
                        placeholder="Password"
                        data-testid="password"
                    />
                </label>

                <div>
                    <button
                        onClick={login}
                        data-testid="login"
                        className="btn btn-primary w-full"
                    >
                        Login
                    </button>
                </div>

                <h3>
                    Don't have an account?{" "}
                    <Link href={"register"}>Register</Link>{" "}
                </h3>
            </div>
        </main>
    );
}
