"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VPRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/vp/hub");
  }, [router]);
  return null;
}
