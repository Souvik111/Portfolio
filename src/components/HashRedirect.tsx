"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (window.location.hash === "#playground") router.replace("/playground");
  }, [router]);
  return null;
}