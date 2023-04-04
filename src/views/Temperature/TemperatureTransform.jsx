import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "../../constants/style-constants";
import ComponentBackToHome from "../../components/ComponentBackToHome";

const SectionTransform = styled.div`
  display: flex;
  column-gap: 1em;

  .component-transform{
    display:flex;
    flex-direction:column;
  }
`;

const TemperatureTransform = () => {
  const [celsius, setCelsius] = useState(0);
  const [farenheit, setFarenheit] = useState(0);

  const hanlderFarenheitToCelcius = (temp) => {
    const cel = ((temp - 32) * 5) / 9;
    setCelsius(cel);
  };

  const handlerCelsiusToFarenheit = (temp) => {
    const far = (temp * 9) / 5 + 32;
    setFarenheit(far);
  };

  return (
    <div>
      <ComponentBackToHome />
      <Container>
        <h1>Bienvenido al conversor de temperatura</h1>
        <p>Ingresa el valor en Celsius o Farenheit</p>
        <SectionTransform>
          <div className="component-transform">
            <label htmlFor="celsius">Ingresa el valor en Celsius</label>
            <input
              id="celsius"
              min={-1000}
              value={celsius}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                setCelsius(value);
                handlerCelsiusToFarenheit(value);
              }}
            />
          </div>
          <div className="component-transform">
            <label htmlFor="farenheit">Ingresa el valor en Farenheit</label>
            <input
              id="farenheit"
              value={farenheit}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                setFarenheit(value);
                hanlderFarenheitToCelcius(value);
              }}
            />
          </div>
        </SectionTransform>
      </Container>
    </div>
  );
};

export default TemperatureTransform;
