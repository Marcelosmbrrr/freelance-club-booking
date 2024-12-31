import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "../locale/en.json";
import ptTranslations from "../locale/pt.json";

// Doc: https://react.i18next.com/
// Guide: https://www.youtube.com/watch?v=rOlbm--yl6w

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            pt: {
                ...ptTranslations
            },
            en: {
                ...enTranslations
            },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });