import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Wearly</h2>
            <p className="mb-4">Your one-stop shop for fashion, beauty, and lifestyle products.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-800">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-800">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-800">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-gray-800">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Women
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Men
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-800">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Enter your email" className="bg-white" />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 Wearly. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-gray-800">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-800">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

