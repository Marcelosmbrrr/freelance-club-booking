import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface Carousel1Props {
    items: string[]; 
}

export function Carousel1({ items }: Carousel1Props) {
    // Se não houver itens, retorna null (não renderiza nada)
    if (items.length === 0) {
        return null;
    }

    console.log(items);

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent>
                {items.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="md:basis-1/2"
                    >
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-0">
                                    <img
                                        src={item}
                                        alt={"imagem " + index}
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
