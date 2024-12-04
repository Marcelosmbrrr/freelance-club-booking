"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type HomePageType = "player" | "club";

interface HomePageContextType {
    homePageType: HomePageType;
    pending: boolean;
    handleChangeHomePage: () => void;
}

// Contexto inicial
const HomePageContext = createContext<HomePageContextType | undefined>(
    undefined
);

// Provider do Contexto
export const HomePageProvider = ({ children }: { children: ReactNode }) => {
    const [homePageType, setHomePageType] = useState<HomePageType>("player");
    const [pending, setPending] = React.useState<boolean>(false);

    function handleChangeHomePage() {
        setPending(true);
        setTimeout(() => {
            setHomePageType((prev) => (prev === "player" ? "club" : "player"));
            setPending(false);
        }, 2000);
    }

    return (
        <HomePageContext.Provider
            value={{ homePageType, pending, handleChangeHomePage }}
        >
            {children}
        </HomePageContext.Provider>
    );
};

export const useHomePage = (): HomePageContextType => {
    const context = useContext(HomePageContext);
    if (!context) {
        throw new Error("useHomePage must be used within a HomePageProvider");
    }
    return context;
};
