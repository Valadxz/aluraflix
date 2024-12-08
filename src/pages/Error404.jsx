import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import errorImage from '../../src/assets/img/file.png'; 

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.oscuro};
  color: ${({ theme }) => theme.texto};
  text-align: center;
  padding: 2rem;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ErrorImage = styled.img`
  height: 200px;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  background-color: ${({ theme }) => theme.primero};
  padding: 0.8rem 1.6rem;
  font-size: 1.2rem;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.segundo};
  }
`;

export function Error404() {
  return (
    <ErrorContainer>
      <ErrorTitle>¡Vaya! Página no encontrada</ErrorTitle>
      <ErrorImage src={errorImage} alt="Error 404" />
      <ErrorMessage>La página que estás buscando no existe o ha sido movida.</ErrorMessage>
      <BackButton to="/">Volver al inicio</BackButton>
    </ErrorContainer>
  );
}
