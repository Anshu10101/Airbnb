import prisma from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    // Safely access params
    const listingId = params?.listingId;

    if (!listingId) {
      return null;
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    console.error("Error in getListingById:", error);
    return null;
  }
}
