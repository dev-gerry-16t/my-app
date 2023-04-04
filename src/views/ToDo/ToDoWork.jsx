import React, { useEffect, useState } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { Modal } from "antd";
import ComponentBackToHome from "../../components/ComponentBackToHome";
import { Container } from "../../constants/style-constants";
import ComponentButton from "../../components/ComponentButton";

const CardTask = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .buttons-section {
    display: flex;
    column-gap: 5px;
  }
`;

const ContainerWorks = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
  padding: 5px;
  .work-content {
    .card-content {
      display: flex;
      flex-direction: column;
      row-gap: 1em;
      min-height: 5vh;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 1em;
      padding: 2px 10px;
    }
  }
`;

const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const ToDo = () => {
  const initialStateTask = {
    id: null,
    name: "",
    description: "",
  };
  const [task, setTask] = useState([]);
  const [taskComplete, setTaskComplete] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [infoTask, setInfoTask] = useState(initialStateTask);

  const halderTaskComplete = (row) => {
    const newArrayComplete = taskComplete;
    newArrayComplete.push(row);
    setTaskComplete(newArrayComplete);
    const cleanArrayTask = task.filter((rowFilter) => {
      return rowFilter.id !== row.id;
    });
    setTask(cleanArrayTask);
  };

  const handleDeleteTask = (row) => {
    const cleanArrayTask = task.filter((rowFilter) => {
      return rowFilter.id !== row.id;
    });

    setTask(cleanArrayTask);
  };

  const handleDeleteTaskComplete = (row) => {
    const cleanArrayTask = taskComplete.filter((rowFilter) => {
        return rowFilter.id !== row.id;
      });
  
      setTaskComplete(cleanArrayTask);
  };

  return (
    <div>
      <ComponentBackToHome />
      <Modal
        title="Agrega Tarea"
        open={isOpenModal}
        onOk={() => {
          const taskToDo = { ...infoTask, id: crypto.randomUUID() };
          const arrayTasks = task;
          arrayTasks.push(taskToDo);
          setInfoTask(initialStateTask);
          setIsOpenModal(false);
          setTask(arrayTasks);
        }}
        onCancel={() => {
          setIsOpenModal(false);
          setInfoTask(initialStateTask);
        }}
      >
        <ContainerModal>
          <input
            type="text"
            placeholder="Ingresa el nombre de la tarea"
            value={infoTask.name}
            onChange={(e) => {
              const value = e.target.value;
              setInfoTask({ ...infoTask, name: value });
            }}
          />
          <textarea
            value={infoTask.description}
            onChange={(e) => {
              const value = e.target.value;
              setInfoTask({ ...infoTask, description: value });
            }}
            placeholder="Ingresa un descripción de la tarea"
          />
        </ContainerModal>
      </Modal>
      <Container>
        <h1>Bienvenido al ejercicio To-Do</h1>
        <p>Agrega tareas, marca como completadas y elimina tareas</p>
      </Container>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <ComponentButton
          type="primary"
          text="Agregar Tarea"
          onClick={() => {
            setIsOpenModal(true);
          }}
        />
      </div>
      <ContainerWorks>
        <div className="work-content">
          <h3>Tareas por hacer</h3>
          <div className="card-content">
            {isEmpty(task) === true && (
              <p
                style={{
                  textAlign: "center",
                }}
              >
                No tienes tareas por hacer <br />
                <ComponentButton
                  type="primary"
                  text="Agrega Tarea"
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                />
              </p>
            )}
            {isEmpty(task) === false &&
              task.map((row, ix) => {
                return (
                  <CardTask key={`task-${ix}`}>
                    <div>
                      <strong>Nombre de la tarea:</strong>{" "}
                      <span>{row.name}</span>
                    </div>
                    <div className="buttons-section">
                      <ComponentButton
                        type="primary"
                        text="Completada"
                        onClick={() => {
                          halderTaskComplete(row);
                        }}
                      />
                      <ComponentButton
                        type="secondary"
                        text="Eliminar"
                        onClick={() => {
                          handleDeleteTask(row);
                        }}
                      />
                    </div>
                  </CardTask>
                );
              })}
          </div>
        </div>
        <div className="work-content">
          <h3>Tareas completadas</h3>
          <div className="card-content">
            {isEmpty(taskComplete) === true && (
              <p
                style={{
                  textAlign: "center",
                }}
              >
                No tienes tareas completadas
              </p>
            )}

            {isEmpty(taskComplete) === false &&
              taskComplete.map((row, ix) => {
                return (
                  <CardTask key={`complete-${ix}`}>
                    <div>
                      <strong> Nombre de la tarea:</strong>{" "}
                      <span>{row.name}</span>
                    </div>
                    <div className="buttons-section">
                      <ComponentButton type="secondary" text="Eliminar" onClick={()=>{
                        handleDeleteTaskComplete(row);
                      }}/>
                    </div>
                  </CardTask>
                );
              })}
          </div>
        </div>
      </ContainerWorks>
    </div>
  );
};

export default ToDo;
