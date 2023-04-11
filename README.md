# Chat App

 ## Intro

 Chat App for both Android/iOS created with React Native. The app provides users with a chat interface and options to share images and their location.

 
 ## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

 ## Key Features

 - A page where users can enter their name and choose a background color for the chat screen
 before joining the chat.
 - A page displaying the conversation, as well as an input field and submit button.
 - The chat must provide users with two additional communication features: sending images
 and location data.
 - Data gets stored online and offline

## Built with

- [React Native](https://reactnative.dev/)
- [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)
- [Expo](https://expo.dev/)
- [Firebase including Firestore](https://firebase.google.com/)

## Setting up development environment

- Install Expo CLI: `npm install expo-cli -g`
  and login with your Expo account using `expo login`
- Install necessary procet dependencies: `npm i`
- Install the Expo Go App from [Apple Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&gl=DE) to test the project on your mobile device
- Install [Android Studio](https://developer.android.com/studio) for Android Emulator or [Xcode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for ios Simulator to test the app

## Setting up your database

- Sign in at Google Firebase
- Create a new project in test mode
- In there create a Firestore Database
- At 'Settings' -> 'General' -> 'Your apps' -> 'Firestore for Web' generate your configuration object.
- In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore database:

```js
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-authdomain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});
```

## Run the project

- Start the app by running `npx expo start` or `expo start`
- Using the Expo Go app start inTouch by scanning the QR code in your terminal
- Using the Emulator/Simulator press `a` for Android or `i` for ios

## Dependencies

```json
{
  "@react-native-async-storage/async-storage": "1.17.11",
    "@react-native-community/netinfo": "9.3.7",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.6",
    "expo-constants": "~14.2.1",
    "expo-image-picker": "~14.1.1",
    "expo-location": "~15.1.1",
    "expo-media-library": "~15.2.3",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.18.0",
    "react": "18.2.0",
    "react-dom": "^18.2.0",
    "react-native": "0.71.4",
    "react-native-communications": "^2.2.1",
    "react-native-gifted-chat": "^2.0.0",
    "react-native-maps": "1.3.2",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "react-native-web": "~0.18.11"
}
```



