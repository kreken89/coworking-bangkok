import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ArraySlicer from "./components/ArraySlicer";
import CoffeeBanner from "./components/CoffeeBanner";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import HomeBackground from "./components/HomeBackground";
import SmallHero from "./components/SmallHero";
import TukTukBanner from "./components/TukTuk";

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
        <div className="">
          <ArraySlicer
            listings={listings.slice(0, 4)}
            currentUser={currentUser}
          />
        </div>
      </Container>

      <TukTukBanner />

      <Container>
        <div className="">
          <ArraySlicer
            listings={listings.slice(4, 8)}
            currentUser={currentUser}
          />
        </div>
      </Container>

      <CoffeeBanner />

      <Container>
        <div className="py-6 md:pb-4 ">
          <ArraySlicer
            listings={listings.slice(8, 12)}
            currentUser={currentUser}
          />
        </div>
      </Container>
      <Container>
        <div className="py-6 md:pb-4">
          <ArraySlicer
            listings={listings.slice(12, 16)}
            currentUser={currentUser}
          />
        </div>
      </Container>
    </>
  );
}

export default Home;

