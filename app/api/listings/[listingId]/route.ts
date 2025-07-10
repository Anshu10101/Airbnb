import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

/**
 * DELETE handler for removing a listing
 * In Next.js 15, params must be awaited before accessing their properties
 */
export async function DELETE(
  request: Request,
  { params: paramsPromise }: { params: Promise<IParams> }
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

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error in DELETE listing:", error);
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
