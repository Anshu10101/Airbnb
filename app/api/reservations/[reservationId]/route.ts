import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

/**
 * DELETE handler for reservation cancellation
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
    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.json(
        { error: "Invalid reservation ID" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error in DELETE reservation:", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
