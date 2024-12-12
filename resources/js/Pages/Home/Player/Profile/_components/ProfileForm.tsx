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
    return (
        <section className="space-y-4">
            <div className="max-w-screen-md space-y-6 rounded-lg border p-10">
                <div className="w-32 h-32 overflow-hidden rounded-xl">
                    <img
                        src="https://github.com/shadcn.png"
                        alt="user-img"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" />
                </div>
            </div>

            <div className="max-w-screen-md space-y-6 rounded-lg border p-10">
                <form className="space-y-6">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe o seu nome"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Informe o seu e-mail"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="phonenumber">Celular</Label>
                        <Input type="text" id="phonenumber" placeholder="+55" />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="sex">Sexo</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="morning-1">
                                            Masculino
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Feminino
                                        </SelectItem>
                                        <SelectItem value="morning-1">
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
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="state">Lado de Preferência</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar lado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="morning-1">
                                            Masculino
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Feminino
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Não Informar
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="state">Nível de Habilidade</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar habilidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="morning-1">
                                           Iniciante
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Intermediário
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Avançado
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="bio">Descrição</Label>
                        <Textarea id="bio" placeholder="Fale sobre você" />
                    </div>
                    <Button className="w-full">Salvar Dados</Button>
                </form>
            </div>
        </section>
    );
}
