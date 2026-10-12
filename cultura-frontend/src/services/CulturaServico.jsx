const API_URL = process.env.REACT_APP_ENDERECO_API || "http://localhost:3003";
export const getCulturasAPI = async () => {
    const response = await fetch(`${API_URL}/cultura`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getCulturaPorCodigoAPI = async codigo => {
    const response = await fetch(`${API_URL}/cultura/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCulturaPorCodigoAPI = async codigo => {
    const response = await fetch(`${API_URL}/cultura/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraCulturaAPI = async (objeto, metodo) => {
    // Se o método for PUT, adicionamos o ID/código na URL
    let url = `${API_URL}/cultura`;
    if (metodo === "PUT") {
        const id = objeto.id_cultura || objeto.codigo;
        url = `${API_URL}/cultura/${id}`;
    }

    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}