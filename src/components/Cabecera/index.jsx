import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Logo } from "../UI/Estilos";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import perfil from "../../assets/img/perfil.jpg"; 

const Header = styled.header`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.oscuro};
  border-bottom: solid 1px ${({ theme }) => theme.primero};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderContenido = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const HeaderGrupoIzquierda = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const HeaderGrupoDerecha = styled.div`
  position: relative;
`;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover img {
    transform: scale(1.1);
  }
`;

const HeaderLogo = styled(Logo)`
  height: 40px;
  transition: transform 0.2s ease-in-out;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.oscuro};
    padding: 1rem;
    z-index: 1100;
  }
`;

const NavItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primero};
  }
`;

const PerfilIcono = styled.img`
  width: 35px;
  height: 35px;
  box-shadow: 1px 1px 1px black;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PerfilMenu = styled.div`
  position: absolute;
  top: 43px;
  right: 0;
  background-color: ${({ theme }) => theme.oscuro};
  width: 11rem;
  padding: 0.5rem;
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 1100;

  a {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.segundo};
    }
  }
`;

const HamburgerButton = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 30px;
  width: 30px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  div {
    height: 4px;
    background-color: #fff;
    border-radius: 5px;
  }
`;

export function Cabecera() {
  const [perfilMenuVisible, setPerfilMenuVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const perfilRef = useRef(null);

  // Función para alternar la visibilidad del menú de perfil
  const togglePerfilMenu = () => {
    setPerfilMenuVisible(!perfilMenuVisible);
  };

  // Función para alternar la visibilidad del menú en móviles
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Cierra el menú al hacer clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);  // Cierra el menú
    }
    if (perfilRef.current && !perfilRef.current.contains(event.target)) {
      setPerfilMenuVisible(false);  // Cierra el menú de perfil
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Header>
      <HeaderContenido>
        {/* Grupo izquierdo con el logo y las opciones */}
        <HeaderGrupoIzquierda>
          <HeaderLink to="/">
            <HeaderLogo src={logo} alt="Logo" />
          </HeaderLink>
          <HamburgerButton onClick={toggleMenu}>
            <div />
            <div />
            <div />
          </HamburgerButton>
          <NavMenu ref={menuRef} isOpen={menuOpen}>
            <NavItem to="/videoList">Videos</NavItem>
            <NavItem to="/artistaList">Artistas</NavItem>
          </NavMenu>
        </HeaderGrupoIzquierda>

        {/* Grupo derecho con el icono de perfil */}
        <HeaderGrupoDerecha>
          <PerfilIcono ref={perfilRef} src={perfil} alt="Perfil" onClick={togglePerfilMenu} />
          <PerfilMenu ref={perfilRef} visible={perfilMenuVisible}>
            <Link to="/video">Nuevo Video</Link>
            <Link to="/artista">Nuevo Artista</Link>
          </PerfilMenu>
        </HeaderGrupoDerecha>
      </HeaderContenido>
    </Header>
  );
}
