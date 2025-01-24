import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { ProfileForm } from "./_components/ProfileForm";
import { ProfileConfigurationsForm } from "./_components/ProfileConfigurationsForm";
import { NotificationsForm } from "./_components/NotificationsForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breadCrumb = [{ name: "Minha Conta" }];

export default function Profile() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Minha Conta" />
            <div className="max-w-screen-md mx-auto">
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="account">
                            Dados Pessoais
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            Notificações
                        </TabsTrigger>
                        <TabsTrigger value="config">Configurações</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <ProfileForm />
                    </TabsContent>
                    <TabsContent value="notifications">
                        <NotificationsForm />
                    </TabsContent>
                    <TabsContent value="config">
                        <ProfileConfigurationsForm />
                    </TabsContent>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
