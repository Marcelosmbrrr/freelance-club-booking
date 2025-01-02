import * as React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "../ui/button";

export function LanguageSelector(props: { colorToggle?: boolean }) {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === "pt" ? "en" : "pt";
        i18n.changeLanguage(newLanguage);
    };

    const className = props.colorToggle
        ? "text-black dark:text-white"
        : "text-white dark:text-white";

    return (
        <Button
            className="hover:bg-white/20 w-16 flex items-center gap-2"
            variant="ghost"
            onClick={toggleLanguage}
        >
            <Globe className={"size-4 " + className} />
            <span className={className}>{currentLanguage}</span>
        </Button>
    );
}
