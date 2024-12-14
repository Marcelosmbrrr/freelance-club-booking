import { usePage } from "@inertiajs/react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function AppCarousel() {
    const { club }: any = usePage().props;
    return (
        <Carousel className="w-full mx-auto max-w-4xl -mt-20">
            <CarouselContent>
                {club.data.images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Card>
                                <CardContent className="aspect-video p-0">
                                    <img
                                        src={image}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
