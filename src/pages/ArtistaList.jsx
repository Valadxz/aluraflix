import styled from "styled-components";
import { useContext, useState } from "react";
import { Contexto } from "../Contexto"; // Contexto que contiene la lista de artistas y videos
import { useNavigate } from "react-router-dom"; // Hook para la navegación

// Estilos para la lista de artistas
const ListaContenedor = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.oscuro};
  color: ${({ theme }) => theme.texto};

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ArtistaCard = styled.div`
  background-color: ${({ theme }) => theme.segundo};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
  border: ${({ color }) => (color ? `4px solid ${color}` : "none")};

  &:hover {
    transform: scale(1.05);
    background-color: ${({ color }) => (color ? `${color}40` : "inherit")};
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const ImagenModal = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px; /* Limitar la altura máxima de la imagen */
  object-fit: cover;
  border-radius: 8px; /* Agregar bordes redondeados */
  margin-bottom: 1.5rem; /* Separación inferior */

  @media (max-width: 768px) {
    max-height: 300px; /* Menor altura en pantallas más pequeñas */
  }

  @media (max-width: 480px) {
    max-height: 200px; /* Aún menor en pantallas móviles */
  }
`;

const ImagenArtista = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const NombreArtista = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ color }) => (color ? color : "inherit")};

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Estilos para el modal
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);  /* Fondo negro con opacidad */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: rgb(13 13 13 / 87%);
  color: ${({ theme }) => theme.texto};
  padding: 2rem;
  border-radius: 15px;
  width: 80%;
  max-width: 900px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-height: 90vh;  /* Limitar la altura del modal */
  overflow-y: auto;  /* Permitir el desplazamiento si es necesario */

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  font-size: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 1.2rem;
  }
`;

const Titulo = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.texto};
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

// Estilos para la lista de videos
const VideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  background-color: rgb(104 100 100 / 41%);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImagenVideo = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const VideoTitle = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.texto};
  padding: 1rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Componente principal de la lista de artistas
export function ArtistaList() {
  const { artistas, videos } = useContext(Contexto); // Obtener la lista de artistas y videos desde el contexto
  const [selectedArtista, setSelectedArtista] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

  const openModal = (artista) => {
    setSelectedArtista(artista);
  };

  const closeModal = () => {
    setSelectedArtista(null);
  };

  if (!artistas || artistas.length === 0) {
    return <p style={{ textAlign: "center", color: "#fff" }}>No hay artistas disponibles.</p>;
  }

  // Filtrar videos del artista seleccionado usando el campo 'artista'
  const filteredVideos = selectedArtista
    ? videos.filter((video) => video.artista === selectedArtista.id) // Filtrar por el campo 'artista'
    : [];

  // Depuración: Verificar si los videos están siendo filtrados correctamente
  //console.log('Filtered Videos:', filteredVideos);

  // Componente para mostrar los videos relacionados
  const CardVideo = ({ src, color, videoId }) => {
    const handleClick = () => {
      navigate(`/videoView/${videoId}`); // Redirige al componente con la información del video
    };

    return (
      <VideoCard onClick={handleClick}>
        <ImagenVideo src={src} alt="Video" />
        <VideoTitle>{color}</VideoTitle> {/* Título o descripción del video */}
      </VideoCard>
    );
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff", margin: "2rem" }}>Lista de Artistas</h1>

      <ListaContenedor>
        {artistas.map((artista) => (
          <ArtistaCard key={artista.id} onClick={() => openModal(artista)} color={artista.color}>
            <ImagenArtista
              src={artista.imagenUrl || "./src/assets/img/file.png"}
              alt={artista.nombre || "Imagen no disponible"}
            />
            <NombreArtista color={artista.color}>{artista.nombre}</NombreArtista>
          </ArtistaCard>
        ))}
      </ListaContenedor>

      {/* Modal con la información del artista */}
      {selectedArtista && (
        <ModalBackdrop onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <Titulo>{selectedArtista.nombre}</Titulo>
            <ImagenModal
  src={selectedArtista.imagenUrl || "https://via.placeholder.com/200"}
  alt={selectedArtista.nombre || "Imagen no disponible"}
/>

            <p>{selectedArtista.descripcion}</p>

            <h3>Videos relacionados:</h3>
            <VideoList>
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <CardVideo
                    key={video.id}
                    src={video.link_imagen || "https://via.placeholder.com/200"}
                    color={video.titulo}
                    videoId={video.id}
                  />
                ))
              ) : (
                <p>No hay videos relacionados.</p>
              )}
            </VideoList>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
}
