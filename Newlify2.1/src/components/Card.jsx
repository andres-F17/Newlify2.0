import React from 'react';

export default function Card({ children }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">{children}</div>
  );
}