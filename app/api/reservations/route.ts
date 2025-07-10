import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

/**
 * POST handler for creating a new reservation
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

    const { listingId, startDate, endDate, totalPrice } = body;

    // Validate required fields
    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          required: ["listingId", "startDate", "endDate", "totalPrice"] 
        },
        { status: 400 }
      );
    }

    // Create the reservation with validated data
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.error("Error in POST reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
