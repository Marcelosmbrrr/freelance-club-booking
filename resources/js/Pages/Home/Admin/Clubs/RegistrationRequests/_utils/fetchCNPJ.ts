import axios from "axios";

export function fetchCNPJ({ queryKey }: any) {
    const [key, cnpj] = queryKey; 
    if (!cnpj) {
        throw new Error("CNPJ is required");
    }
    return axios.get(
        "https://publica.cnpj.ws/cnpj/" + cnpj.replace(/[^\d]/g, "")
    );
}
