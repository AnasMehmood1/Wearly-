'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({ children } :any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || user.role !== "admin") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Checking permissions...</p>;

  return <>{children}</>;
};

export default AdminLayout;
