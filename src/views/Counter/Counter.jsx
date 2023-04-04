import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../constants/style-constants";
import ComponentButton from "../../components/ComponentButton";
import ComponentBackToHome from "../../components/ComponentBackToHome";

const ContainerCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .section-buttons {
    display: flex;
    column-gap: 1em;
  }
`;

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <ComponentBackToHome />
      <Container>
        <h1>Bienvenido al contador</h1>
        <p>Incrementa o decrementa el valor con ayuda de los botones</p>
        <ContainerCounter>
          <h2>{counter}</h2>
          <div className="section-buttons">
            <ComponentButton
              type="primary"
              text="Decrementa"
              onClick={() => {
                if (counter > 0) {
                  setCounter(counter - 1);
                }
              }}
            />
            <ComponentButton
              type="secondary"
              text="Incrementa"
              onClick={() => {
                setCounter(counter + 1);
              }}
            />
          </div>
        </ContainerCounter>
      </Container>
    </div>
  );
};

export default Counter;
