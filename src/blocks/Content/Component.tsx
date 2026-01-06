import React from "react";
import { cn } from "@/utilities/ui";
import RichText from "@/components/RichText";
import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { DashedLine } from "@/components/dashed-line";

const normalizeAppearance = (
  appearance?: "default" | "outline" | null
): "inline" | "default" | "outline" =>
  appearance === "default" || appearance === "outline"
    ? appearance
    : "inline";

export const ContentBlock: React.FC<ContentBlockProps> = ({ columns }) => {
  const colsSpanClasses = {
    full: "12",
    half: "6",
    oneThird: "4",
    twoThirds: "8",
  } as const;

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns?.map((col, index) => {
          const { enableLink, link, richText, size } = col;

          const isHalf = size === "half";
          const nextIsHalf = columns[index + 1]?.size === "half";
          const showDivider = isHalf && nextIsHalf;

          return (
            <div
              key={index}
              className={cn(
                `relative col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                { "md:col-span-2": size !== "full" }
              )}
            >
              {/* DIVIDERS */}
              {showDivider && (
                <>
                  <DashedLine
                    orientation="vertical"
                    className="absolute top-0 right-[-2rem] h-full max-lg:hidden"
                  />
                  <DashedLine
                    orientation="horizontal"
                    className="absolute bottom-[-2rem] left-0 w-full lg:hidden"
                  />
                </>
              )}

              {/* CONTENT */}
              {richText && (
                <RichText data={richText} enableGutter={false} />
              )}

              {/* LINK */}
              {enableLink && link && (
                <CMSLink
                  {...link}
                  appearance={normalizeAppearance(link.appearance)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
