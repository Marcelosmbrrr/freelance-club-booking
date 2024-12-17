export const applyCNPJMask = (valor: string) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita a quantidade de números para 14 (CNPJ tem 14 dígitos)
    if (valor.length > 14) {
        valor = valor.substring(0, 14);
    }

    // Aplica a máscara
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

    return valor;
};
