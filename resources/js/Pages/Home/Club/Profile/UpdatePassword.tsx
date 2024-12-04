import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
    return (
        <AuthenticatedLayout pageName="Atualizar Senha">
            <div className="max-w-screen-md space-y-6 rounded-lg border p-10">
                <form className="space-y-6">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Senha atual</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe a senha atual"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Nova Senha</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe a nova senha"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Confirmar nova senha</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe a senha novamente"
                        />
                    </div>
                    <Button className="w-full">Alterar Senha</Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
