import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { ProfileForm } from "./_components/ProfileForm";
import { ProfileConfigurationsForm } from "./_components/ProfileConfigurationsForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breadCrumb = [{ name: "Minha Conta" }];

export default function Profile() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Minha Conta" />
            <div className="max-w-screen-md mx-auto">
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Clube</TabsTrigger>
                        <TabsTrigger value="config">Configurações</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <ProfileForm />
                    </TabsContent>
                    <TabsContent value="config">
                        <ProfileConfigurationsForm />
                    </TabsContent>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
