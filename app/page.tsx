import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ArraySlicer from "./components/ArraySlicer";
import CoffeeBanner from "./components/CoffeeBanner";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import HomeBackground from "./components/HomeBackground";
import SmallHero from "./components/SmallHero";
import TukTukBanner from "./components/TukTuk";
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
        {/* <div
            className="
            pt-2
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            max-w-4xl
            mx-auto
            gap-8
            
            ">
            {listings.map((listing) => {
              return (
                <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
                />
                );
              })}
          </div> */}
        <div className="py-6 md:pt-20 md:pb-4 ">
          <ArraySlicer
            listings={listings.slice(0, 3)}
            currentUser={currentUser}
          />
        </div>
      </Container>

      <TukTukBanner />

      <Container>
        <div className="py-6 md:pt-20 md:pb-4">
          <ArraySlicer
            listings={listings.slice(3, 6)}
            currentUser={currentUser}
          />
        </div>
      </Container>

      <CoffeeBanner />

      <Container>
        <div className="py-6 md:pt-20 md:pb-4">
          <ArraySlicer
            listings={listings.slice(6, 9)}
            currentUser={currentUser}
          />
        </div>
      </Container>
    </>
  );
}

export default Home;
