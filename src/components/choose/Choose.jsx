import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './choose.css'
const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState('Beige');

  const colors = [
    { name: 'Beige', code: '#d3b28d' },
    { name: 'Black', code: '#000000' },
    { name: 'Blue', code: '#9bbcd1' },
    { name: 'White', code: '#f5f5f5' },
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color.name);
  };

  return (
    <div className="container ">
      <h5 className="mb-2 ahh">
        Color: <span className="fw-bold">{selectedColor}</span>
      </h5>
      <div className="d-flex justify-content-center gap-3">
        {colors.map((color) => (
          <div
            key={color.name}
            onClick={() => handleColorClick(color)}
            className={`rounded-circle d-flex justify-content-center align-items-center ${
              selectedColor === color.name ? 'border border-dark border-3' : 'border border-light'
            }`}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: color.code,
              cursor: 'pointer',
              boxShadow: selectedColor === color.name ? '0 4px 8px rgba(0,0,0,0.3)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
