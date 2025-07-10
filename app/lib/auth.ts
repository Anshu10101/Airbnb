import { cache } from "react";
import { getServerSession } from "./session";
import prisma from "@/lib/prismadb";

/**
 * Get session with proper Next.js 15 async handling
 * This function properly awaits the session from our custom getServerSession function
 */
export const getSession = cache(async () => {
  try {
    // Use our custom session handler via getServerSession
    // This ensures all dynamic APIs are properly awaited
    const session = await getServerSession();
    return session;
  } catch (error) {
    console.error("Error in getSession:", error);
    return null;
  }
});

/**
 * Get current user with proper Next.js 15 async handling and error handling
 * This function is cached to prevent multiple database calls
 */
export const getCurrentUser = cache(async () => {
  try {
    // Get session using our custom handler
    const session = await getSession();

    // Early return if no session or email
    if (!session?.user?.email) {
      return null;
    }

    // Find the user in the database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // Early return if no user found
    if (!currentUser) {
      return null;
    }

    // Return the user with properly formatted dates
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