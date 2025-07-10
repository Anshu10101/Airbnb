import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import { getCurrentUser } from "@/app/lib/auth";
import getListings, { IListingsParams } from "./actions/getListings";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Home page component with proper Next.js 15 searchParams handling
 * In Next.js 15, searchParams must be awaited before accessing their properties
 */
export default async function Home({ searchParams }: HomeProps) {
  try {
    // Properly await searchParams before accessing any properties
    // This fixes the "searchParams should be awaited before using its properties" error
    const params = await searchParams;
    
    // Process search params safely after awaiting
    // Using type assertions and null checks for safety
    const safeSearchParams: IListingsParams = {
      userId: params?.userId as string | undefined,
      guestCount: params?.guestCount ? Number(params.guestCount) : undefined,
      roomCount: params?.roomCount ? Number(params.roomCount) : undefined,
      bathroomCount: params?.bathroomCount ? Number(params.bathroomCount) : undefined,
      startDate: params?.startDate as string | undefined,
      endDate: params?.endDate as string | undefined,
      locationValue: params?.locationValue as string | undefined,
      category: params?.category as string | undefined,
    };

    // Fetch data in parallel for better performance
    // This reduces overall loading time by running requests concurrently
    const [listings, currentUser] = await Promise.all([
      getListings(safeSearchParams),
      getCurrentUser()
    ]);

    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 overflow-x-hidden">
            {listings.map((list) => (
              <ListingCard
                key={list.id}
                data={list}
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    );
  } catch (error) {
    console.error("Error in Home page:", error);
    return (
      <ClientOnly>
        <EmptyState 
          title="Something went wrong"
          subtitle="Please try again later"
        />
      </ClientOnly>
    );
  }
}
