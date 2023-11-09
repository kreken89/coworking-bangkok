import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState
                title="You are not logged in"
                subtitle="Please login to view your trips"
            />
        
        )
    }

    const listings = await getListings({ 
        userId: currentUser.id 
    });

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        )
    }

    return (
      <div className="pb-20 pt-28">
        <PropertiesClient listings={listings} currentUser={currentUser} />
      </div>
    );
}

export default PropertiesPage;