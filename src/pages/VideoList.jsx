import styled from "styled-components";
import { useContext } from "react";
import { Contexto } from "../Contexto"; // Contexto que contiene la lista de videos
import { useNavigate } from "react-router-dom"; // Para la navegación

const ListaVideosContenedor = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.oscuro};
  color: ${({ theme }) => theme.texto};
`;

const TituloPagina = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.texto};
  margin-top: 5rem;
`;

const VideoCard = styled.div`
  background-color: ${({ theme }) => theme.segundo};
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
`;

const TituloVideo = styled.div`
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.primero};
  color: #fff;
`;

export function VideoList() {
  const { videos } = useContext(Contexto); 
  const navigate = useNavigate(); 

  if (!videos || videos.length === 0) {
    return <p style={{ textAlign: "center", color: "#fff" }}>No hay videos disponibles.</p>;
  }

  const reproducirVideo = (id) => {
    navigate(`/videoView/${id}`); 
  };

  return (
    <>
      <TituloPagina>Listado de Videos</TituloPagina>
      <ListaVideosContenedor>
        {videos.map((video) => (
          <VideoCard key={video.id} onClick={() => reproducirVideo(video.id)}>
            <ImagenVideo
              src={video.imagen || video.link_imagen || "https://via.placeholder.com/250"}
              alt={video.titulo || "Imagen no disponible"}
            />
            <TituloVideo>{video.titulo}</TituloVideo>
          </VideoCard>
        ))}
      </ListaVideosContenedor>
    </>
  );
}
