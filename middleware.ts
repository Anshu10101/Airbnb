import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware for Next.js 15 compatible authentication
 * This avoids using the default NextAuth middleware which may use dynamic APIs incorrectly
 */
export async function middleware(request: NextRequest) {
  try {
    // Get the pathname from the URL
    const pathname = request.nextUrl.pathname;
    
    // Define protected routes
    const protectedRoutes = ["/trips", "/reservations", "/properties", "/favorites"];
    
    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // If not a protected route, allow the request
    if (!isProtectedRoute) {
      return NextResponse.next();
    }
    
    // Get the session token from cookies directly
    // This avoids using the headers() and cookies() APIs incorrectly
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // If no token is found, redirect to the login page
    if (!token) {
      const url = new URL(`/`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // Allow the request if token exists
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    // In case of error, redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/trips/:path*", "/reservations/:path*", "/properties/:path*", "/favorites/:path*"],
};
