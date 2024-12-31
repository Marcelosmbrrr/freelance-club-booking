import { Head, usePage, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const breadCrumb = [{ name: "Quadras", href: "/club/courts" }, { name: "Ver" }];

export default function ShowCourt() {
    const { court }: any = usePage().props;

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Request" />
            {/* Container */}
            <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center rounded-lg border p-4">
                    <h1 className="text-xl font-semibold">View Court</h1>
                </div>
                {/* Basic */}
                <div className="grid gap-4 rounded-lg border p-8">
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold">Basic</h1>
                        <p className="text-gray-600">
                            Enter the basic data of the court.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Court Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={court.data.name}
                            readOnly
                        />
                    </div>
                    {/* Row with selects */}
                    <div className="flex gap-x-4">
                        <div className="w-full">
                            <Label htmlFor="sport">Sport</Label>
                            <Input
                                id="sport"
                                type="text"
                                name="sport"
                                placeholder="Sport"
                                value={court.data.sport}
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="type">Court Type</Label>
                            <Input
                                id="type"
                                type="text"
                                name="type"
                                placeholder="Type"
                                value={court.data.type}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="surface_type">Surface Type</Label>
                        <Input
                            id="surface_type"
                            type="text"
                            name="surface_type"
                            placeholder="Surface type"
                            value={court.data.floor_type}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="grass_type">Grass Type</Label>
                        <Input
                            id="grass_type"
                            type="text"
                            name="grass_type"
                            placeholder="Enter the grass type"
                            value={court.data.grass_type}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="manufacturer">Manufacturer</Label>
                        <Input
                            id="manufacturer"
                            type="text"
                            name="manufacturer"
                            placeholder="Manufacturer"
                            value={court.data.manufacturer}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="installation_year">
                            Installation Year
                        </Label>
                        <Input
                            id="installation_year"
                            type="text"
                            name="installation_year"
                            placeholder="Installation year"
                            value={court.data.installation_year}
                            readOnly
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                value={court.data.description}
                                placeholder="Description"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label htmlFor="is_covered">Court Covering</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_covered"
                                checked={court.data.is_covered}
                                disabled
                            />
                            <Label htmlFor="is_covered">
                                {court.data.is_covered
                                    ? "With coverage"
                                    : "Without coverage"}
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label htmlFor="can_play_outside">
                                Play Outside Court Limits
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="can_play_outside"
                                checked={court.data.can_play_outside}
                                disabled
                            />
                            <Label htmlFor="can_play_outside">
                                {court.data.can_play_outside
                                    ? "Allowed"
                                    : "Not allowed"}
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label htmlFor="description">
                                Availability for Use
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="status"
                                checked={court.data.status}
                                disabled
                            />
                            <Label htmlFor="status">
                                {court.data.status
                                    ? "Available"
                                    : "Unavailable"}
                            </Label>
                        </div>
                    </div>
                </div>
                {/* Time Slots */}
                <div className="rounded-lg space-y-4 border p-8">
                    <h1 className="text-xl font-semibold">Operating Hours</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Day</TableHead>
                                <TableHead className="text-right">
                                    Hours
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(court.data.time_slots).map(
                                ([key, time_slot], index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {key}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {time_slot.start_time}-{" "}
                                            {time_slot.end_time}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="rounded-lg space-y-4 border p-8">
                    <h1 className="text-xl font-semibold">Pricing</h1>
                    <div>
                        <div className="w-64">
                            <Label htmlFor="name">Court Price</Label>
                            <Input
                                id="price"
                                type="number"
                                min={0}
                                step=".01"
                                name="price"
                                placeholder="Court price"
                                value={court.data.price}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                {/* Images */}
                <div>
                    <div className="mb-2 space-y-2">
                        <h1 className="text-xl font-semibold">Court Photos</h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {court.data.images.map((image_src, index) => (
                            <div>
                                <img
                                    className="h-36 w-full rounded-lg"
                                    src={image_src}
                                    alt={"img-" + index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="mb-2 space-y-2">
                        <h1 className="text-xl font-semibold">Court Sponsor</h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <img
                                className="h-36 w-full rounded-lg"
                                src={court.data.sponsor_image}
                                alt="sponsor-image"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-x-2">
                    <Button>
                        <Link href={route("club.courts.index")}>Back</Link>
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
