
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const check = window.localStorage.getItem('tk');
            if (!check) {
                router.push('/login');
            } else {
                setIsAuthenticated(true);
            }

        }, []);

        if (!isAuthenticated) {  // chưa đăng nhập
            return null;
        }

        // login rồi cho qua
        return <Component {...props} />

    }
}
