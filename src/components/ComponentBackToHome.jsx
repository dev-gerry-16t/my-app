import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Back = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1em;
  cursor: pointer;
  position: fixed;
  top: 0px;
  left: 0px;
`;

const ComponentBackToHome = () => {
  const navigate = useNavigate();

  return (
    <Back
      onClick={() => {
        navigate("/");
      }}
    >
      <svg
        height="50px"
        width="50px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 483.563 483.563"
        xmlSpace="preserve"
      >
        <g>
          <polygon
            style={{ fill: "#2488FF" }}
            points="483.563,221.781 148.61,221.781 148.61,93.171 0,241.781 148.61,241.781 148.61,261.781 
            483.563,261.781 	"
          />
          <polygon
            style={{ fill: "#005ECE" }}
            points="0,241.781 148.61,390.392 148.61,241.781 	"
          />
        </g>
      </svg>
      <div>Regresar</div>
    </Back>
  );
};

export default ComponentBackToHome;
