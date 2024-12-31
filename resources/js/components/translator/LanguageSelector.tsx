import * as React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "../ui/button";

export const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === "pt" ? "en" : "pt";
        i18n.changeLanguage(newLanguage);
    };

    return (
        <Button
            className="hover:bg-white/20 w-16"
            variant="ghost"
            onClick={toggleLanguage}
        >
            <Globe className="size-4 text-white" />{" "}
            <span className="text-white">{currentLanguage}</span>
        </Button>
    );
};
