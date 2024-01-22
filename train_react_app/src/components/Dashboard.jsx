import React, { useState, useRef } from "react";
import "../styles/dashboard.css";

const Dashboard = (props) => {
  function DragAndDropImageUploader() {
    const [images, setImages] = useState([]);
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
            },
          ]);
          
        }
      }
    }

    function uploadImage() {
        props.postImage(images)
        console.log(images);
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
            </div>
          ))}
        </div>
        <button type="button" onClick={uploadImage}>
          Upload
        </button>
        <div></div>
      </div>
    );
  }
  return (
    <div className="dashboardWrapper" style={{ color: "black" }}>
      <div className="description_Wrap">
        <div className="myAvatar">
          <h2>Prénom</h2>
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSuPA7P-_Nkehuys3wB6sS3FAdBWdhU8azhGUy6SgIDlnaHnz8OfEFqPtH-Vab8azCkavt_lIfYXgGffcN4bVRs6QtmGQRMM1ydi60f-4wIHikKIlxQgR-M4iJI6ta5lZTxgNuwY14M0g&usqp=CAc"
            alt="myAvatar"
          />
          <p>Inscrit le : </p> 19/01/2024
        </div>
        <div className="description">
          <form>
            <label htmlFor="age">
              <h2>Age </h2>
            </label>
            <input style={{ width: "40px" }} id="age" type="number" />
            <label htmlFor="hobbies">
              <h2> Hobbies</h2>
            </label>
            <input style={{ width: "auto" }} id="hobbies" type="text" />
          </form>
        </div>
      </div>
      <label>
        <h2>Gallerie Photos</h2>
      </label>
      <DragAndDropImageUploader />
      <img
        src="https://youmatter.world/app/uploads/sites/3/2016/05/Vacances-productivite.jpg"
        alt="myAvatar"
      />
    </div>
  );
};

export default Dashboard;
