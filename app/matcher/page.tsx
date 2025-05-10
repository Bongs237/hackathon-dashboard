"use client";

import MatchingUI from "@/components/matcher/MatchingUI";
import Navbar from "@/components/matcher/Navbar";
import { useMatcherAccessControl } from "@/hooks/useMatcherAccessControl";
import uiConfig from "@/lib/ui-config";
import { useEffect, useState } from "react";
import { Profile } from "@/app/types/profile";

export default function Matcher() {
  const { canAccess, isLoading } = useMatcherAccessControl();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    fetch("/api/matcher/get_profiles")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        console.log(data);
      });
  }, []);

  if (isLoading) {
    return null;
  }

  if (!canAccess) {
    return null;
  }

  return (
    <div className="flex flex-col" style={{ fontFamily: uiConfig.typography.fontFamily.base }}>
      <Navbar />
      <main className="flex flex-col items-center p-2 gap-3 overflow-x-hidden">
        <h1 className="text-2xl font-bold">DAHacks <span className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 text-transparent bg-clip-text">Matchathon</span></h1>
        <p className="text-[14px] md:text-base text-gray-500 dark:text-gray-400">Swipe right to match, swipe left to pass.</p>
        <div className="w-full max-w-md">
          <MatchingUI profiles={profiles} />
        </div>
      </main>
    </div>
  );
}
