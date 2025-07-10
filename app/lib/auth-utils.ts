import { cookies, headers } from "next/headers";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { JWT } from "next-auth/jwt";
import { decode, encode } from "next-auth/jwt";

interface DecodedToken {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  exp?: number;
  iat?: number;
  jti?: string;
}

/**
 * Custom session handler for Next.js 15 compatibility
 * This function properly awaits dynamic APIs before NextAuth uses them internally
 */
export async function getCompatibleSession() {
  try {
    // 1. Explicitly await cookies and headers
    const cookieStore = await cookies();
    const headersList = await headers();
    
    // 2. Get the session token from cookies manually
    const sessionToken = cookieStore.get("next-auth.session-token")?.value || 
                         cookieStore.get("__Secure-next-auth.session-token")?.value;
    
    if (!sessionToken) {
      return null;
    }
    
    // 3. Decode the JWT token manually
    try {
      const decoded = await decode({
        token: sessionToken,
        secret: process.env.NEXTAUTH_SECRET || "",
      }) as DecodedToken;
      
      if (!decoded) {
        return null;
      }
      
      // 4. Construct a session object from the decoded token
      return {
        user: {
          name: decoded.name,
          email: decoded.email,
          image: decoded.picture,
          id: decoded.sub,
        },
        expires: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null,
      };
    } catch (error) {
      console.error("Error decoding session token:", error);
      return null;
    }
  } catch (error) {
    console.error("Error in getCompatibleSession:", error);
    return null;
  }
} 