import React from "react";
import styled from "styled-components";
import ComponentCards from "../../components/ComponentCards";
import { Container } from "../../constants/style-constants";

const ContainerCards = styled.div`
  display: flex;
  column-gap: 0.8em;
  margin-top: 0.8em;
`;

const Home = () => {
  return (
    <div>
      <Container>
        <h1>Bienvenido a mi test</h1>
        <p>Elige la Opción que deseas evaluar</p>
        <ContainerCards>
          <ComponentCards navigateTo="contador" title="Counter" />
          <ComponentCards
            navigateTo="temperatura"
            title="TemperatureConverter"
          />
          <ComponentCards navigateTo="carousel" title="ImageCarousel" />
          <ComponentCards navigateTo="tareas" title="To-Do" />
        </ContainerCards>
      </Container>
    </div>
  );
};

export default Home;
