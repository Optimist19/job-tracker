// import { NextResponse, NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   // Get the session token from cookies
//   const sessionToken = req.cookies.get("authjs.session-token")?.value;
  
//   // List of protected routes
//   const protectedRoutes = ["/all-jobs", "/stats"];

//   // Check if the current route is protected and if there is no session token
//   const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

//   // If the route is protected and there's no session token, redirect to home page
//   if (isProtectedRoute && !sessionToken) {
//     const homeUrl = new URL("/", req.url);
//     return NextResponse.redirect(homeUrl);
//   }

//   // Allow request to continue if session token exists or the route is not protected
//   return NextResponse.next();
// }

// // Apply middleware only to protected routes
// export const config = {
//   matcher: ["/all-jobs", "/stats"], // Match only protected routes
// };
