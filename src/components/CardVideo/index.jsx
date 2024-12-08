import { useNavigate } from "react-router-dom";
import { Imagen } from "../UI/Estilos";
import styled from "styled-components";

const CardVideoWrapper = styled.div`
  cursor: pointer;
`;

const CarrucelImagen = styled(Imagen)`
  border: 1px solid ${({ color }) => color};
  box-sizing: border-box;
`;

export function CardVideo({ src, color, videoId }) {
  const navigate = useNavigate(); // Hook para la navegación

  const handleClick = () => {
    navigate(`/videoView/${videoId}`); // Redirige al componente con la información del video
  };

  return (
    <CardVideoWrapper onClick={handleClick}>
      <CarrucelImagen src={src} color={color} />
    </CardVideoWrapper>
  );
}
