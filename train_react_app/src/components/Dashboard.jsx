import React, { useState, useRef, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AvatarUploader from "./AvatarUploader";

const Dashboard = (props) => {
  const [imagesData, setImagesData] = useState([]);
  const [images, setImages] = useState([]);
  const [avatar, setAvatar]=useState([]);

  const fileInputRefAvatar = useRef(null);
  function selectFileAvatar() {
    fileInputRefAvatar.current.click();
  }

  const postAvatar = async (image) => {
    try {
      const response = await axios.post("http://localhost:8800/sendAvatar", {
        images: image,
      });
      
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météorologiques :",
        error
      );
    }
  };
  

  function uploadAvatar() {
    const formData = new FormData();
   
      console.log(avatar.file);
      formData.append("file", avatar.file);
    

    axios
      .post("http://localhost:8800/upload", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });

    postAvatar(avatar);
    console.log(avatar);
    setAvatar({});
    window.location.reload();
  }

  function onFileSelectAvatar(event) {
    if (!event.target || !event.target.files || event.target.files.length === 0) return;

  const file = event.target.files[0];
    if (file === null) return;
    
    //   if (file[i].type.split("/")[0] !== "image") continue;
    if (!avatar || avatar.name !== file.name) {
        setAvatar(
          {
            name: file.name,
            file: file,
            url: URL.createObjectURL(file),
          },
        );
        }
  }


  function DragAndDropImageUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    function selectFiles() {
      fileInputRef.current.click();
    }
    function onFileSelect(event) {
      const files = event.target.files;
      if (files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!images.some((e) => e.name === files[i].name)) {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              file: files[i],
              url: URL.createObjectURL(files[i]),
            },
          ]);
        }
      }
    }

    function deleteImage(index) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    function onDragOver(event) {
      event.preventDefault();
      setIsDragging(true);
      event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
      event.preventDefault();
      setIsDragging(false);
    }

    function onDrop(event) {
      event.preventDefault();
      setIsDragging(false);
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!images.some((e) => e.name === files[i].name)) {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
              path: files[i].path,
            },
          ]);
        }
      }
    }

    function uploadImage() {
      const formData = new FormData();
      images.forEach((img) => {
        console.log(img.file);
        formData.append("file", img.file);
      });

      axios
        .post("http://localhost:8800/upload", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });

      props.postImage(images);
      console.log(images);
      setImages([]);
      window.location.reload();
    }

    // const handleImageSend = async (name, email) => {
    //     try {

    return (
      <div className="card">
        <div className="top">
          <p>Ajout d'une image</p>
        </div>
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDragging ? (
            <span>Glissez l'image ici</span>
          ) : (
            <>
              Sélectionnez et glissez l'image ici ou {""}
              <span className="select" role="button" onClick={selectFiles}>
                Parcourir
              </span>
            </>
          )}
          <input
            name="file"
            type="file"
            className="file"
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          />
        </div>
        <div className="container">
          {images.map((images, index) => (
            <div className="image" key={index}>
              <span className="delete" onClick={() => deleteImage(index)}>
                &times;
              </span>
              <img src={images.url} alt={images.name} />
              <p>chemin : {images.path}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={uploadImage}>
          Choisir une image
        </button>
        <div></div>
      </div>
    );
  }

  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log("Avant l'appel à loadImages");
        const response = await axios.get("http://localhost:8800/getImages");
        console.log(response.data.images[0].name);
        setImagesData(response.data.images);
        console.log("Après l'appel à loadImages");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des images",
          error
        );
      }
    };
    loadImages();
  }, []);

  const handleDeleteImage = async (e) => {
    try {
      let imageToDelete = imagesData[e];
      console.log("image à supprimer:" + imageToDelete.name);
      await axios.post("http://localhost:8800/deleteImage", { imageToDelete });
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error);
    }
  };

  const CARDS = 10;
  const MAX_VISIBILITY = 3;

  const Card = ({ title, content }) => (
    <div className="card_gallery">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );

  const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);

    return (
      <div className="carousel">
        {active > 0 && (
          <button className="nav left" onClick={() => setActive((i) => i - 1)}>
            <FaChevronLeft />
          </button>
        )}
        {React.Children.map(children, (child, i) => (
          <div
            className="card-container"
            style={{
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              "pointerEvents": active === i ? "auto" : "none",
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            }}
          >
            {child}
          </div>
        ))}
        {active < count - 1 && (
          <button className="nav right" onClick={() => setActive((i) => i + 1)}>
            <FaChevronRight />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="dashboardWrapper" style={{ color: "black" }}>
      <div className="description_Wrap">
        <div className="myAvatar">
          <h2>Prénom</h2>
          <AvatarUploader/>
          {/* <>
            Sélectionnez et glissez l'image ici ou {""}
            <span className="select" role="button" onClick={selectFileAvatar}>
              Parcourir
            </span>
            <input
            name="file"
            type="file"
            className="file"
            multiple
            ref={fileInputRefAvatar}
            onChange={onFileSelectAvatar}
          />
          </>
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSuPA7P-_Nkehuys3wB6sS3FAdBWdhU8azhGUy6SgIDlnaHnz8OfEFqPtH-Vab8azCkavt_lIfYXgGffcN4bVRs6QtmGQRMM1ydi60f-4wIHikKIlxQgR-M4iJI6ta5lZTxgNuwY14M0g&usqp=CAc"
            alt="myAvatar"
          />
          <button type="button" onClick={uploadAvatar}>
          Upload
        </button> */}
          <p>Inscrit le : </p> 19/01/2024
        </div>
        <div className="description">
          <form>
            <label htmlFor="age">
              <h3>Age </h3>
            </label>
            <input style={{ width: "40px" }} id="age" type="number" />
            <label htmlFor="hobbies">
              <h3> Hobbies</h3>
            </label>
            <input style={{ width: "auto" }} id="hobbies" type="text" />
          </form>
        </div>
      </div>
      <label>
        <h3>Gallerie Photos</h3>
      </label>
      <DragAndDropImageUploader />
      <div className="gallery-wrapper">
        <Carousel>
          {imagesData.map((image, index) => {
            let link = `/uploads/${image.name}`;
            let content = (
              <img className="imageCarousel" src={link} alt="imagegallery" />
            );
            return (
              <div key={index}>
                <Card title={image.name} content={content} />
                {/* <p> {image.name}</p>
            <img src={link} alt="imagegallery"/> */}
                <button key={index} onClick={() => handleDeleteImage(index)}>
                  Supprimer
                </button>
              </div>
            );
          })}
        </Carousel>
      </div>

      {/* <div className="gallery-wrapper">
                    <Carousel>
                    {[...new Array(CARDS)].map((_, i) => (
                        <Card title={'Card ' + (i + 1)} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>
                    ))}
                    </Carousel>
                </div> */}
    </div>
  );
};

export default Dashboard;