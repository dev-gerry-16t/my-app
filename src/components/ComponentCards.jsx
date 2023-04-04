import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.5s ease;

  h1{
    font-size: 1.5em;
  }
  &:hover {
    background: var(--hover-color-button);
    color:var(--hover-color-font);
  }
`;

const ComponentCards = ({ navigateTo, title }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/${navigateTo}`);
      }}
    >
      <h1>{title}</h1>
    </Card>
  );
};

export default ComponentCards;
