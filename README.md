# Simple examples of using pre-trained Tensorflow JS models

The models used here are taken from the following repo:

https://github.com/tensorflow/tfjs-models

## Mobilenet
Mobilenet is used for general object identification from an image. Mobilenet can distinguish between 1000 different image classes.
The full list is here http://image-net.org/challenges/LSVRC/2012/browse-synsets

### [Basic identification](mobilenet/1_basic-detection.html)
Try to identify what object is in a static image

### [Webcam identification](mobilenet/2_webcam-detection.html)
Try to identify what object is visible in the webcam.

### [Find objects in image](mobilenet/3_object-detection.html)
Identify and find location of multiple objects in an image. Uses COCO SSD.

### [Recognising your own images](mobilenet/4_transfer-learning.html)
Use transfer learning to train the model to identify custom objects. 

## Posenet
Posenet is used to estimate the poses of one or multiple people in an image.

### [Estimate human poses](posenet/1_webcam-poses.html)
Use the webcam to find people and estimate their poses. The example has drawing helpers to superimpose the detected poses 
onto the webcam feed

## Speech commands
The Speech Command Recognizer is a JavaScript module that enables recognition of spoken commands comprised of simple isolated English words from a small vocabulary

### [Recognise speech commands](speech/0_speech-commands.html)
Use browser audio API to try to recognise 18 different words as well as 'background_noise' and 'unknown'. The words are
 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'up', 'down', 'left', 'right', 'go', 'stop', 'yes', and 'no'.

### [Use speech commands to play snake](speech/1_snake-speech.html)
This example uses a vocabulary that recognises only the 4 directions, up, down, left and right. It has been connected up to
an implementation of Snake (credit https://hjnilsson.com/).
