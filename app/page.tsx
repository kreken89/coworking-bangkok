import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import HomeBackground from "./components/HomeBackground";
import SmallHero from "./components/SmallHero";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams}: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <>
      <HomeBackground />
      <SmallHero />
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            max-w-2xl
            mx-auto
            gap-8
      
      ">
          {/* lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 */}
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Home;
