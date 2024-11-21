import React from 'react';

const DotLoader = () => {
  return (
    <div
      className="flex justify-between"
      style={{
        width: '60px',
        height: '25px',
      }}
    >
      <div
        className="dot"
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'black',
          borderRadius: '50%',
          animation: 'jump 1s ease-in-out -0.45s infinite',
        }}
      ></div>
      <div
        className="dot"
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'black',
          borderRadius: '50%',
          animation: 'jump 1s ease-in-out -0.3s infinite',
        }}
      ></div>
      <div
        className="dot"
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'black',
          borderRadius: '50%',
          animation: 'jump 1s ease-in-out -0.15s infinite',
        }}
      ></div>
      <div
        className="dot"
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'black',
          borderRadius: '50%',
          animation: 'jump 1s ease-in-out infinite',
        }}
      ></div>

      <style>
        {`
          @keyframes jump {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-200%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default DotLoader;
