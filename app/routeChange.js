"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeTracker() {
  const pathname = usePathname();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log(pathname);
    setHistory((previous) => {
      const newHistory = {
        ...previous,
        [pathname]: (previous[pathname] || 0) + 1,
      };
      console.log("Route changed to:", pathname);
      return newHistory;
    });
  }, [pathname]);

  useEffect(() => {
    console.log("History:", history);
  }, [history]);

  return null;
}
