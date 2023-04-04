import React from "react";
import styled from "styled-components";
import ComponentCards from "../../components/ComponentCards";
import { Container } from "../../constants/style-constants";
import RoutesPages from "../../constants/pages";

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
          {RoutesPages.map((row, ix) => {
            return (
              <ComponentCards
                key={`cards-${ix}`}
                navigateTo={row.path}
                title={row.title}
              />
            );
          })}
        </ContainerCards>
      </Container>
    </div>
  );
};

export default Home;
