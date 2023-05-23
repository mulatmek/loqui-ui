import torch
import cv2
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import sys
import os
from loquimodel.model.model import VideoModel
from loquimodel.utils.helpers import load_missing



def extract_opencv(file_name: str) -> list:
    """
    Gets a path to a video file and tries to extract the ROI from it.
    :param file_name: Path to the video file.
    :return: ROI of the given video file.
    """
    
    video = []
    cap = cv2.VideoCapture(file_name)

    while cap.isOpened():
        ret, frame = cap.read()  # BGR
        if ret:
            roi = frame[115:211, 79:175]
            video.append(roi)
        else:
            break
        cap.release()

    return video


def preprocess_frames(frames):

    input_shape = (88, 88) 
    # Resize the frames
    resized_frames = [cv2.resize(frame, input_shape) for frame in frames]

    # Convert frames to grayscale
    grayscale_frames = [cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) for frame in resized_frames]

    # Normalize the frames
    normalized_frames = [(frame / 255.0).astype(np.float32) for frame in grayscale_frames]

    # Stack frames to create a tensor with shape [num_frames, height, width]
    tensor_frames = np.stack(normalized_frames)

    # Add a channel dimension to the tensor
    tensor_frames = np.expand_dims(tensor_frames, axis=1)

    # Convert frames to tensor
    tensor_frames = torch.tensor(tensor_frames)

    return tensor_frames




def main ():
# Define the desired input shape for the video model
    
    input_shape = (88, 88)  # Adjust the dimensions according to the model's requirements
    video_model = VideoModel(500)
    weight_path = os.path.join("loquimodel", "weights", "lrw-cosine-lr-acc-0.85080.pt")
    weight = torch.load(weight_path, map_location=torch.device('cpu'))
    load_missing(video_model, weight.get('video_model'))
    video_model.eval()

    # Replace 'filename.mp4' with the path to your video file
    filename = sys.argv[1]

    # Get the video frames
    frames = extract_opencv(filename)

    # Preprocess the frames
    frames = preprocess_frames(frames)

    # Access the preprocessed frames tensor
    tensor_frames = frames.squeeze(0)

    # Convert the tensor frames to numpy array
    numpy_frames = tensor_frames.numpy()

    # Pass the frames through the model
    with torch.no_grad():
        frames = frames.unsqueeze(0)
        predictions = video_model(frames)

    # Get the predicted label
    predicted_label = torch.argmax(predictions).item()

    # Print the predicted label
    print(f'Predicted label: {predicted_label}')


if __name__ == "__main__":
    main()
