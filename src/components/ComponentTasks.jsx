import React from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import ComponentButton from "./ComponentButton";

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

  .detail-task {
    cursor: pointer;
  }
`;

const ComponentTasks = (props) => {
  const {
    componentRender = null,
    titleSection = "",
    titleSectionEmpty = "",
    task = [],
    type = "",
    handlerTaskComplete = () => {},
    handlerDeleteTask = () => {},
    isVisiblePrimaryButton = true,
    onClickDetail = () => {},
  } = props;

  return (
    <div className="work-content">
      <h3>{titleSection}</h3>
      <div className="card-content">
        {isEmpty(task) === true && (
          <p
            style={{
              textAlign: "center",
            }}
          >
            {titleSectionEmpty} <br />
            {componentRender}
          </p>
        )}
        {isEmpty(task) === false &&
          task.map((row, ix) => {
            return (
              <CardTask key={`${type}-${ix}`}>
                <div
                  className="detail-task"
                  onClick={() => {
                    onClickDetail(row);
                  }}
                >
                  <strong>{row.name}</strong>
                </div>
                <div className="buttons-section">
                  {isVisiblePrimaryButton === true && (
                    <ComponentButton
                      type="primary"
                      text="Completada"
                      onClick={() => {
                        handlerTaskComplete(row);
                      }}
                    />
                  )}
                  <ComponentButton
                    type="secondary"
                    text="Eliminar"
                    onClick={() => {
                      handlerDeleteTask(row);
                    }}
                  />
                </div>
              </CardTask>
            );
          })}
      </div>
    </div>
  );
};

export default ComponentTasks;
