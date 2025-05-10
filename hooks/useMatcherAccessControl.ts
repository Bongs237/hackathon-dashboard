import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export function useMatcherAccessControl() {
  const [canAccess, setCanAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/db/get')
      .then(res => res.json())
      .then(data => {
        if (data.application && (data.application.status === "accepted" || data.application.status === "confirmed")) {
          setCanAccess(true);
        } else {
          redirect("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { canAccess, isLoading };
} 