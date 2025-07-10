"use server";

import { cache } from "react";
import { cookies, headers } from "next/headers";
import prisma from "@/lib/prismadb";
import { decode } from "next-auth/jwt";

interface DecodedToken {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  exp?: number;
  iat?: number;
  jti?: string;
}

interface SafeUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
}

/**
 * Get session token from cookies with proper Next.js 15 async handling
 */
export const getSessionToken = cache(async () => {
  try {
    // Explicitly await cookies before accessing
    const cookieStore = await cookies();
    
    // Get session token from cookies
    return cookieStore.get("next-auth.session-token")?.value || 
           cookieStore.get("__Secure-next-auth.session-token")?.value || null;
  } catch (error) {
    console.error("Error getting session token:", error);
    return null;
  }
});

/**
 * Decode session token with proper Next.js 15 async handling
 */
export const decodeToken = cache(async (token: string | null) => {
  if (!token) return null;
  
  try {
    // Decode token
    return await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET || "",
    }) as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
});

/**
 * Get session with proper Next.js 15 async handling
 */
export const getSession = cache(async () => {
  try {
    // Explicitly await dynamic APIs
    await headers();
    const token = await getSessionToken();
    const decoded = await decodeToken(token);
    
    if (!decoded) {
      return null;
    }
    
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
    console.error("Error in getSession:", error);
    return null;
  }
});

/**
 * Get current user with proper Next.js 15 async handling
 */
export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}); 