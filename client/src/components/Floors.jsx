import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Floors = () => {
  // Card data array
  const cardData = [
    { id: 1, title: 'Floor 1', description: '150 shops' },
    { id: 2, title: 'Floor 2', description: '150 shops' },
    { id: 3, title: 'Floor 3', description: '150 shops' },
    { id: 4, title: 'Floor 4', description: '150 shops' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 my-8 md:w-[70vw] md:mx-auto mx-10">
      {cardData.map((card) => (
        <Link
          key={card.id}
          to={`/shops/${card.id}`}
          className="card bg-primary md:w-[30vw] md:h-60 shadow-xl transform transition-transform duration-300 hover:scale-105"
        >
          <div className="card-body p-20">
            <h2 className="card-title md:text-5xl sm:text-3xl">{card.title}</h2>
            <p className="lg:text-3xl">{card.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Floors;
