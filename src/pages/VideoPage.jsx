import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerVideo } from "../services/videos.services";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoTitle = styled.h1`
  color: white;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 10000;
  font-size: 1.5rem;
`;

const VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 10000;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function VideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const respuesta = await obtenerVideo(videoId);
        setVideo(respuesta);
      } catch (error) {
        console.error("Error al obtener el video:", error);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (!video) {
    return <div>Cargando...</div>;
  }

  // Transformar la URL del video para incrustarlo
  const embedLink = video.link_video.replace("watch?v=", "embed/");

  return (
    <VideoContainer>
      <VideoTitle>{video.titulo}</VideoTitle>
      <CloseButton onClick={() => navigate(-1)}>X</CloseButton>
      <VideoPlayer>
        <iframe
          src={embedLink}
          title={video.titulo}
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        ></iframe>
      </VideoPlayer>
    </VideoContainer>
  );
}
