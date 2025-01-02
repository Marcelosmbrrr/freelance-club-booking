import { useHomePage } from "@/context/HomePageContext";

import { Lightbulb, ListChecks, MessageCircleMore } from "lucide-react";

import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Features2 = () => {
    const { homePageType } = useHomePage();
    const { t } = useTranslation();
    return (
        <section
            id="features"
            className="flex min-h-screen items-center justify-center py-24"
        >
            <div className="container max-w-5xl">
                <div className="flex w-full flex-col items-center mb-12">
                    <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
                        <p className="text-sm text-muted-foreground">
                            {t(`welcome.${homePageType}.features.hint`)}
                        </p>
                        <h2 className="text-3xl font-medium md:text-5xl">
                        {t(`welcome.${homePageType}.features.title`)}
                        </h2>
                    </div>
                </div>
                <Tabs defaultValue="feature-1">
                    <TabsList className="flex h-auto w-full flex-col gap-2 bg-background md:flex-row">
                        <TabsTrigger
                            value="feature-1"
                            className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
                        >
                            <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                                <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                                    <MessageCircleMore className="size-4 text-primary" />
                                </span>
                                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                                    {t("general.feature")}
                                </p>
                            </div>
                            <p className="font-normal text-muted-foreground md:block">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </TabsTrigger>
                        <TabsTrigger
                            value="feature-2"
                            className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
                        >
                            <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                                <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                                    <Lightbulb className="size-4 text-primary" />
                                </span>
                                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                                    {t("general.feature")}
                                </p>
                            </div>
                            <p className="font-normal text-muted-foreground md:block">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </TabsTrigger>
                        <TabsTrigger
                            value="feature-3"
                            className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
                        >
                            <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                                <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                                    <ListChecks className="size-4 text-primary" />
                                </span>
                                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                                    {t("general.feature")}
                                </p>
                            </div>
                            <p className="font-normal text-muted-foreground md:block">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="feature-1">
                        <img
                            src="https://www.shadcnblocks.com/images/block/placeholder-1.svg"
                            alt=""
                            className="aspect-video rounded-md object-cover"
                        />
                    </TabsContent>
                    <TabsContent value="feature-2">
                        <img
                            src="https://www.shadcnblocks.com/images/block/placeholder-2.svg"
                            alt=""
                            className="aspect-video rounded-md object-cover"
                        />
                    </TabsContent>
                    <TabsContent value="feature-3">
                        <img
                            src="https://www.shadcnblocks.com/images/block/placeholder-3.svg"
                            alt=""
                            className="aspect-video rounded-md object-cover"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export { Features2 };
