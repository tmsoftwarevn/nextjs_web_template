"use client";

import withAuth from "@/components/with auth/WithAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
    //const route = useRouter();

    // useEffect(() => {
    //     route.push('/admin/nganh');
    // }, [])

    return (
        <div>
            
        </div>
    );
}

export default withAuth(page);