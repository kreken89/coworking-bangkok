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
            listings={listings.slice(0, 3)}
            currentUser={currentUser}
          />
        </div>
      </Container>

      <TukTukBanner />

      <Container>
        <div className="">
          <ArraySlicer
            listings={listings.slice(3, 6)}
            currentUser={currentUser}
          />
        </div>
      </Container>

      <CoffeeBanner />

      <Container>
        <div className="pt-8  ">
          <ArraySlicer
            listings={listings.slice(6, 9)}
            currentUser={currentUser}
          />
        </div>
      </Container>
      <Container>
        <div className="pt-8 ">
          <ArraySlicer
            listings={listings.slice(9, 12)}
            currentUser={currentUser}
          />
        </div>
      </Container>
    </>
  );
}

export default Home;

