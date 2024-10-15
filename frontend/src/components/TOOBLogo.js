import React from 'react';

const TOOBLogo = ({ width = 200, height = 80 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          .letter { fill: #2D3748; }
          .letter-o { stroke: #2D3748; stroke-width: 4; fill: none; }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .gear { animation: rotate 10s linear infinite; }
        `}
      </style>
      <g className="logo">
        <text x="10" y="60" fontSize="60" fontFamily="Arial, sans-serif" className="letter">T</text>
        <circle cx="70" cy="40" r="25" className="letter-o" />
        <circle cx="130" cy="40" r="25" className="letter-o" />
        <text x="160" y="60" fontSize="60" fontFamily="Arial, sans-serif" className="letter">B</text>
        
        <g className="gear" transform="translate(70, 40)">
          <path
            d="M0,-20 L5,-5 L20,-5 L10,5 L15,20 L0,12 L-15,20 L-10,5 L-20,-5 L-5,-5 Z"
            fill="#4A5568"
          />
        </g>
      </g>
    </svg>
  );
};

export default TOOBLogo;