import * as React from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
// Components
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { CourtImages } from "./_components/image-selector/CourtImages";
import { TimeSlotSelector } from "./_components/time-slot-selector/TimeSlotSelector";
import { HelpSidebar } from "@/components/help-sidebar/HelpSidebar";
// Types
import { TimeSlot } from "./types/types";
import { CreateEditCourtSchema } from "./types/types";
// Shadcn
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Editar" },
];

export default function EditCourt() {
    const { court }: any = usePage().props;

    const { data, setData, post, processing, errors, reset } =
        useForm<CreateEditCourtSchema>({
            name: court.data.name,
            sport: court.data.sport,
            description: court.data.description,
            time_slots: court.data.time_slots,
            grass_type: court.data.grass_type,
            floor_type: court.data.floor_type,
            type: court.data.type,
            can_play_outside: court.data.can_play_outside,
            installation_year: court.data.installation_year,
            manufacturer: court.data.manufacturer,
            is_covered: court.data.is_covered,
            status: court.data.status,
            images: court.data.images,
            sponsor_image: court.data.sponsor_image,
            price: court.data.price,
        });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        // post
    };

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Quadra" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <form className="space-y-4 w-full max-w-4xl" onSubmit={submit}>
                    <div className="flex justify-between items-center rounded-lg border p-4">
                        <h1 className="text-xl font-semibold">Edit Court</h1>
                    </div>
                    {/* Form 1 - Basic */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">Basic</h1>
                            <p className="text-gray-600">
                                Enter essential court information in the form
                                below.
                            </p>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <Label htmlFor="name">Court name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Court name"
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
                        </div>
                        {/* Linha com selects */}
                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <Label htmlFor="sport">Sport</Label>
                                <Select
                                    value={data.sport}
                                    onValueChange={(value) =>
                                        setData("sport", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="padel">
                                                Padel
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.sport}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="type">Court type</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData("type", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="masonry">
                                                Masonry
                                            </SelectItem>
                                            <SelectItem value="panoramic">
                                                Panoramic
                                            </SelectItem>
                                            <SelectItem value="mixed">
                                                Mixed
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="w-1/2">
                                <Label htmlFor="name">Base price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min={0}
                                    step=".01"
                                    name="price"
                                    placeholder="Base price"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="is_covered">
                                    Court coverage
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_covered"
                                    checked={data.is_covered}
                                    onCheckedChange={(v) =>
                                        setData("is_covered", v)
                                    }
                                />
                                <Label htmlFor="is_covered">
                                    {data.is_covered
                                        ? "With cover"
                                        : "Without cover"}
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="description">
                                    Off-court plays
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="can_play_outside"
                                    checked={data.can_play_outside}
                                    onCheckedChange={(v) =>
                                        setData("can_play_outside", v)
                                    }
                                />
                                <Label htmlFor="can_play_outside">
                                    {data.can_play_outside
                                        ? "Allowed"
                                        : "Not allowed"}
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="description">
                                    Availability
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="status"
                                    checked={data.status}
                                    onCheckedChange={(v) =>
                                        setData("status", v)
                                    }
                                />
                                <Label htmlFor="status">
                                    {data.status ? "Available" : "Unavailable"}
                                </Label>
                            </div>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Optional Information
                                </AccordionTrigger>
                                <AccordionContent className="grid gap-4 rounded-lg py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="floor_type">
                                            Surface Type (optional)
                                        </Label>
                                        <Input
                                            id="floor_type"
                                            type="text"
                                            name="floor_type"
                                            placeholder="Surface type"
                                            value={data.floor_type}
                                            onChange={(e) =>
                                                setData(
                                                    "floor_type",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.floor_type}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="grass_type">
                                            Grass type (optional)
                                        </Label>
                                        <Input
                                            id="grass_type"
                                            type="text"
                                            name="grass_type"
                                            placeholder="Grass type"
                                            value={data.grass_type}
                                            onChange={(e) =>
                                                setData(
                                                    "grass_type",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.grass_type}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="manufacturer">
                                            Manufacturer (optional)
                                        </Label>
                                        <Input
                                            id="manufacturer"
                                            type="text"
                                            name="manufacturer"
                                            placeholder="Manufacturer"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    "manufacturer",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.manufacturer}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="installation_year">
                                            Installation year (optional)
                                        </Label>
                                        <Input
                                            id="installation_year"
                                            type="text"
                                            name="installation_year"
                                            placeholder="Installation year"
                                            value={data.installation_year}
                                            onChange={(e) =>
                                                setData(
                                                    "installation_year",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.installation_year}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="grid w-full items-center gap-2">
                                            <Label htmlFor="description">
                                                Description (optional)
                                            </Label>
                                            <Textarea
                                                value={data.description}
                                                placeholder="Description"
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    {/* Form 2 - Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-semibold">
                                    Opening Hours and Promotions
                                </h1>
                                <HelpSidebar
                                    title="Opening Hours and Promotions"
                                    description="That's the formulary for court time selection and its promotions."
                                    text={[
                                        "A court is available on weekdays by periods.",
                                        "For example, a court can open at 6:30 am and close at 12:00 pm, that's a period. Then you can reopen 14:00 and close 19:00. In this case, the court would have 2 time periods, 06:30-12:00 and 14:00-19:00.",
                                        "To set up court times, first select the day that will have available times. Then, on the selected day, set up the time periods, a block can have 1 or several periods in the same day.",
                                        "Promotions refer to the promotional schedules existing in each period. If the block has 1 period, opening at 6:30 am and closing at 11:00 am, it can have, for example, 1 price promotion from 7:00 am to 8:30 am.",
                                    ]}
                                />
                            </div>
                            <p className="text-gray-600">
                                Select the days of the week and time blocks
                                available from the court.
                            </p>
                        </div>
                        <TimeSlotSelector
                            data={data.time_slots}
                            setData={(time_slots: TimeSlot) =>
                                setData("time_slots", time_slots)
                            }
                        />
                    </div>
                    {/* Form 3 - Image */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">Pricing</h1>
                            <p className="text-gray-600">
                                Fill in the pricing information for court and
                                promotions available.
                            </p>
                        </div>
                        <div>
                            <div className="w-64">
                                <Label htmlFor="name">Court price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min={0}
                                    step=".01"
                                    name="price"
                                    placeholder="Court price"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Form 3 - Image */}
                    <div className="rounded-lg border p-8">
                        <div>
                            <div className="mb-2 space-y-2">
                                <h1 className="text-xl font-semibold">
                                    Photos of the Court (optional)
                                </h1>
                                <p className="text-gray-600">
                                    Click the button below to upload and
                                    Organize the photos of the court.
                                </p>
                            </div>
                            <div>
                                <InputError message={errors.images} />
                            </div>
                            <div>
                                <CourtImages
                                    setImages={(urls: string[]) =>
                                        setData("images", urls)
                                    }
                                    images={data.images}
                                    multiple
                                />
                            </div>
                        </div>
                        <div className="py-6">
                            <Separator />
                        </div>
                        <div>
                            <div className="mb-2 space-y-2">
                                <h1 className="text-xl font-semibold">
                                    Court Sponsor (optional)
                                </h1>
                                <p className="text-gray-600">
                                    Click the button below to upload the photo
                                    of the sponsor of the court.
                                </p>
                            </div>
                            <div>
                                <InputError message={errors.images} />
                            </div>
                            <div>
                                <CourtImages
                                    setImages={(urls: string[]) =>
                                        setData("images", urls)
                                    }
                                    images={data.images}
                                    saveAs="sponsor"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <Button>
                            <Link href={route("club.courts.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Button disabled={processing}>Create</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
