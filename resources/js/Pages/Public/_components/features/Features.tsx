import { useHomePage } from "@/context/HomePageContext";

import { Infinity, MessagesSquare, Zap, ZoomIn } from "lucide-react";

import { useTranslation } from "react-i18next";

const feature = [
    {
        title: "Vantagem",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
        icon: <ZoomIn className="size-6" />,
    },
    {
        title: "Vantagem",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
        icon: <Zap className="size-6" />,
    },
    {
        title: "Vantagem",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
        icon: <MessagesSquare className="size-6" />,
    },
    {
        title: "Vantagem",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
        icon: <Infinity className="size-6" />,
    },
];

const Features = () => {
    const { homePageType } = useHomePage();
    const { t } = useTranslation();
    return (
        <section
            id="advantages"
            className="flex min-h-screen items-center justify-center py-24"
        >
            <div className="container">
                <div className="flex w-full flex-col items-center">
                    <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
                        <p className="text-sm text-muted-foreground">
                            {t(`welcome.${homePageType}.advantages.hint`)}
                        </p>
                        <h2 className="text-3xl font-medium md:text-5xl">
                            {t(`welcome.${homePageType}.advantages.title`)}
                        </h2>

                        <p className="text-muted-foreground md:max-w-2xl">
                            {t(
                                `welcome.${homePageType}.advantages.description`
                            )}
                        </p>
                    </div>
                </div>
                <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
                    {feature.map((feature, idx) => (
                        <div
                            className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
                            key={idx}
                        >
                            <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                                {feature.icon}
                            </span>
                            <div>
                                <h3 className="text-lg font-medium md:text-2xl">
                                    {t("welcome.advantage")}
                                </h3>
                                <p className="mt-2 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Features };
