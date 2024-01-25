import React, { useState, useRef, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";

const Dashboard = (props) => {

const [imagesData, setImagesData] = useState([])
const [images, setImages] = useState([]);

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
                formData.append('file', img.file);
              });
          
            axios.post('http://localhost:8800/upload', formData)
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.error('Error uploading image', error);
              });

               props.postImage(images)
               console.log(images);
               setImages([])
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
          Upload
        </button>
        <div></div>
      </div>
    );
  }

useEffect (()=> {
    const loadImages = async () => {
        try {
            console.log("Avant l'appel à loadImages");
            const response = await axios.get("http://localhost:8800/getImages");
            console.log(response.data.images[0].name)
            setImagesData(response.data.images)
            console.log("Après l'appel à loadImages");
            
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des images",
          error
        );
      }
    }
    loadImages()
}, [])

  
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
      {imagesData.map((image, index)=>(
        <div key={index}>
            <p> {image.name}</p>
        </div>
      ))}
     
    </div>
  );
};

export default Dashboard;
