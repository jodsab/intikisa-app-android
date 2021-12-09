//LLamada a borrar del carrito
export const totalaPagar = async (url, data) => {

    const resp = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await resp.json();

    return json;
}  
