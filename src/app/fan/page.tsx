"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FanPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the fan explore page
    router.replace("/fan/explore");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-white text-lg">Redirecting to explore...</div>
      </div>
    </div>
  );
} 