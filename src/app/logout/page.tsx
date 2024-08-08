"use client";

import { logout } from "@/auth/lib";
import { useRouter } from 'next/navigation'

export default async function RegisterPage() {
    const router = useRouter();

    await logout();

    return (
        router.push("/")
    );
}
