import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UseSessionExpiration = ({ children }) => {
  const [lastActivity, setLastActivity] = useState(new Date());
  const navigate = useNavigate();

  const handleActivity = () => {
    setLastActivity(new Date());
  };

  const handleLogout = () => {
    try {
      const userSession = localStorage.getItem('userSession');
      if (userSession) {
        localStorage.removeItem('userSession');
        navigate('/');
      } else {
        console.error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  useEffect(() => {
    const handleInactive = () => {
      const currentTime = new Date();
      const inactiveTime = currentTime - lastActivity;
      const expirationTime = 10 * 1000;

      if (inactiveTime > expirationTime) {
        handleLogout();
      }
    };

    // Set up event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Set up interval to check for inactivity
    const intervalId = setInterval(handleInactive, 1000);

    // Clean up event listeners and interval on component unmount
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(intervalId);
    };
  }, [lastActivity, navigate, handleLogout]);

  return <div>{children}</div>;
};

export default UseSessionExpiration;
