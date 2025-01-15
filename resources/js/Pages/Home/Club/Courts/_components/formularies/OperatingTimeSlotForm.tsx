import * as React from "react";
import { HelpSidebar } from "@/components/help-sidebar/HelpSidebar";
import { TimeSlotSelector } from "../time-slot-selector/TimeSlotSelector";
import { TimeSlot } from "../../types/types";

export function OperatingTimeSlotForm(props: {
    data: any;
    errors: any;
    setData: Function;
}) {
    return (
        <div className="rounded-lg space-y-4 border p-8">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">
                        Horário de Funcionamento
                    </h1>
                    <HelpSidebar
                        title="Horário de Funcionamento"
                        description="Formulário para configurar os horários disponíveis da quadra."
                        text={[
                            "A quadra pode ser reservada em horários definidos por períodos ao longo do dia.",
                            "Por exemplo, ela pode abrir das 6h30 às 12h, formando um período. Depois, pode reabrir das 14h às 19h, configurando dois períodos distintos: 06:30-12:00 e 14:00-19:00.",
                            "Para configurar os horários, selecione primeiro o dia em que a quadra estará disponível. Em seguida, defina os períodos específicos para aquele dia. Um único dia pode conter um ou mais períodos.",
                        ]}
                    />
                </div>
                <p className="text-gray-600">
                    Selecione os dias da semana e os períodos de tempo
                    disponíveis na quadra. 
                </p>
            </div>
            <TimeSlotSelector
                data={props.data.time_slots}
                setData={(time_slots: TimeSlot) =>
                    props.setData("time_slots", time_slots)
                }
            />
        </div>
    );
}
