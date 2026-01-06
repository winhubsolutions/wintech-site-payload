import React from "react";
import type { CallToActionBlock as CTABlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

const mapAppearance = (
  appearance?: "default" | "outline" | null
): "inline" | "default" | "outline" => {
  if (appearance === "default" || appearance === "outline") {
    return appearance;
  }
  return "inline";
};

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  
  // other props unchanged
}
/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
}) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && (
            <RichText
              className="mb-0"
              data={richText}
              enableGutter={false}
            />
          )}
        </div>

        <div className="flex flex-col gap-8">
          {(links ?? []).map(({ link }, i) => {
            if (!link) return null;

            return (
              <CMSLink
                key={i}
                
                {...link}
                appearance={mapAppearance(link.appearance)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
