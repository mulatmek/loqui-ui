import torch
import cv2
import numpy as np
from turbojpeg import TurboJPEG
import torchvision.transforms as transforms
import sys
import os
from loquimodel.model.model import VideoModel
from loquimodel.utils.helpers import load_missing
import torch.nn.functional as F
import shutil
import argparse


# from turbojpeg import TurboJPEG
# jpeg = TurboJPEG()
def convert_mp4_files(source_dir, target_dir):
    # Create the target directory if it doesn't exist
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # Get the list of .mp4 files in the source directory
    mp4_files = [file for file in os.listdir(source_dir) if file.endswith(".mp4")]

    for file in mp4_files:
        # Get the file path
        file_path = os.path.join(source_dir, file)

        # Open the video file
        video = cv2.VideoCapture(file_path)

        # Get video properties
        fps = video.get(cv2.CAP_PROP_FPS)
        frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

        # Create a directory for the converted frames
        frame_dir = os.path.join(target_dir, os.path.splitext(file)[0])
        os.makedirs(frame_dir, exist_ok=True)

        # Calculate the frame indices to extract 29 frames evenly
        frame_indices = [int(idx) for idx in np.linspace(0, total_frames - 1, 29)]

        # Extract and resize frames
        frames = []
        for frame_index in frame_indices:
            # Set the frame index
            video.set(cv2.CAP_PROP_POS_FRAMES, frame_index)

            # Read the frame
            ret, frame = video.read()

            # Resize the frame to 256x256 pixels
            frame = cv2.resize(frame, (256, 256))

            # Append the resized frame to the list
            frames.append(frame)

        # Release the video file
        video.release()

        # Create the output video file path
        output_file = os.path.join(target_dir, f"{os.path.splitext(file)[0]}.mp4")

        # Write the resized frames to a new video file
        out = cv2.VideoWriter(output_file, cv2.VideoWriter_fourcc(*"mp4v"), fps, (256, 256))
        for frame in frames:
            out.write(frame)
        out.release()

        # Delete the directory containing the frames
        shutil.rmtree(frame_dir)

def predict_classes(model, input_tensor):
    model.eval()
    with torch.no_grad():
        prediction_array = []
        output = model(input_tensor)
        probabilities = F.softmax(output, dim=1)
        _, predicted_classes = torch.max(probabilities, 1)
        class_percentages = [(idx, p.item() * 100) for idx, p in enumerate(probabilities[0])]
        prediction_array = [[idx,round(p, 2)] for idx, p in class_percentages]
        sorted_data = sorted(prediction_array, key=lambda x: x[1], reverse=True)
        return sorted_data[:10]

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


def preprocess_frames(frames, input_shape):
    # Convert frames to numpy arrays
    frames = [np.array(frame, dtype=np.uint8) for frame in frames]

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
    path = "/Users/mulatmekonen/Desktop/loqui-ui/backend/loquimodel/weights/lrw1000-se-mixup-label-smooth-cosine-lr-wd-1e-4-acc-0.48356.pt"
    weight = torch.load(path, map_location=torch.device('cpu'))
   # weight_path = os.path.join("loquimodel", "weights", "lrw-cosine-lr-acc-0.85080.pt")
    #weight = torch.load(weight, map_location=torch.device('cpu'))
    load_missing(video_model, weight.get('video_model'))
    video_model.eval()

    # Replace 'filename.mp4' with the path to your video file
    filename = sys.argv[1]

    # Get the video frames
    frames = extract_opencv(filename)

    # Preprocess the frames
    frames = preprocess_frames(frames, input_shape)

    # Access the preprocessed frames tensor
    tensor_frames = frames.squeeze(0)

    # Convert the tensor frames to numpy array
    numpy_frames = tensor_frames.numpy()

    #plot_frames(numpy_frames)


    # Pass the frames through the model
    with torch.no_grad():
        frames = frames.unsqueeze(0)
        predictions = video_model(frames)

    # Print the predicted label
    highest_prediction = predict_classes(video_model, frames)
    print(highest_prediction)

if __name__ == "__main__":
    main()
