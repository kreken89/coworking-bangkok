import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState
                title="You are not logged in"
                subtitle="Please login to view your trips"
            />
        
        )
    }

    const reservations = await getReservations({ 
        userId: currentUser.id 
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="You have no trips"
                subtitle="You haven't reserved an office yet"
            />
        )
    }

    return (
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage;