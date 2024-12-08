import styled from "styled-components";
import { Banner } from "../components/Banner";
import { useContext } from "react";
import { Contexto } from "../Contexto";
import { Artista } from "../components/Artista";

const Principal = styled.main`
    background: ${({ theme }) => theme.oscuro};
`;

export function Home() {
    const datos = useContext(Contexto);
    const { artistas = [], videos = [] } = datos; 

    if (!artistas.length || !videos.length) {
        return <div>Cargando...</div>; 
    }

    return (
        <Principal>
            <Banner />
            {artistas.map((artista, indice) => {
                // Filtrar los videos relacionados con el artista
                const videosDelArtista = videos.filter((video) => video.artista === artista.id);

                if (videosDelArtista.length > 0) {
                    return <Artista artista={artista} key={indice} videos={videosDelArtista} />;
                }
                return null;
            })}
        </Principal>
    );
}

