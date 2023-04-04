import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import ComponentBackToHome from "../../components/ComponentBackToHome";
import { Container } from "../../constants/style-constants";
import styled from "styled-components";
import ComponentButton from "../../components/ComponentButton";

const ContanerImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .carousel-img {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 1em;
    row-gap: 1em;
    img {
      width: 100px;
    }
  }

  .section-buttons {
    margin-top: 1em;
    display: flex;
    column-gap: 1em;
  }

  .border-image {
    width: 600px;
    height: 400px;
    border: 1px solid #000;
    margin: 2em 0px;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    .image-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
`;

const ImgContainer = styled.img`
  cursor: pointer;
  border: ${(props) =>
    props.isSelect === true ? "3px solid var(--button-primary)" : "none"};
`;

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [selectImage, setSelectImage] = useState({});
  const [counter, setCounter] = useState(0);

  const handlerGetImages = async () => {
    try {
      const response = await fetch(
        "https://api.pexels.com/v1/search?query=nature&per_page=10",
        {
          headers: {
            Authorization:
              "etXPhOLZmRCdgXSsnl97N9kdP3ydzBJ5uC7vyfcrmdJ66LsO7Ou2qRQh",
          },
        }
      );
      const responseResult = await response.json();
      const insertIdToResult = responseResult.photos.map((row, index) => {
        return { ...row, idReference: index };
      });
      
      setImages(insertIdToResult);
      setSelectImage(insertIdToResult[0]);
    } catch (error) {}
  };

  useEffect(() => {
    handlerGetImages();
  }, []);

  return (
    <div>
      <ComponentBackToHome />
      <Container>
        <h1>Bienvenido al carousel de imagenes</h1>
        <p>Da click en boton siguiente o anterior</p>
        <ContanerImage>
          <div className="border-image">
            {isEmpty(selectImage) === false ? (
              <img src={selectImage.src.original} alt="" srcset="" />
            ) : (
              <div className="image-empty">Selecciona una imagen</div>
            )}
          </div>
          <div className="carousel-img">
            {images.map((row, ix) => {
              return (
                <ImgContainer
                  onClick={() => {
                    setSelectImage(row);
                    setCounter(ix);
                  }}
                  isSelect={selectImage.idReference === row.idReference}
                  src={row.src.tiny}
                  alt=""
                  srcset=""
                />
              );
            })}
          </div>
          <div className="section-buttons">
            <ComponentButton
              type="primary"
              text="Anterior"
              onClick={() => {
                const nextCounter = counter - 1;
                if (nextCounter >= 0) {
                  const nextImage = images.find((row) => {
                    return row.idReference === nextCounter;
                  });
                  setSelectImage(nextImage);
                  setCounter(nextCounter);
                } else {
                  const nextImage = images.find((row) => {
                    return row.idReference === images.length - 1;
                  });
                  setSelectImage(nextImage);
                  setCounter(images.length - 1);
                }
              }}
            />
            <ComponentButton
              type="secondary"
              text="Siguiente"
              onClick={() => {
                if (counter < images.length - 1) {
                  const nextCounter = counter + 1;
                  const nextImage = images.find((row) => {
                    return row.idReference === nextCounter;
                  });
                  setSelectImage(nextImage);
                  setCounter(nextCounter);
                } else {
                  setSelectImage(images[0]);
                  setCounter(0);
                }
              }}
            />
          </div>
        </ContanerImage>
      </Container>
    </div>
  );
};

export default ImageCarousel;
