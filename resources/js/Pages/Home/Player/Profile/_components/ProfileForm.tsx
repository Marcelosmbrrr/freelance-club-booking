import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { applyCPFMask } from "@/utils/functions/applyCPFMask";

import InputError from "@/components/InputError";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ProfileForm() {
    const { user }: any = usePage().props;
    const { toast } = useToast();

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.data.name,
        email: user.data.email,
        sex: user.data.player.sex,
        cpf: user.data.player.cpf,
        birth_date: user.data.player.birth_date,
        best_hand: user.data.player.best_hand,
        court_side: user.data.player.court_side,
        match_type: user.data.player.match_type,
        phonenumber: user.data.player.phonenumber,
        description: user.data.player.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch("/player/profile/" + user.data.id, {
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
                    description: "Os dados pessoais foram atualizados.",
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
        <section>
            <div className="max-w-screen-md space-y-6 py-8">
                <div className="w-32 h-32 overflow-hidden rounded-xl">
                    <img
                        src={user.data.player.avatar_image}
                        alt="user-img"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Avatar</Label>
                    <Input id="picture" type="file" />
                </div>
            </div>
            <div className="max-w-screen-md space-y-6">
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe o seu nome"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Informe o seu e-mail"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="phonenumber">Celular</Label>
                        <Input
                            type="text"
                            id="phonenumber"
                            placeholder="Informe o número de celular"
                            value={data.phonenumber}
                            onChange={(e) =>
                                setData("phonenumber", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.phonenumber}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="sex">Sexo</Label>
                            <Select
                                value={data.sex ?? ""}
                                onValueChange={(v) => setData("sex", v)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="male">
                                            Masculino
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Feminino
                                        </SelectItem>
                                        <SelectItem value="none">
                                            Não Informar
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Informe o seu CPF"
                                value={data.cpf}
                                onChange={(e) =>
                                    setData("cpf", applyCPFMask(e.target.value))
                                }
                            />
                            <InputError message={errors.cpf} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="state">Mão Dominante</Label>
                            <Select
                                onValueChange={(v) => setData("best_hand", v)}
                                value={data.court_side ?? ""}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar lado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="left-handed">
                                            Esquerda
                                        </SelectItem>
                                        <SelectItem value="right-handed">
                                            Direita
                                        </SelectItem>
                                        <SelectItem value="both">
                                            Ambos
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="state">Tipo de jogo</Label>
                            <Select
                                onValueChange={(v) => setData("match_type", v)}
                                value={data.match_type ?? ""}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar habilidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="competitive">
                                            Competitivo
                                        </SelectItem>
                                        <SelectItem value="friendly">
                                            Amigável
                                        </SelectItem>
                                        <SelectItem value="both">
                                            Ambos
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="state">Lado de Preferência</Label>
                            <Select
                                onValueChange={(v) => setData("court_side", v)}
                                value={data.court_side ?? ""}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar lado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="backhand">
                                            Esquerda
                                        </SelectItem>
                                        <SelectItem value="forehand">
                                            Direita
                                        </SelectItem>
                                        <SelectItem value="both">
                                            Ambos
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="bio">Descrição</Label>
                        <Textarea
                            id="bio"
                            placeholder="Fale sobre você"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? "Carregando ..." : "Salvar"}
                    </Button>
                </form>
            </div>
        </section>
    );
}
