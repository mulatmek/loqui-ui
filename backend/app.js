const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB
  }
}).single('video');



// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


// Route to handle video upload
const { spawn } = require('child_process');


app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ error: err.message });
    }

    // Execute Python AI model script
    const pythonScriptPath = path.join(__dirname, 'model_script.py');
    const videoPath = req.file.path;

    const pythonProcess = spawn('python', [pythonScriptPath, videoPath]);

    let prediction = '';

    pythonProcess.stdout.on('data', (data) => {
      prediction += data.toString();
      const split = prediction.split(":");
      prediction = split[split.length-1].replace(/\s/g, '');
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString());
      
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        return res.status(500).send({ error: 'An error occurred while processing the video' });
      }

    fs.unlink(videoPath, (unlinkErr) => {
    if (unlinkErr) {
      console.error(`Failed to delete video file: ${unlinkErr}`);
    }
    });

      // Return success message and prediction
      return res.status(200).send({ message: 'Video uploaded and processed successfully', prediction });
    });
  });
});



// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
