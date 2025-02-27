import Link from "next/link"
import Image from "next/image"

const BoxesComp = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Left Box */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden ">
          <Image
            src={"/Asset/left3.jpg"}
            alt="White leather bag with flowers"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-6 md:p-8">
            <div className="bg-white/90 p-4 sm:p-6 md:p-8 max-w-[250px] sm:max-w-[300px] ">
              <p className="text-gray-600 text-base sm:text-lg mb-2">Feel the summer</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">New Bag 1913</h2>
              <Link href="/women" className="inline-block text-black hover:text-gray-700 underline underline-offset-4">
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Right Box */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden ">
          <Image
            src="/Asset/right.jpg"
            alt="Hands holding leather accessory"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-6 md:p-8">
            <div className="bg-white/90 p-4 sm:p-6 md:p-8 max-w-[250px] sm:max-w-[300px] ">
              <p className="text-gray-600 text-base sm:text-lg mb-2">Feel the summer</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">New Collection</h2>
              <Link href="/women" className="inline-block text-black hover:text-gray-700 underline underline-offset-4">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxesComp

