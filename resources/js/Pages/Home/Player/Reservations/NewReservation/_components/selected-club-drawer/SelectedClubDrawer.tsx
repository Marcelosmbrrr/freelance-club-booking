import * as React from "react";

import { AboutTab } from "./AboutTab";
import { CreateReservationTab } from "./CreateReservationTab";
import { OpenMatchesTab } from "./OpenMatchesTab";

import { Club } from "../../Index";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function SelectedClubDrawer(props: { club: Club }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>Selecionar</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-7xl">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl">
                            {props.club.name}
                        </DrawerTitle>
                        <DrawerDescription>
                            {props.club.address}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-0 h-[600px]">
                        <Tabs defaultValue="1" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="1">Sobre</TabsTrigger>
                                <TabsTrigger value="2">Horários</TabsTrigger>
                                <TabsTrigger value="3">
                                    Partidas Abertas
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="1">
                                <AboutTab club={props.club} />
                            </TabsContent>
                            <TabsContent value="2">
                                <CreateReservationTab club={props.club} />
                            </TabsContent>
                            <TabsContent value="3">
                                <OpenMatchesTab club={props.club} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
