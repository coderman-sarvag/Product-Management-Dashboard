"use client";

import { useEffect, useState } from "react";

const slides = [
  { id: 0, image: "/ssr.png" },
  { id: 1, image: "/auth.png" },
  { id: 2, image: "/crud.png" },
];

export default function BackgroundSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  function position(index) {
    if (index === active)
      return "opacity-70 translate-x-0 scale-100";
    if (index === (active + 1) % 3)
      return "opacity-0 translate-x-64 scale-95";
    return "opacity-0 -translate-x-64 scale-95";
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute
              w-140 h-80
              bg-slate-900/95
              border border-indigo-500/30
              rounded-2xl
              shadow-2xl shadow-indigo-500/20
              transition-all duration-1000 ease-in-out
              ${position(index)}
            `}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-contain p-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
