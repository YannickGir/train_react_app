import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import axios from 'axios';
export default function Page1() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setAuthenticated(true);
    } else {
      navigate("/home");
    }
  }, [navigate]);

  const postImage = async (image) => {
    try {
        const response = await axios.post(
            'http://localhost:8800/sendImage',
            { images: image }
          );
          
      setGallery(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météorologiques :",
        error
      );
    }
  };

  return (
    <div className="page1">
      <h1 className="text-4xl font-bold"> DashBoard </h1>
      <Dashboard postImage={postImage}/>
    </div>
  );
}
