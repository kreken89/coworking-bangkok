const TukTukBanner = () => {

  return (
    <div className="flex flex-col md:flex-row justify-center mx-auto px-8 sm:px-10 lg:px-40 py-10">
      <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-10">
        <h2 className="text-3xl sm:text-5xl md:text-fortyeight lg:text-sixty font-bold">
          Not sure how long you will stay? We always have
          <span className="text-turquoise"> flexible booking </span>
          and
          <span className="text-turquoise"> free cancellation!</span>
        </h2>
      </div>

      {/* Right side with picture */}
      <div
        className="w-full "
        style={{
          backgroundImage: `url(/images/tuktuk.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center', 
          height: 'auto', 
          aspectRatio: '16 / 9', 
          backgroundRepeat: 'no-repeat',
        }}></div>
    </div>
  );
};
export default TukTukBanner;
