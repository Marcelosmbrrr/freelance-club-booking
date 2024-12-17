export const applyCPFMask = (valor: string) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita a quantidade de números para 11 (CPF tem 11 dígitos)
    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }

    // Aplica a máscara
    valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return valor;
};
