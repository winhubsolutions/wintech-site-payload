"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { DashedLine } from "@/components/dashed-line";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Website Design & Development",
    description:
      "Modern, responsive, and SEO-friendly websites tailored to your business goals.",
    features: ["Custom UI", "Responsive Design", "SEO Ready"],
    image: "/services/web-development.jpg",
    link: "/services/web-development",
  },
  {
    title: "UI / UX Design",
    description:
      "User-centered designs that improve engagement, usability, and conversions.",
    features: ["Wireframes", "Prototypes", "Design Systems"],
    image: "/services/ui-ux.jpg",
    link: "/services/ui-ux-design",
  },
  {
    title: "Web App Development",
    description:
      "Scalable, high-performance web applications using modern frameworks.",
    features: ["React", "Next.js", "APIs"],
    image: "/services/web-app.jpg",
    link: "/services/web-app-development",
  },
  {
    title: "Mobile App Development",
    description:
      "Robust Android & iOS apps designed for speed, security, and growth.",
    features: ["Android", "iOS", "Cross-Platform"],
    image: "/services/mobile-app.jpg",
    link: "/services/mobile-development",
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to grow traffic, leads, and sales.",
    features: ["SEO", "Google Ads", "Social Media"],
    image: "/services/digital-marketing.jpg",
    link: "/services/digital-marketing",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailor-made software solutions aligned perfectly with your business needs.",
    features: ["CRM", "ERP", "Automation"],
    image: "/services/custom-software.jpg",
    link: "/services/custom-software",
  },
];

export const ServicesSlider = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              We design, build, and scale digital products that help businesses
              grow faster and smarter.
            </p>
            <Button variant="outline" className="shadow-md">
              View All Services <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* Slider */}
          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((service, index) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        {/* Image */}
                        <div className="relative h-[260px] lg:h-[300px]">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                          <div className="space-y-3">
                            <h3 className="text-xl font-semibold">
                              {service.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {service.description}
                            </p>

                            <ul className="text-sm text-muted-foreground space-y-1">
                              {service.features.map((feature, i) => (
                                <li key={i}>• {feature}</li>
                              ))}
                            </ul>
                          </div>

                          <Button
                            asChild
                            variant="secondary"
                            className="w-fit"
                          >
                            <a href={service.link}>
                              Learn More <ArrowRight className="ml-1 size-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Controls */}
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
