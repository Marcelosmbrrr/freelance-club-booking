import React from "react";
import {
    CircleDollarSign,
    Mail,
    MessageSquareText,
    ScrollText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const data = [
    {
        icon: <ScrollText />,
        title: "Notificação 1",
        category: "Comanda aberta",
        description: "Outstanding Performance Award.",
        link: "#",
    },
    {
        icon: <ScrollText />,
        title: "Notificação 2",
        category: "Comanda aberta",
        description: "Best in Category Winner.",
        link: "#",
    },
    {
        icon: <CircleDollarSign />,
        title: "Notificação 3",
        category: "Pagamento pendente",
        description: "Breakthrough Solution of the Year.",
        link: "#",
    },
    {
        icon: <MessageSquareText />,
        title: "Notificação 4",
        category: "Mensagem",
        description: "Top-Rated Solution Provider.",
        link: "#",
    },
    {
        icon: <Mail />,
        title: "Notificação 5",
        category: "Convite para jogo",
        description: "Executive Team of the Year.",
        link: "#",
    },
];

export function NotificationsForm() {
    return (
        <div className="py-8">
            <div className="mb-4">
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Lidos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Não Lidos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Excluídos</Label>
                    </div>
                </RadioGroup>
            </div>
            <Separator />
            <div className="flex flex-col">
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="flex justify-between items-center py-2">
                            <div className="order-2 flex items-center gap-2 md:order-none">
                                <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                                    {item.icon}
                                </span>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">Abrir</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            {item.title}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {item.description}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Fechar
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                            Confirmar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <Separator />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
