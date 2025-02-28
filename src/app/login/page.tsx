"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensures cookies are sent and received
            });

            const data = await response.json();

            if (response.ok) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.user?.role === "admin" ? "admin" : "user");
                }

                router.push(data.user?.role === "admin" ? "/admin" : "/");
            } else {
                alert(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong, please try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Login Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16 flex flex-col">
                <div className="flex-1">
                    {/* Logo */}
                    <Link href="/" className="inline-block mb-12">
                        <h1 className="text-xl font-bold">Wearly</h1>
                    </Link>

                    {/* Login Form */}
                    <div className="max-w-sm mx-auto w-full">
                        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                        <p className="text-gray-600 mb-8">Sign in to your Wearly account</p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-3 py-2 border rounded-md"
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                Log in
                            </Button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center mt-8">
                            <p className="text-gray-600">
                                Dont have an account?{" "}
                                <Link href="/sign-up" className="text-black hover:underline font-medium">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block w-1/2 relative">
                <div className="absolute inset-0">
                    <Image
                        src="/Asset/login1.jpg"
                        alt="Shopping experience"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-20 left-12 right-12 text-white">
                    <p className="text-2xl font-light leading-relaxed mb-4">
                        Wearly offers an incredible shopping experience with a wide range of products. Discover the latest trends
                        and enjoy seamless online shopping with us.
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
    );
};

export default LoginPage;
