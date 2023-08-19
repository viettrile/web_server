// App.js
import React from 'react';
import FileUploader from './components/fileUpload';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Web Server with Excel File Import</h1>
      <div className="logo-container">
        <img
          src="https://images.viblo.asia/af98dc3a-0038-4151-8e2a-795da9b836a3.png"
          alt="Logo"
          className="logo"
        />
      </div>
      <FileUploader />
    </div>
  );
}

export default App;
