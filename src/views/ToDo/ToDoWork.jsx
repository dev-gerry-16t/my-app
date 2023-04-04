import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import ComponentBackToHome from "../../components/ComponentBackToHome";
import { Container } from "../../constants/style-constants";
import ComponentButton from "../../components/ComponentButton";
import ComponentTasks from "../../components/ComponentTasks";

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
      padding: 10px;
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
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [infoTask, setInfoTask] = useState(initialStateTask);
  const [detailTask, setDetailTask] = useState(initialStateTask);

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
            placeholder="Ingresa una descripción de la tarea"
          />
        </ContainerModal>
      </Modal>
      <Modal
        title="Detalle Tarea"
        open={isOpenModalDetail}
        onOk={() => {
          setIsOpenModalDetail(false);
        }}
        onCancel={() => {
          setIsOpenModalDetail(false);
        }}
      >
        <div>
          <strong>{detailTask.name}</strong>
          <p>{detailTask.description}</p>
        </div>
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
        <ComponentTasks
          componentRender={
            <ComponentButton
              type="primary"
              text="Agrega Tarea"
              onClick={() => {
                setIsOpenModal(true);
              }}
            />
          }
          titleSection="Tareas por hacer"
          titleSectionEmpty="No tienes tareas por hacer "
          task={task}
          type="task"
          handlerTaskComplete={(row) => {
            halderTaskComplete(row);
          }}
          handlerDeleteTask={(row) => {
            handleDeleteTask(row);
          }}
          onClickDetail={(row) => {
            setIsOpenModalDetail(true);
            setDetailTask(row);
          }}
        />
        <ComponentTasks
          componentRender={null}
          titleSection="Tareas completadas"
          titleSectionEmpty="No tienes tareas completadas"
          task={taskComplete}
          type="task"
          isVisiblePrimaryButton={false}
          handlerTaskComplete={(row) => {}}
          handlerDeleteTask={(row) => {
            handleDeleteTaskComplete(row);
          }}
          onClickDetail={(row) => {
            setIsOpenModalDetail(true);
            setDetailTask(row);
          }}
        />
      </ContainerWorks>
    </div>
  );
};

export default ToDo;
