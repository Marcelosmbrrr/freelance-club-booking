import { Head } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";
import { useHomePage } from "@/context/HomePageContext";

import { cn } from "@/lib/utils";

import { Header } from "./_components/welcome/header/Header";
import { Hero } from "./_components/welcome/hero/Hero";
import { AppCarousel } from "./_components/welcome/carousel/Carousel";
import { Features } from "./_components/welcome/features/Features";
import { Features2 } from "./_components/welcome/features/Features2";
import { Pricing } from "./_components/welcome/pricing/Pricing";
import { Footer } from "./_components/welcome/footer/Footer";

import { Separator } from "@/components/ui/separator";

export default function Welcome() {
    const { pending } = useHomePage();
    return (
        <GuestLayout>
            <Head title="Home" />
            <div
                className={cn(
                    "absolute inset-0 flex justify-center items-center bg-white/70 transition-opacity duration-500 z-50 h-screen",
                    pending
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                role="status"
            >
                <img
                    src="https://www.shadcnblocks.com/images/block/block-1.svg"
                    className="w-20 animate-pulseScale"
                    alt="logo"
                />
                <span className="sr-only">Loading...</span>
            </div>

            {/* Main Content */}
            <div
                className={cn(
                    pending ? "opacity-0" : "opacity-100",
                    "transition-opacity duration-500"
                )}
            >
                <Header />
                <Hero />
                <AppCarousel />
                <Features2 />
                <Separator />
                <Features />
                <Pricing />
                <Footer />
            </div>
        </GuestLayout>
    );
}
