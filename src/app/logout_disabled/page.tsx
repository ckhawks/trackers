// "use server";

// export default async function LogoutPage() {
//     // const router = useRouter();

//     // await logout();
//     // redirect("/");

//     // return (
//     //     router.push("/")
//     // );

//     return (<>not working</>);
// }


"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Clear the cookie by setting it to an expired date
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    // cookies().set("session", "")

    // Optionally, redirect to the login page or home after logout
    router.push('/login');
  }, [router]);

  return null; // Since this page doesn't need to render anything
}