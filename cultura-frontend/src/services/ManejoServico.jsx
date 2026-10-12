const API_URL = process.env.REACT_APP_ENDERECO_API;
export const getManejosAPI = async () => {
    const response = await fetch(
        `${API_URL}/manejo`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    const data = await response.json()

    return data;
}

export const getManejoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${API_URL}/manejo/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    return data;
}

export const deleteManejoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${API_URL}/manejo/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    return data;
}

export const cadastraManejoAPI = async (objeto, metodo) => {
    // Se o método for PUT, adicionamos o ID/código na URL
    let url = `${API_URL}/manejo`;
    if (metodo === "PUT") {
        const id = objeto.id_manejo || objeto.codigo;
        url = `${API_URL}/manejo/${id}`;
    }

    const response = await fetch(
        url,
        {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objeto),
        }
    )

    const data = await response.json();

    return data;
}