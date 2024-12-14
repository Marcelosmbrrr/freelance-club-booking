import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import InputError from "@/components/InputError";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm() {
    const { user }: any = usePage().props;
    const { toast } = useToast();

    const { data, setData, patch, processing, errors, reset } = useForm({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch("/club/profile/" + user.data.id + "/change-password", {
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description:
                        "Confira os dados informados e tente novamente.",
                    action: (
                        <ToastAction altText="Undo the action">
                            Fechar
                        </ToastAction>
                    ),
                });
            },
            onSuccess: () => {
                reset();
                toast({
                    title: "Sucesso!",
                    description: "A senha foi atualizada.",
                    action: (
                        <ToastAction altText="Undo the action">
                            Fechar
                        </ToastAction>
                    ),
                });
            },
        });
    };

    return (
        <form className="space-y-6" onSubmit={submit}>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Senha atual</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Informe a senha atual"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nova Senha</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Informe a nova senha"
                    value={data.new_password}
                    onChange={(e) => setData("new_password", e.target.value)}
                />
                <InputError message={errors.new_password} className="mt-2" />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Confirmar nova senha</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Informe a senha novamente"
                    value={data.new_password_confirmation}
                    onChange={(e) =>
                        setData("new_password_confirmation", e.target.value)
                    }
                />
                <InputError
                    message={errors.new_password_confirmation}
                    className="mt-2"
                />
            </div>
            <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Carregando ..." : "Alterar Senha"}
            </Button>
        </form>
    );
}
