import React, { useState } from 'react';

const AvatarUploader = ({ userId, currentAvatar }) => {
  const [avatar, setAvatar] = useState(currentAvatar);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Envoyer le fichier au serveur
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);

        // Remplacez 'YOUR_BACKEND_ENDPOINT' par l'URL de votre endpoint backend
        const response = await fetch('http://localhost:8800/sendAvatar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Mise à jour de l'avatar après le téléchargement réussi
          const result = await response.json();
          setAvatar(result.avatar);
        } else {
          console.error('Erreur lors de l\'envoi du fichier au serveur.');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
      }
    }
  };

  return (
    <div>
      <label htmlFor="avatarInput">
        <img
          src={avatar ? avatar.path : 'placeholder.jpg'}
          alt="Avatar"
          style={{ width: '100px', height: '100px', cursor: 'pointer' }}
        />
      </label>
      <input
        type="file"
        id="avatarInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUploader;
