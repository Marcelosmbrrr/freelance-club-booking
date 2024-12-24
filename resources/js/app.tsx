import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./components/theme/ThemeProvider";
import { HomePageProvider } from "@/context/HomePageContext";
import { Toaster } from "@/components/ui/toaster";

const appName = import.meta.env.VITE_APP_NAME || "App";

const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <HomePageProvider>
                    <QueryClientProvider client={queryClient}>
                        <App {...props} />
                    </QueryClientProvider>
                    <Toaster />
                </HomePageProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#fcd34d",
    },
});
