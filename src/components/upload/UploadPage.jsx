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
import { MDBRadio } from 'mdb-react-ui-kit';


function UploadPage() {

  const { darkMode } = useContext(ThemeContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [checkboxOption, setCheckboxOption] = useState('UNSEEN');



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
    formData.append('file', selectedFile);
    
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    try {
      setProcessing(true);
      setSubmitting(true);
  
      let url = 'http://localhost:3000/predict/unseen'; // Default URL
      if (checkboxOption === 'LRW') {
        url = 'http://localhost:3000/upload/lrw';
      }
  
      const response = await axios.post(url, formData, options);
  
      setSelectedFile(null);
      const {data: newPrediction} = response ?? {};
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
        <h1 className="gradient__text title ">Ready to upload? Let's get started!</h1>
        <div className="dropzone-container">
        <div className='check-box'>
          <div className="checkbox-container">
            <p className='lrw-label'>LRW MODEL</p>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              className={`custom-checkbox1 ${checkboxOption === 'LRW' ? 'active' : ''}`}
              onChange={() => setCheckboxOption('LRW')}
            />
            <p className="checkbox-text">The Lip Reading in the Wild (LRW) model is a deep learning model specifically designed for lip reading tasks on unconstrained video data.</p>
          </div>
          <div className="checkbox-container">
          <p className='unseen-label'>UNSEEN</p>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              className={`custom-checkbox2 ${checkboxOption === 'UNSEEN' ? 'active' : ''}`}
              onChange={() => setCheckboxOption('UNSEEN')}
            />
            <p className="checkbox-text">The Lip Reading in the Wild (LRW) model is a deep learning model specifically designed for lip reading tasks on unconstrained video data.</p>
          </div>
        </div>
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

                   <p className='predicrion--text'>Prediction: {prediction[0][0]}</p>
                    <Table prediction = {prediction} video_data = {video_data}/>
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
