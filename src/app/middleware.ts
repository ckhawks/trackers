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

import { NextRequest } from "next/server";
import { updateSession } from "../auth/lib";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
