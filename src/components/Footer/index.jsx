import styled from "styled-components";
import { ContenidoParcial } from "../UI/Estilos";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"; // Importando íconos

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.oscuro};
  padding: 4rem 0;
  border-top: 1px solid ${({ theme }) => theme.primero};
  font-size: 1rem;
  position: relative;
  z-index: 1000;
`;

const FooterContenido = styled(ContenidoParcial)`
  text-align: center;
  color: ${({ theme }) => theme.texto};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const LinkExterno = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.primero};
  font-weight: 700;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.segundo};
  }
`;

const Derechos = styled.p`
  color: ${({ theme }) => theme.texto};
  font-size: 0.9rem;
`;

const RedesSociales = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const IconoRedSocial = styled.a`
  color: ${({ theme }) => theme.texto};
  font-size: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primero};
  }
`;

export function PieDePagina() {
  const currentYear = new Date().getFullYear();

  return (
    <Footer>
      <FooterContenido>
        <Derechos>&copy; {currentYear}. Desarrollado por <LinkExterno href="https://valadxz.tech" target="__blank">Juan Felipe Valadez</LinkExterno></Derechos>
        
        <RedesSociales>
          <IconoRedSocial href="https://github.com/valadxz" target="_blank"><FaGithub /></IconoRedSocial>
          <IconoRedSocial href="https://instagram.com/vxladez" target="_blank"><FaInstagram /></IconoRedSocial>
          <IconoRedSocial href="https://linkedin.com/in/valadz/" target="_blank"><FaLinkedin /></IconoRedSocial>
        </RedesSociales>
      </FooterContenido>
    </Footer>
  );
}
