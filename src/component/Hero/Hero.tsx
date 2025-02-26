import Image from "next/image"

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-6 pb-4 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shop the Latest Trends – Your Style, Your Way!</h1>
        <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-3xl text-center mx-auto">
          Discover your unique look and shop with confidence in our diverse collection of clothing, accessories, and
          more.
        </p>
      </div>

      <section className="relative mx-auto w-[95%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh] bg-center bg-cover mb-10">
        <Image src="/Asset/left5.jpg" alt="Summer Fashion" layout="fill" objectFit="cover" priority />
        {/* Light Black Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Overlay at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/30 to-transparent"></div>

        {/* Text container positioned at bottom left */}
        <div className="absolute bottom-4 left-4 z-10 text-left text-black">
          <p className="text-base sm:text-lg md:text-xl">Summer Fashion</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Conscious Choices</h2>
        </div>
      </section>
    </>
  )
}

export default Hero

