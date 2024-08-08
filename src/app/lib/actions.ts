"use server";

import signIn from "@/auth/signIn";
import { cookies } from "next/headers";

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error) {
      return "Something wrong!";
      // switch (error.type) {
      //   case "CredentialsSignin":
      //     return "Invalid credentials.";
      //   default:
      //     return "Something went wrong.";
      // }
    }
    throw error;
  }
}

export async function handleLogin(sessionData) {
  const encryptedSessionData = encrypt(sessionData); // Encrypt your session data
  cookies().set("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  // Redirect or handle the response after setting the cookie
}
