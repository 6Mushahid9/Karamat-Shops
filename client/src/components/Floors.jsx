import React from 'react';

const Floors = () => {
  // Card data array
  const cardData = [
    { id: 1, title: 'Card Title 1', description: '150 shops' },
    { id: 2, title: 'Card Title 2', description: '150 shops' },
    { id: 3, title: 'Card Title 3', description: '150 shops' },
    { id: 4, title: 'Card Title 4', description: '150 shops' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 my-8 md:w-[70vw] md:mx-auto mx-10">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="card bg-primary md:w-[30vw] md:h-60 shadow-xl transform transition-transform duration-300 hover:scale-105"
        >
          <div className="card-body p-10">
            <h2 className="card-title md:text-3xl">{card.title}</h2>
            <p className="md:text-2xl">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Floors;
