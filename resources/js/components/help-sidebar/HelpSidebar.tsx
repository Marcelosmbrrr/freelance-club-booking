import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CircleHelp } from "lucide-react";

export function HelpSidebar(props: {
    title: string;
    description: string;
    text: string[];
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <CircleHelp /> Help
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{props.title}</SheetTitle>
                    <SheetDescription>
                        {props.text.map((p) => (
                            <p className="mb-2">{p}</p>
                        ))}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
