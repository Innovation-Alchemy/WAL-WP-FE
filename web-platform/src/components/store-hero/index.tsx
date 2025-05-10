import Image from 'next/image';

const StoreHero = () => {
  return (
    <div className="relative bg-hero text-secondary md:h-[450px]">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between py-32 md:py-12 lg:px-16 px-4">
        <div className="lg:w-1/2">
          <h1 className="lg:text-5xl text-3xl font-extrabold lg:w-1/2">
            YOU ARE THE EVENT
          </h1>
          <p className="text-md lg:text-xl lg:w-1/2">
            Find the perfect shirt for your greatest night of your life
          </p>
        </div>

        <div className="lg:w-1/2 justify-center mt-8 md:mt-32 lg:mt-12 hidden md:block">
          <div className="relative md:w-[274px] md:h-[274px] lg:w-[354px] lg:h-[354px] overflow-hidden">
            <Image
              src="/images/store.png"
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg rounded-b-none"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHero;
