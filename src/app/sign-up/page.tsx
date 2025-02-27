'use client'
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight,} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
const SignUp = () => {
    const router = useRouter()

     const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      
     })
     

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/users/signup", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            // console.log(data)
            alert("Sign up successful")
            router.push("/login")
        } catch (error) {
            console.log(error)  
            alert("Error signing up")
            
        }

    }
   

  
   const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
   }
  

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16 flex flex-col">
        <div className="flex-1">
          <Link href="/" className="inline-block mb-12">
            <h1 className="text-xl font-bold">Wearly</h1>
          </Link>

          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-gray-600 mb-8">Join Wearly and start shopping today</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full px-3 py-2 border rounded-md}`}
                    name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className={`w-full px-3 py-2 border rounded-md`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className={`w-full px-3 py-2 border rounded-md `}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

             
            </form>
            <Button  onClick={handleSubmit} className="w-full bg-black text-white hover:bg-gray-800 mt-7">
            Sign Up 
         </Button>
         <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-black hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
          </div>
         

        </div>
        

        
      </div>

      {/* Right side with placeholder image */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src="/Asset/login1.jpg"
            alt="VistaMart shopping experience"
          //  layout="fill" 
            width={1080}
            height={1080}
            
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-20 left-12 right-12 text-white">
          <p className="text-2xl font-light leading-relaxed mb-4">
            Join Wearly today and unlock a world of amazing products and deals. Start your journey with us and
            experience shopping like never before.
          </p>
          <div className="space-y-2">
            <p className="font-medium">AnasMehmood</p>
            <p className="text-white/80">Head of Customer Experience at Wearly</p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-12 flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-10 right-12 flex items-center space-x-4">
          <button className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp