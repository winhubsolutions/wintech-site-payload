import React from "react";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
  videoSrc?: string; // <-- mp4 path
};

export const Background = ({
  children,
  variant = "top",
  className,
   videoSrc,
}: BackgroundProps) => {
  return (
    <div
      className={cn(
        "relative",
        variant === "top" &&
          "from-primary/50 via-background to-background/80  bg-linear-to-b via-20%",
        variant === "bottom" &&
          "from-background via-background to-primary/50  bg-linear-to-b",
        className,
      )}
    >
       {/* 🎥 Background Video */}
      {videoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 🔥 Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 🌟 Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};