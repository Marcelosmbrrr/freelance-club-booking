export const applyCEPMask = (valor: string) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita a quantidade de números para 8 (CEP tem 8 dígitos)
    if (valor.length > 8) {
        valor = valor.substring(0, 8);
    }

    // Aplica a máscara
    valor = valor.replace(/^(\d{5})(\d{3})$/, "$1-$2");

    return valor;
};
