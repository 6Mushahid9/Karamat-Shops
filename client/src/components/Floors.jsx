import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../components/AuthContext.jsx'; // Import the useAuth hook
import axios from 'axios'; // Import axios for API calls

const Floors = () => {
  const { authState } = useAuth(); // Get authState from context
  const navigate = useNavigate(); // To programmatically navigate to different pages

  // Card data array
  const cardData = [
    { id: 1, title: 'Floor 1', description: '150 shops' },
    { id: 2, title: 'Floor 2', description: '150 shops' },
    { id: 3, title: 'Floor 3', description: '150 shops' },
    { id: 4, title: 'Floor 4', description: '150 shops' },
  ];

  const handleClick = async (floorId) => {
    if (!authState.isAuthenticated) {
      // If not authenticated, redirect to login page
      navigate('/login');
    } else {
      // If authenticated, just navigate to the shops page
      navigate(`/shops/${floorId}`);
    }
  };
  

  return (
    <div className="grid grid-cols-2 gap-4 my-8 md:w-[70vw] md:mx-auto mx-10">
      {cardData.map((card) => (
        <div
          key={card.id}
          onClick={() => handleClick(card.id)} // Handle click event
          className="card bg-primary md:w-[30vw] md:h-60 shadow-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="card-body p-20">
            <h2 className="card-title md:text-5xl sm:text-3xl">{card.title}</h2>
            <p className="lg:text-3xl">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Floors;
