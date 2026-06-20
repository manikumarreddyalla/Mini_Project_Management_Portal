import React from 'react';
import './ErrorAlert.css';

export default function ErrorAlert({ message, onClose }) {
  return (
    <div className="error-alert">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <div className="error-message">
          <strong>Error:</strong> {message}
        </div>
        <button className="error-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
