import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background: ${(props) =>
    props.type === "primary"
      ? "var(--button-primary)"
      : "var(--button-secondary)"};
  color: #fff;
  padding: 1em;
  border-radius: 0.8em;
  cursor:pointer;
`;

const ComponentButton = (props) => {
  const { onClick = () => {}, text = "default", type = "primary" } = props;

  return (
    <Button type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ComponentButton;
