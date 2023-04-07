import { StatusBar } from 'expo-status-bar';
// importfirestore from the package
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import the screens we want to navigate
import Chat from './components/Chat';
import Start from './components/Start';
// import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { LogBox, Alert } from "react-native";


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();
  const firebaseConfig = {
    apiKey: "AIzaSyAkFyI4fxRavv4ElEqLRJBLoDiSXx8OjH0",
    authDomain: "chat-a04a1.firebaseapp.com",
    projectId: "chat-a04a1",
    storageBucket: "chat-a04a1.appspot.com",
    messagingSenderId: "574450467639",
    appId: "1:574450467639:web:79fc56591109e5073c10b2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'>
        <Stack.Screen
          name="Start"
          component={Start}
        ></Stack.Screen>
        <Stack.Screen
            name="Chat"
            >
          {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props}/>} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App; 


//    {props => <Messages db={db} {...props} />}