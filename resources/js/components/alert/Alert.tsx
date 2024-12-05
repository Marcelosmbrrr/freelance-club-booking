import { AlertCircle } from "lucide-react";

import { Alert as AlertShadcn, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive(props: {
    variant: "default" | "destructive";
    title: string;
    message: string;
}) {
    return (
        <AlertShadcn variant={props.variant}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{props.title}</AlertTitle>
            <AlertDescription>{props.message}</AlertDescription>
        </AlertShadcn>
    );
}
