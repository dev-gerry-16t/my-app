import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import axios from "axios";
import styled from "styled-components";
import { Modal, Tooltip } from "antd";
import ComponentBackToHome from "../../components/ComponentBackToHome";
import { Container } from "../../constants/style-constants";
import { X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from "../../constants/keys";

const ContainerPlayer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap:1em;

  .info-player {
    display: flex;
    column-gap: 1em;
    .tooltip-content {
      background: var(--button-primary);
      color: #fff;
      border-radius:5px;
      padding:2px;
    }
  }
`;

const ContainerTeamsCards = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-rows: 22rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;

const CardTeam = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 1em;
  overflow-y: hidden;
  cursor: pointer;

  .info-team {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .info-team::-webkit-scrollbar {
    display: none;
  }
  .nick-name-team {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 70px;
      height: 70px;
    }
  }
`;

const APINBA = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [dataTeam, setDataTeam] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const renderComponentLeague = (objectLeague) => {
    const arrayLeagues = [];
    for (const key in objectLeague) {
      const dataLeague = objectLeague[key];
      arrayLeagues.push({
        league: key,
        conference: dataLeague.conference,
        division: dataLeague.division,
      });
    }

    return (
      <div className="leagues-list">
        <ul>
          {arrayLeagues.map((row) => {
            return (
              <li>
                {row.league}
                <ul>
                  <li>Conferencia: {row.conference}</li>
                  <li>División: {row.division}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const handlerGetInfoTeams = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/teams",
        headers: {
          "X-RapidAPI-Key": X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": X_RAPIDAPI_HOST,
        },
      });
      const responseResult = await response.data.response;
      setTeams(responseResult);
    } catch (error) {}
  };

  const handlerGetPlayer = async (id) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/players",
        params: { team: id, season: "2021" },
        headers: {
          "X-RapidAPI-Key": X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": X_RAPIDAPI_HOST,
        },
      });
      const responseResult = await response.data.response;
      setPlayers(responseResult);
      setIsOpenModal(true);
    } catch (error) {}
  };

  useEffect(() => {
    handlerGetInfoTeams();
  }, []);

  return (
    <div>
      <ComponentBackToHome />
      <Modal
        title={`Jugadores de ${dataTeam.name}`}
        open={isOpenModal}
        onOk={() => {
          setIsOpenModal(false);
        }}
        onCancel={() => {
          setIsOpenModal(false);
        }}
      >
        <ContainerPlayer>
          {players.map((row, ix) => {
            return (
              <div className="info-player" key={`player-${ix}`}>
                <span>{`${row.firstname} ${row.lastname}`}</span>
                <Tooltip
                  title={
                    <div>
                      Nacimiento {row.birth.date} {row.birth.country} <br />
                      Afiliación {row.affiliation}
                      <br />
                      Colegio {row.college}
                    </div>
                  }
                >
                  <span className="tooltip-content">Más info</span>
                </Tooltip>
              </div>
            );
          })}
        </ContainerPlayer>
      </Modal>
      <Container>
        <h1>Bienvenido al ejercicio API-NBA</h1>
        <p>
          Puedes ver los equipos de la NBA y los jugadores del equipo
          seleccionado
        </p>
      </Container>
      <ContainerTeamsCards>
        {isEmpty(teams) === false &&
          teams.map((row, ix) => {
            return (
              <CardTeam
                key={`cardsteams-${ix}`}
                onClick={() => {
                  handlerGetPlayer(row.id);
                  setDataTeam(row);
                }}
              >
                <div className="logo">
                  <img
                    src={
                      isNil(row.logo) === false
                        ? row.logo
                        : "https://graffica.info/wp-content/uploads/2017/08/NBA-logo-png-download-free-1200x675.png"
                    }
                    alt=""
                    srcset=""
                  />
                </div>
                <div className="nick-name-team">
                  <h3>{row.nickname}</h3>
                </div>
                <div className="info-team">
                  <span>Nombre: {row.name}</span>
                  <span>Ciudad: {row.city}</span>
                  <span>AllStar: {row.allStar === true ? "Si" : "No"}</span>
                  <h3>Ligas</h3>
                  {renderComponentLeague(row.leagues)}
                </div>
              </CardTeam>
            );
          })}
      </ContainerTeamsCards>
    </div>
  );
};

export default APINBA;
