import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="sex">Sexo</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar Horário" />
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
                            <Label htmlFor="state">Estado</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar Horário" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="morning-1">
                                            Estado A
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Estado B
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Estado C
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="lastname">Cidade</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar Horário" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="morning-1">
                                            Cidade A
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Cidade B
                                        </SelectItem>
                                        <SelectItem value="morning-1">
                                            Cidade C
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button className="w-full">Salvar Dados</Button>
                </form>
            </div>
        </section>
    );
}
