import Link from "next/link"
import Image from "next/image"

const BoxesComp = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left Box */}
        <div className="relative h-[600px] overflow-hidden ">
          <Image
            src="/Asset/left3.jpg"
            alt="White leather bag with flowers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-start p-8">
            <div className="bg-white p-8 max-w-[300px] ">
              <p className="text-gray-600 text-lg mb-2">Feel the summer</p>
              <h2 className="text-3xl font-bold mb-4">New Bag 1913</h2>
              <Link href="/shop" className="inline-block text-black hover:text-gray-700 underline underline-offset-4">
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Right Box */}
        <div className="relative h-[600px] overflow-hidden ">
          <Image
            src="/Asset/right.jpg"
            alt="Hands holding leather accessory"
            fill
            className="object-cover object-right"
          />
          <div className="absolute inset-0 flex items-center justify-start p-8">
            <div className="bg-white p-8 max-w-[300px] ">
              <p className="text-gray-600 text-lg mb-2">Feel the summer</p>
              <h2 className="text-3xl font-bold mb-4">New Collection</h2>
              <Link
                href="/collection"
                className="inline-block text-black hover:text-gray-700 underline underline-offset-4"
              >
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

