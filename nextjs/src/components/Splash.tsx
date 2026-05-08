"use client";

import { useEffect, useState } from "react";

const REDUCED_DURATION = 480;
const FULL_DURATION = 1600;

export default function Splash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const duration = reduced ? REDUCED_DURATION : FULL_DURATION;

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      setVisible(false);
      html.style.overflow = prevOverflow;
    }, duration);

    return () => {
      window.clearTimeout(t);
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="splash" aria-hidden="true" role="presentation">
      <svg
        className="splash__icon"
        viewBox="0 0 209 196"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="splash__path"
          pathLength="1"
          d="M208.317 0C205.229 13.925 201.704 27.7666 197.553 41.4202C193.673 54.1762 189.835 67.0782 183.66 78.9573C181.219 83.6338 178.341 88.2267 174.106 91.3583C170.706 93.8845 166.283 95.3667 162.09 94.2185C157.856 93.0702 154.643 89.5838 152.349 85.8468C139.958 65.7003 133.762 42.5893 122.352 21.9627C118.993 15.9084 113.82 8.32997 106.498 7.34875C91.7495 5.36542 84.1146 24.0922 79.2959 34.8857C71.5567 52.2555 65.841 70.5021 58.4564 88.018C51.6351 104.198 44.1671 120.127 36.0525 135.68C26.2064 154.574 15.3799 172.946 3.42699 190.587C2.46742 192.007 1.48698 193.406 0.52741 194.825C-2.74766 199.69 9.97712 184.47 18.0918 173.677C55.9532 123.3 79.5462 65.8882 92.8342 45.4078C94.6282 42.652 96.5056 39.8962 99.0297 37.7876C113.507 25.7415 122.873 52.5269 127.024 62.026C133.7 77.2871 139.353 93.2999 149.574 106.661C152.828 110.92 156.875 115.054 162.111 116.098C167.764 117.225 173.626 114.365 177.61 110.169C188.687 98.4774 193.005 79.2705 196.99 64.218C200.286 51.7544 202.789 39.1029 204.812 26.3678C205.772 20.3343 207.649 3.79963 208.317 0.0208736V0Z"
        />
      </svg>
    </div>
  );
}
