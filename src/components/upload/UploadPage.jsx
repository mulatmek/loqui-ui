import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import SpinnerZ from './SpinnerZ';
import video_data from '../../data'
import './UploadPage.css'
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";
import Table from './Table'
function UploadPage() {

  const { darkMode } = useContext(ThemeContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [prediction, setPrediction] = useState(null);



  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file.type.includes('video/')) {
      alert('Invalid file type. Please select a video file.');
      return;
    }
    setSelectedFile(file);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!selectedFile) {
    alert('Please select a video file to upload.');
    return;
  }
  const formData = new FormData();
  formData.append('video', selectedFile);

  const options = {
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setUploadProgress(progress);
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    setProcessing(true);
    setSubmitting(true);
    const response = await axios.post('http://localhost:3000/upload', formData, options);
    setSelectedFile(null);
    setVideoUrl('http://localhost:3000/' + selectedFile.name);
    setUploadProgress(0);
    alert('Video uploaded successfully!');
    const newPrediction = response.data.prediction;
    setPrediction((prevPrediction) => {
      // Clear the previous prediction if it exists
      if (prevPrediction) {
        return newPrediction;
      } else {
        return newPrediction;
      }
    });
  } catch (error) {
    console.log(error);
    alert('An error occurred while uploading the video. Please try again later.');
  } finally {
    setProcessing(false);
    setSubmitting(false);
  }
};

  

  return (
    <>
      <main className="main" id = "upload">
        <h1 className="gradient__text title ">Upload your video</h1>
        <div className="dropzone-container">
          <Dropzone onDrop={handleDrop} accept="video/mp4" multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                {processing && <SpinnerZ />} {/* Display spinner when processing is true */}
                {!processing && (
                  <>
                    <input {...getInputProps()} />
                    {!prediction &&<p className="file-type" >Drag and drop your file here or click to browse</p> }
                    {!prediction && <span className="file-type">.mp4 files only</span>}
                  </>
                )}
                  {prediction && (
                  <div className="prediction-container">

                   <p className='predicrion--text'>Prediction: {`${video_data[Number(JSON.parse(prediction)[0][0])+3]}`}</p>
                    <Table prediction = { JSON.parse(prediction) } video_data = {video_data}/>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {selectedFile && (
            <div className="selected-file">
              <span className="file-name">{selectedFile.name}</span>
              <button className="remove-button" onClick={() => setSelectedFile(null)}>
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="button-container">
          <Button variant="outline-dark" className={darkMode ? "gpt3__footer-btn upload-button" : "gpt3__footer-btn-light upload-button"}  onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Uploading...' : 'Submit'}
          </Button>
        </div>
      </main>
    </>
  );
}

export default UploadPage;
