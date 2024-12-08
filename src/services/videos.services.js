import axios from "axios";

// Crear una instancia de axios para configurar la base URL
export const api = axios.create({
    baseURL: 'https://67520daed1983b9597b53d6c.mockapi.io/' // Ajusta la URL base según tu API
});

// Función para listar videos
export const listarVideos = async (url, setDatos) => {
    try {
        const respuesta = await api.get(url); // Realiza la solicitud GET para obtener los videos
        setDatos(respuesta.data); // Usamos 'data' para acceder a los datos que nos devuelve la API
    } catch (error) {
        console.error("Error al listar videos:", error);
        throw error; // Opcional: Maneja el error como sea necesario, podrías usar setError() para mostrar mensajes al usuario
    }
};

// Función para eliminar un video
export const eliminarVideo = async (id) => {
    try {
        const respuesta = await api.delete(`/video/${id}`); // Realiza la solicitud DELETE para eliminar el video
        return respuesta.data; // Usamos 'data' para acceder a los datos que nos devuelve la API
    } catch (error) {
        console.error("Error al eliminar el video:", error);
        throw error;
    }
};

// Función para obtener un video específico
export const obtenerVideo = async (id) => {
    const respuesta = await api.get(`/video/${id}`);
    return respuesta.data;
}

// Función para crear un video
export const crearVideo = async (datos) => {
    try {
        const respuesta = await api.post(`/video`, datos); // Realiza la solicitud POST para crear un nuevo video
        return respuesta.data; // Usamos 'data' para acceder a los datos
    } catch (error) {
        console.error("Error al crear el video:", error);
        throw error;
    }
};

export const actualizarVideo = async (id, datos) => {
    const respuesta = await api.put(`/video/${id}`, {
        ...datos
    });
   // console.log("Datos a actualizar:", datos);

    return respuesta;
}