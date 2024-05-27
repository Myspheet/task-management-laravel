"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "next-client-cookies";
import { userDetails } from "../constatns";
import { setUser } from "../store/userSlice";

export default function Authenticated({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const cookies = useCookies();
    const user = JSON.parse(cookies.get(userDetails) ?? "{}");

    if (!user.accessToken) {
        router.push("login");
    }

    useEffect(() => {
        dispatch(setUser(user));
    }, []);

    return <>{children}</>;
}
