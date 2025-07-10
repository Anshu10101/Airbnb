import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservation(params: IParams) {
  try {
    // Safely access params
    const query: any = {};

    if (params?.listingId) {
      query.listingId = params.listingId;
    }

    if (params?.userId) {
      query.userId = params.userId;
    }

    if (params?.authorId) {
      query.listing = { userId: params.authorId };
    }

    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservation.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    console.error("Error in getReservation:", error);
    return [];
  }
}
