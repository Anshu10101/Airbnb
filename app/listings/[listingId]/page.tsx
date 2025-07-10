import { getCurrentUser } from "@/app/lib/auth";
import getListingById from "@/app/actions/getListingById";
import getReservation from "@/app/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";

interface IParams {
  listingId?: string;
}

/**
 * ListingPage component with proper Next.js 15 dynamic params handling
 * In Next.js 15, params must be awaited before accessing their properties
 */
export default async function ListingPage({ 
  params: paramsPromise 
}: { 
  params: Promise<IParams> 
}) {
  try {
    // Properly await params before accessing any properties
    // This fixes the "params should be awaited before using its properties" error
    const params = await paramsPromise;
    
    // Validate params after awaiting
    if (!params?.listingId) {
      return (
        <ClientOnly>
          <EmptyState 
            title="Missing Listing"
            subtitle="Please check the URL and try again"
          />
        </ClientOnly>
      );
    }

    // Store the listingId in a constant after awaiting params
    // This prevents multiple accesses to the async params object
    const listingId = params.listingId;

    // Fetch data in parallel for better performance
    // Using the stored listingId instead of accessing params.listingId multiple times
    const [listing, reservations, currentUser] = await Promise.all([
      getListingById({ listingId }),
      getReservation({ listingId }),
      getCurrentUser()
    ]);

    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <ListingClient
          listing={listing}
          currentUser={currentUser}
          reservations={reservations}
        />
      </ClientOnly>
    );
  } catch (error) {
    console.error("Error in ListingPage:", error);
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
