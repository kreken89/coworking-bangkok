import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="You're not logged in"
                subtitle="Log in to see your reservations"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <EmptyState 
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties"
            />
        )
    }

    return (
        <div className='pb-20 pt-28'>
            <ReservationsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    )
};

export default ReservationsPage;
