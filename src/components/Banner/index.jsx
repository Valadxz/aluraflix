import styled from "styled-components";
import videoBanner from "../../assets/video/MiBelloAngel.mp4";
import { useState } from "react";

// Contenedor principal del banner
const Anuncio = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: black;
`;

// Video de fondo
const VideoFondo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

// Contenido del banner
const AnuncioContenido = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

// Botón para activar el audio
const BotonAudio = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// Contenedor del texto
const AnuncioDescripcion = styled.div`
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

// Título del banner
const AnuncioTitulo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media screen and (min-width: 1024px) {
    font-size: 3rem;
  }
`;

// Detalle del banner
const AnuncioDetalle = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Botón para más información
const AnuncioBoton = styled.a`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #e50914;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b81d24;
  }
`;

export function Banner() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Anuncio>
      {/* Video de fondo */}
      <VideoFondo src={videoBanner} muted={isMuted} autoPlay loop playsInline />

      {/* Botón para controlar el audio */}
      <BotonAudio onClick={toggleAudio}>{isMuted ? "🔇" : "🔊"}</BotonAudio>

      {/* Contenido del banner */}
      <AnuncioContenido>
        <AnuncioDescripcion>
          <AnuncioTitulo>TumbadoFlix</AnuncioTitulo>
          <AnuncioDetalle>
            ¡Vive la esencia de los Corridos Tumbados! Explora, disfruta y
            comparte tus videos musicales favoritos en TumbadoFlix.
          </AnuncioDetalle>
          <AnuncioBoton href="/videoList">Ver todos los videos</AnuncioBoton>
        </AnuncioDescripcion>
      </AnuncioContenido>
    </Anuncio>
  );
}
