import { useHomePage } from "@/context/HomePageContext";

import { useTranslation } from "react-i18next";

export function Hero() {
    const { homePageType } = useHomePage();
    const { t } = useTranslation();
    return (
        <div
            id="begin"
            className="relative py-32 px-4 min-h-96 shadow-md bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://wallpaperaccess.com/full/1507858.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative py-28 mx-auto max-w-screen-xl text-center">
                <h1 className="text-4xl font-bold tracking-tight leading-none text-white mb-4 md:text-5xl lg:text-6xl">
                    {t(`welcome.${homePageType}.hero.title`)}
                </h1>
                <p className="text-lg font-normal text-gray-300 mb-8 lg:text-xl sm:px-16 xl:px-48">
                    {t(`welcome.${homePageType}.hero.description`)}
                </p>
            </div>
        </div>
    );
}
