// import { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get("currentUser")?.value;

//   if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
//     return Response.redirect(new URL("/dashboard", request.url));
//   }

//   if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
//     return Response.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "../auth/lib";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith("/logout")) {
  //   // Destroy the session
  //   // request.cookies.set("session", "");
  //   const response = NextResponse.next()
  //   response.cookies.set("session", "")

  //   // redirect("/login");

  //   return Response.redirect(new URL("/login", request.url));
  // }

  return await updateSession(request);
}
