import * as React from "react";
import { HelpSidebar } from "@/components/help-sidebar/HelpSidebar";
import { PricingSelector } from "../PricingSelector";
import { Pricing, Promotion } from "../../types/types";
import { PromotionsSelector } from "../PromotionsSelector";

export function PricingDataForm(props: {
    data: any;
    errors: any;
    setData: Function;
}) {
    return (
        <>
            <div className="space-y-4 py-8 mb-2">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Precificação</h1>
                        <HelpSidebar
                            title="Precificação"
                            description="Formulário para seleção de preços por intervalos de tempo."
                            text={[
                                "O preço de uma quadra é calculado com base no tempo de uso.",
                                "Não é obrigatório precificar todas as opções de tempo disponíveis. Por exemplo, o clube pode optar por oferecer apenas as opções de 60, 90 e 120 minutos para a quadra, conforme sua necessidade.",
                            ]}
                        />
                    </div>
                    <p className="text-gray-600">
                        Selecione e defina os preços para as opções de tempo de
                        uso da quadra.
                    </p>
                </div>
                <PricingSelector
                    setData={(pricing: Pricing[]) =>
                        props.setData("pricing", pricing)
                    }
                />
            </div>
            <div className="space-y-4 py-8">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">
                            Promoções (opcional)
                        </h1>
                        <HelpSidebar
                            title="Promoções"
                            description="Formulário para configurar promoções de membro vip e horários promocionais."
                            text={[""]}
                        />
                    </div>
                    <p className="text-gray-600">
                        Informe a promoção para membros vip e os horários
                        promocionais.
                    </p>
                </div>
                <PromotionsSelector
                    time_slots={props.data.time_slots}
                    data={props.data.promotions_by_weekday}
                    setData={(promotion: Promotion[]) =>
                        props.setData("promotions_by_weekday", promotion)
                    }
                />
            </div>
        </>
    );
}
