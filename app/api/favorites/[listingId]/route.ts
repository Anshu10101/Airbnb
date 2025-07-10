import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IPrisma {
  listingId?: string;
}

/**
 * POST handler to add a listing to favorites
 * In Next.js 15, params must be awaited before accessing their properties
 */
export async function POST(
  request: Request, 
  { params: paramsPromise }: { params: Promise<IPrisma> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    // Await params before destructuring - Next.js 15 requirement
    const params = await paramsPromise;
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in POST favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to remove a listing from favorites
 * In Next.js 15, params must be awaited before accessing their properties
 */
export async function DELETE(
  request: Request,
  { params: paramsPromise }: { params: Promise<IPrisma> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    // Await params before destructuring - Next.js 15 requirement
    const params = await paramsPromise;
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in DELETE favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
