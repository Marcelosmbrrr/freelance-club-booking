import { Head, usePage, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Carousel1 } from "@/components/carousel/Carousel1";
import InputError from "@/components/InputError";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Criar" },
];

export default function CreateCourt() {
    const { time_slots }: any = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        sport: "",
        type: "",
        description: "",
        time_slots: [],
        images: [],
    });

    // Função para lidar com o upload de múltiplas imagens
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const imageUrls = files.map((file) => URL.createObjectURL(file));
            setData("images", imageUrls);
        }
    };

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Requisição" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <form className="space-y-4 w-full max-w-4xl">
                    {/* Form 1 - Basic */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <h1 className="text-xl font-semibold">Básico</h1>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome da quadra *</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sport">Esporte *</Label>
                            <Select
                                value={data.sport}
                                onValueChange={(value) =>
                                    setData("sport", value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o esporte" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="tennis">
                                            Tênis
                                        </SelectItem>
                                        <SelectItem value="beach_tennis">
                                            Beach Tênis
                                        </SelectItem>
                                        <SelectItem value="padel">
                                            Padel
                                        </SelectItem>
                                        <SelectItem value="squash">
                                            Squash
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.sport}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipo de área *</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) =>
                                    setData("type", value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione a área" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="tennis">
                                            Área coberta
                                        </SelectItem>
                                        <SelectItem value="beach_tennis">
                                            Área aberta
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    value={data.description}
                                    placeholder="Informe a descrição da quadra"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {/* Form 2 - Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <h1 className="text-xl font-semibold">
                            Horários Disponíveis
                        </h1>
                        <ToggleGroup
                            type="multiple"
                            variant="outline"
                            className="w-full flex flex-wrap gap-4"
                            value={data.time_slots}
                            onValueChange={(values) =>
                                setData("time_slots", values)
                            }
                        >
                            {time_slots.map(
                                (time_slot: { id: string; time: string }) => (
                                    <ToggleGroupItem
                                        key={time_slot.id}
                                        value={time_slot.id}
                                        aria-label="Toggle bold"
                                        className="flex-grow md:flex-none md:w-1/4 p-2 text-center border rounded"
                                    >
                                        {time_slot.time}
                                    </ToggleGroupItem>
                                )
                            )}
                        </ToggleGroup>
                    </div>

                    {/* Form 3 - Image */}
                    <div className="flex flex-col space-y-4 rounded-lg border p-8">
                        <h1 className="text-xl font-semibold">Imagens</h1>
                        <div className="space-y-4">
                            <div className="px-8">
                                <Carousel1 items={data.images} />
                            </div>
                            <div className="grid max-w-md w-full items-center gap-2">
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    onChange={handleImageChange} // Atualiza o estado com as novas imagens
                                />
                                <InputError message={errors.images} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <Button>
                            <Link href={route("club.courts.index")}>
                                Cancelar
                            </Link>
                        </Button>
                        <Button disabled={processing}>Criar</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
