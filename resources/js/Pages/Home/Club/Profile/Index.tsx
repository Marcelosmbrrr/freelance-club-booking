import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { ProfileForm } from "./_components/ProfileForm";
import { ProfileConfigurationsForm } from "./_components/ProfileConfigurationsForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
    return (
        <AuthenticatedLayout pageName="Perfil">
            <Tabs defaultValue="account" className="max-w-screen-md">
                <TabsList>
                    <TabsTrigger value="account">Dados do Clube</TabsTrigger>
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
