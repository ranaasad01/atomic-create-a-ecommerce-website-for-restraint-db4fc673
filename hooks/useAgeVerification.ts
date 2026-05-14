"use client";
import { useState, useEffect } from "react";

export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("velvet_age_verified");
    setIsVerified(stored === "true");
  }, []);

  const verify = () => {
    localStorage.setItem("velvet_age_verified", "true");
    setIsVerified(true);
  };

  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return { isVerified, verify, deny };
}
