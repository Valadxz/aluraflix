import axios from "axios";

export const api = axios.create({
    baseURL: 'https://67520daed1983b9597b53d6c.mockapi.io/'
});

export const listarArtista = async (url, setDatos) => {
    const respuesta = await api.get(url);
    setDatos(respuesta)
} 

export const eliminarArtista = async (id) => {
    const respuesta = await api.delete(`/artist/${id}`);
    return respuesta;
}

export const obtenerArtista = async (id) => {
    const respuesta = await api.get(`/artist/${id}`);
    return respuesta.data;
}

export const crearArtista = async (datos) => {
    const respuesta = await api.post(`/artist`, {
        ...datos
    });
    return respuesta;
}

export const actualizarArtista = async (id, datos) => {
    const respuesta = await api.put(`/artist/${id}`, {
        ...datos
    });
    return respuesta;
}