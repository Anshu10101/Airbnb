import { cache } from "react";
import { getCompatibleSession } from "./auth-utils";

/**
 * Get server session with proper Next.js 15 dynamic API handling
 * This function uses our custom getCompatibleSession instead of NextAuth's getServerSession
 * to ensure proper async handling of dynamic APIs
 */
export const getServerSession = cache(async () => {
  try {
    // Use our custom session handler that properly awaits dynamic APIs
    // This avoids the "headers() should be awaited" and "cookies() should be awaited" errors
    const session = await getCompatibleSession();
    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}); 