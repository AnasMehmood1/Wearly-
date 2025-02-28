'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token)
        console.log(decodedToken)
        if (decodedToken.role === "admin") {
            router.push("/admin")
            setLoading(false)
           console.log("this is admin")
        }

      } catch (error) {
        console.error("Error parsing token:", error)
        
      }
    }
    else{
        router.push("/")
        console.log("token not found")
    }
  }, [router])

  if (loading) return <p>Checking permissions...</p>;

  return <>{children}</>;
};

export default AdminLayout;
