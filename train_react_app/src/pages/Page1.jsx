import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

export default function Page1() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setAuthenticated(true);
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="page1">
      <h1 className="text-4xl font-bold"> DashBoard </h1>
      <Dashboard />
    </div>
  );
}
