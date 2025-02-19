import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <>
      {/* write a hero section here   in center  with heading and paragraph     */}
      <div className="flex flex-col items-center justify-center py-6  pb-4">
        <h1 className="text-5xl font-bold">Fashion E-verse Hub</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>

      <section
      className="relative mx-auto w-[90%] h-[60vh] bg-center bg-cover mb-10"
      style={{ backgroundImage: "url('/Asset/hero.webp')" }}
    >
      {/* Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>

      {/* Text container positioned at bottom left */}
      <div className="absolute bottom-4 left-4 z-10 text-left text-black">
        <p className="text-lg ">Summer Fashion</p>
        <h1 className=" text-4xl font-bold">
         Conscious Choices
        </h1>
      </div>
    </section>
       
       {/* left side is image  and write side with gray color same size  with text center  */}
       <div className="flex w-[90%] mx-auto h-[25vh] gap-0 p-0 m-0 mb-5">
      {/* Left Column (Image) */}
      <div className="relative w-1/2 h-full p-0 m-0">
        <Image
          src="/Asset/card1.jpg"
          alt="hero"
          fill
          style={{ objectFit: "cover" }}
          // Or use className="object-cover" if you prefer Tailwind classes
        />
      </div>

      {/* Right Column (Text) */}
      <div className="w-1/2 h-full bg-gray-100 flex flex-col items-center justify-center p-0 m-0">
        <h1 className="text-2xl font-bold m-0">Summer Collection</h1>
        <p className="text-sm m-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>
    </div>



    


    </>
  );
};

export default Hero;
