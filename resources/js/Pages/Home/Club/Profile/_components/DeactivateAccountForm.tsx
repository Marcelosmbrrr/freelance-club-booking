import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import InputError from "@/components/InputError";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DeactivateAccountForm() {
    const { user }: any = usePage().props;
    const { toast } = useToast();

    const { data, setData, patch, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch("/club/profile/" + user.data.id + "/deactivate", {
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
                    description: "A conta foi desativada.",
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
                <Label htmlFor="name">Senha</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Informe a senha atual"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>
            <Button type="submit" variant="destructive" disabled={processing}>
                {processing ? "Carregando ..." : "Desativar Conta"}
            </Button>
        </form>
    );
}
