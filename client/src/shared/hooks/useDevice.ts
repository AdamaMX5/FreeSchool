import { useEffect, useState } from "react";

export type Device = "mobile" | "desktop";

const MOBILE_QUERY = "(max-width: 768px)";

function detect(): Device {
  if (typeof window === "undefined") return "desktop";
  const byWidth = window.matchMedia(MOBILE_QUERY).matches;
  const byUa = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return byWidth || byUa ? "mobile" : "desktop";
}

/** Picks the mobile vs. desktop UI tree; re-evaluates on resize/orientation change. */
export function useDevice(): Device {
  const [device, setDevice] = useState<Device>(detect);
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setDevice(detect());
    mql.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);
  return device;
}
