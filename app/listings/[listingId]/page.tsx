import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import Container from "@/app/components/Container";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState />
        )
    }

  return (
    <Container>
      <div className="pb-20 pt-28">
        <ListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
          locationValue={listing.locationValue}
        />
      </div>
    </Container>
  );
}

export default ListingPage;