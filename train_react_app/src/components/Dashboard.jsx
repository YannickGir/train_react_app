import React from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div style={{color:'black'}}>
      <div className='myAvatar'>
        <h2>Prénom</h2>
        <img
          src='https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSuPA7P-_Nkehuys3wB6sS3FAdBWdhU8azhGUy6SgIDlnaHnz8OfEFqPtH-Vab8azCkavt_lIfYXgGffcN4bVRs6QtmGQRMM1ydi60f-4wIHikKIlxQgR-M4iJI6ta5lZTxgNuwY14M0g&usqp=CAc'
          alt='myAvatar'
        />
        
        <p>Inscrit le : </p> 19/01/2024
      </div>
      <div className='description_Wrap'>
        <form className='description'>
          <label htmlFor='age'><h2>Age </h2></label>
          <input style={{ width: '40px' }} id='age' type='number' />
          <label  htmlFor='hobbies'><h2> Hobbies</h2></label>
          <input style={{ width: 'auto' }} id='hobbies' type='text' />
          <label><h2 >Gallerie Photos</h2></label>
          <img
          src='https://youmatter.world/app/uploads/sites/3/2016/05/Vacances-productivite.jpg'
          alt='myAvatar'
        />
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
