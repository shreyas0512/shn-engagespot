![Engage Spot Notion](https://user-images.githubusercontent.com/64391274/230778611-64589571-eaaa-4677-b115-7626978dd856.png)



# Fall Detector App
This React Native app is designed to help elderly individuals who may be at risk of falling. The app uses accelerometer in the user's mobile device to detect falls, and sends a notification to a designated contact or emergency services if a fall is detected. This can provide an added layer of safety and security for elderly individuals who may live alone or be at risk of falling. Currently the detection is very basic and has many issues but with implementation of machine learning algorithms, in the future this could be vastly accurate and provide great help to individuals. The app uses the device's accelerometer sensor to detect a sudden change in acceleration, which is characteristic of a fall. Once a fall is detected, the app sends a notification using Engagespot API, which can be configured to send notifications to a user's email and/or phone number.
## Team members
1. Shreyas Santhosh - https://github.com/shreyas0512
2. Swetha Theresa George - https://github.com/swethatheresa
## Link to product walkthrough
https://user-images.githubusercontent.com/76905421/232288079-31cb7edb-0c4d-49c5-b1f0-07470b07e614.mp4


## How it Works ?
### Frontend
React Native is used to develop the cross-platform application with expo. Expo-sensors package is used to access the accelerometer data from the phone. When the user adds an email, it is stored in asyncstorage and then later fetched and mail is sent to that email using the api created in backend with engagespot.When the accelerometer detects acceleration over a certain threshold value, it calls an API request causing the notification to caregiver.
### Backend

## Libraries used
### Frontend
 * React-Native: 0.71.6
 * expo-sensors: 12.1.1
 * nativewind: 2.0.11
 * expo: 48.0.11
 * @engagespot/react-component: 1.1.9
 * @react-native-async-storage/async-storage: 1.17.11
### Backend
* @engagespot/node: 1.4.5,
* body-parser: 1.20.2,
* cors: 2.8.5,
* express: 4.18.2
## How to configure
* Clone the repository and open the backend directory in vscode and use npm i.
* Open the frontend directory on another vscode window and use npm i.
* Change localhost in api fetch to your own systems IP address using ipconfig as it uses Expo to run the app over lan.
## How to Run
in backend instance,
```sh
node index.js
```
in frontend instance,
```sh
npx expo start
```
Install expo app in mobile device and scan qr code.

