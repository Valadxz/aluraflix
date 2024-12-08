import { createContext, useEffect, useState } from "react";
import { listarVideos } from "./services/videos.services";
import { listarArtista } from "./services/artistas.service"; // Importar el servicio de artistas

export const Contexto = createContext();

export function ProveedorContexto({ children }) {
    const [videos, setVideos] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [actulizador, setActualizador] = useState(0); // Puedes inicializar a 0 si no necesitas recargar
    const [loading, setLoading] = useState(true);

    // Cargar videos, categorías y artistas al cambiar el actualizador
    useEffect(() => {
        const cargarDatos = async () => {
            await Promise.all([
                listarVideos("/video", setVideos),
                listarArtista("/artist", setArtistas)
            ]);
            setLoading(false);
        };

        cargarDatos();
    }, [actulizador]);

    if (loading) {
        return <p>Cargando...</p>; // Mostrar mensaje de carga
    }

    return (
        <Contexto.Provider
            value={{
                videos: videos.length > 0 ? videos : [],
                artistas: artistas.data, // Exponer artistas en el contexto
                valor: actulizador,
                recargar: setActualizador
            }}
        >
            {children}
        </Contexto.Provider>
    );
}
