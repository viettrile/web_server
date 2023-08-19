import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import './fileUpload.css';

const FileUploader = () => {
  const [importFile, setImportFile] = useState(null);
  const [exportFile, setExportFile] = useState(null);

  const handleImportDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // TODO: Handle the data from the Excel file and save it to the corresponding tables in the database.

      setImportFile(file);
    };
    reader.readAsBinaryString(file);
  };

  const handleExportDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // ... (code for handling export file if needed)

    setExportFile(file);
  };

  const handleSubmit = () => {
    // Prepare data to be sent to the backend
    const formData = {
      importData: ['data1', 'data2'], // Replace this with your actual import data
      exportData: ['data1', 'data2'], // Replace this with your actual export data
    };

    // Call the API to save data to the database
    axios
      .post('http://localhost:5000/api/saveData', formData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

   return (
    <div className="file-uploader-container">
      <div className="dropzone-container">
        {/* Dropzone for import file */}
        <Dropzone onDrop={handleImportDrop} accept=".xlsx">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Import file here</p>
              <p>Drop or click to select files</p>
              {importFile && <p>{importFile.name}</p>}
            </div>
          )}
        </Dropzone>

        {/* Dropzone for export file */}
        <Dropzone onDrop={handleExportDrop} accept=".xlsx">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Export file here</p>
              <p>Drop or click to select files</p>
              {exportFile && <p>{exportFile.name}</p>}
            </div>
          )}
        </Dropzone>
      </div>

      {/* Submit button */}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default FileUploader;
