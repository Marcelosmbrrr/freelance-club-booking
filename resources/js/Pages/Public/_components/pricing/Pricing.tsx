import { useHomePage } from "@/context/HomePageContext";

import { Check } from "lucide-react";

import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const data = {
    player: {
        title: "Planos para Jogadores",
        description:
            "Reserve quadras, encontre partidas e conecte-se com outros jogadores agora mesmo!",
        plans: [
            {
                name: "Free",
                features: ["Funcionalidade A", "Funcionalidade B"],
            },
            {
                name: "Profissional",
                features: ["Funcionalidade A", "Funcionalidade B"],
            },
        ],
    },
    club: {
        title: "Planos para Clubes",
        description:
            "Gerencie reservas, organize eventos e conecte-se com os clientes do seu clube agora mesmo!",
        plans: [
            {
                name: "Free",
                features: ["Funcionalidade A", "Funcionalidade B"],
            },
            {
                name: "Básico",
                features: ["Funcionalidade A", "Funcionalidade B"],
            },
            {
                name: "Profissional",
                features: ["Funcionalidade A", "Funcionalidade B"],
            },
        ],
    },
};

const Pricing = () => {
    const { homePageType } = useHomePage();
    const { t } = useTranslation();
    return (
        <section id="pricing" className="py-32 border-t">
            <div className="container mx-auto">
                <div className="mx-auto flex max-w-screen-xl flex-col gap-6">
                    <h2 className="text-pretty text-4xl font-bold lg:text-5xl">
                        {t(`welcome.${homePageType}.plans.title`)}
                    </h2>
                    <div className="flex flex-col justify-between gap-10 md:flex-row">
                        <p className="max-w-screen-md text-muted-foreground lg:text-xl">
                            {t(`welcome.${homePageType}.plans.description`)}
                        </p>
                    </div>
                    <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
                        <div className="flex w-full flex-col rounded-lg border p-6 text-left">
                            <Badge className="mb-8 block w-fit">
                                {t(`general.free`)}
                            </Badge>
                            <span className="text-4xl font-medium">R$0</span>
                            <p className="invisible text-muted-foreground">
                                {t(`general.per-month`)}
                            </p>
                            <Separator className="my-6" />
                            <div className="flex flex-col justify-between gap-20">
                                <ul className="space-y-4 text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade A</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade B</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade C</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade D</span>
                                    </li>
                                </ul>
                                <Button className="w-full">
                                    Comece com o plano gratuito
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-full flex-col rounded-lg border p-6 text-left">
                            <Badge className="mb-8 block w-fit">
                                {t(`general.basic`)}
                            </Badge>
                            <span className="text-4xl font-medium">R$9</span>
                            <p className="text-muted-foreground">
                                {t(`general.per-month`)}
                            </p>
                            <Separator className="my-6" />
                            <div className="flex h-full flex-col justify-between gap-20">
                                <ul className="space-y-4 text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade A</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade B</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade C</span>
                                    </li>
                                </ul>
                                <Button className="w-full">
                                    Comprar plano PRO
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-full flex-col rounded-lg border bg-muted p-6 text-left">
                            <Badge className="mb-8 block w-fit">
                                {t(`general.professional`)}
                            </Badge>
                            <span className="text-4xl font-medium">R$19</span>
                            <p className="text-muted-foreground">
                                {t(`general.per-month`)}
                            </p>
                            <Separator className="my-6" />
                            <div className="flex h-full flex-col justify-between gap-20">
                                <ul className="space-y-4 text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade A</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade B</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade C</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4" />
                                        <span>Funcionalidade D</span>
                                    </li>
                                </ul>
                                <Button className="w-full">
                                    Comprar plano Profissional
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Pricing };
