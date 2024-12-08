import styled from "styled-components";
import { Carrucel } from "../Carrucel";
import { Boton, ContenidoParcial } from "../UI/Estilos";

const ArtistaGrupo = styled.section`
`;

const Contenido = styled(ContenidoParcial)`
  padding: 2rem 0;
`;

const Cabecera = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.texto};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImagenArtista = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ color }) => color || "#fff"};
`;

export function Artista({ artista }) {
  const { nombre, imagenUrl, color, id } = artista;

  return (
    <ArtistaGrupo>
      <Contenido>
        <Cabecera>
          <ImagenArtista 
            src={imagenUrl || "https://via.placeholder.com/50"} 
            alt={`Imagen de ${nombre}`} 
            color={color} 
          />
          <Boton color={color}>{nombre}</Boton>
        </Cabecera>
        <Carrucel artista_id={id} color={color} />
      </Contenido>
    </ArtistaGrupo>
  );
}
