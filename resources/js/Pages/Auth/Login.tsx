import * as React from "react";
import { FormEventHandler } from "react";
import { useForm, Head } from "@inertiajs/react";

import { ClubLogin } from "./_components/ClubLogin";

import GuestLayout from "@/Layouts/GuestLayout";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AppIcon } from "@/components/icons/AppIcon";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerLogin from "./_components/PlayerLogin";

export default function Login({
    status,
}: {
    status?: string;
    canResetPassword: boolean;
}) {

    return (
        <GuestLayout>
            <Head title="Acesso" />
            <div className="h-screen w-full flex">
                {/* Background */}
                <div
                    className="hidden lg:block w-1/2 bg-neutral-800"
                    style={{
                        backgroundImage: "url('/images/player/player1.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
                <div className="flex flex-col w-full lg:w-1/2 justify-center items-center">
                    <header className="p-8 h-20 w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <AppIcon w="28" h="28" />
                            <span className="text-xl font-bold">App</span>
                        </div>
                        <div>
                            <ThemeToggle />
                        </div>
                    </header>
                    <div className="grow w-full flex items-center">
                        <Tabs
                            defaultValue="player"
                            className="mx-auto w-full max-w-md shadow-none border-none"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="player">
                                    Jogador
                                </TabsTrigger>
                                <TabsTrigger value="club">Clube</TabsTrigger>
                            </TabsList>
                            <TabsContent value="player">
                                <PlayerLogin />
                            </TabsContent>
                            <TabsContent value="club">
                                <ClubLogin />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
