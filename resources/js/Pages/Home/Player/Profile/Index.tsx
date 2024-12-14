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
            <Tabs defaultValue="account" className="max-w-3xl mx-auto">
                <TabsList>
                    <TabsTrigger value="account">Dados Pessoais</TabsTrigger>
                    <TabsTrigger value="config">Configurações</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="config">
                    <ProfileConfigurationsForm />
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
