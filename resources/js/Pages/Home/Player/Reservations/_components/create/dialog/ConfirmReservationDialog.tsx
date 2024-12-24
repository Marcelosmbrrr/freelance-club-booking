import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";

export function ConfirmReservationDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled variant="default">
                    <Check />
                    Reservar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Confirmar Reserva</DialogTitle>
                    <DialogDescription>
                        Verifique os detalhes da reserva e confirme para salvar.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">OK</div>
                <DialogFooter>
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
