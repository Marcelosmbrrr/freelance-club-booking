import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeactivateAccountForm } from "./DeactivateAccountForm";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function ProfileConfigurationsForm() {
    const { user }: any = usePage().props;
    const { toast } = useToast();

    const { data, setData, patch, processing, errors, reset } = useForm({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch("/player/profile/" + user.data.id + "/change-password", {
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
        <section className="space-y-4">
            <div className="max-w-screen-md space-y-6 py-8">
                <ChangePasswordForm />
            </div>
            <div className="max-w-screen-md space-y-6 py-8">
                <DeactivateAccountForm />
            </div>
        </section>
    );
}
