import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

/**
 * POST handler for creating a new listing
 * Updated with proper error handling for Next.js 15
 */
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    // Validate required fields
    const missingFields = Object.entries(body).filter(([_, value]) => !value);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: "Missing required fields", 
          fields: missingFields.map(([key]) => key)
        },
        { status: 400 }
      );
    }

    // Create the listing with validated data
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error in POST listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
