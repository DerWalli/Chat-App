//import gifted chat library
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, where, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, Alert, LogBox} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);
    const [messageName, setMessageName] = useState('');
    let unsubMessages;

    /**
     * 
     * @param {previousMessage} newMessages 
     */

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    }

    
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

   
    useEffect(() => {
        if(isConnected) {
            navigation.setOptions({ title: name });
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cacheMessages(newMessages);
                setMessages(newMessages);
            })
        } else {
            loadCachedMessages();
        }
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        };
    }
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const addMessage = async (newMessage) => {
        const newMessageRef = await addDoc(collection(db, 'messages'), newMessage);
        if (newMessageRef.id) {
            setMessages([newMessage, ...messages]);
            Alert.alert(`The message "${messageName}" has been added.`);
        } else {
            Alert.alert("Unable to add. Please try later");
        }
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    const renderCustomActions = (props) => {        
        return <CustomActions storage={storage} userID={userID} {...props} />;
    }

    const renderCustomView = (props) => {
        const { currentMessage} = props;
        if (currentMessage.location) {
          return (
              <MapView
                style={{width: 150,
                  height: 100,
                  borderRadius: 13,
                  margin: 3}}
                region={{
                  latitude: currentMessage.location.latitude,
                  longitude: currentMessage.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
          );
        }
        return null;
      }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
             {}
            <Text>Welcome in the Messages</Text>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
            />

            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    messageItem: {
        height: 70,
        justifyContent: "center",
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#AAA",
        flex: 1,
        flexGrow: 1
    },
    messageForm: {
        flexBasis: 275,
        flex: 0,
        margin: 15,
        padding: 15,
        backgroundColor: "#CCC"
    },
    messageName: {
        height: 50,
        padding: 15,
        fontWeight: "600",
        marginRight: 50,
        marginBottom: 15,
        borderColor: "#555",
        borderWidth: 2
    },
    item: {
        height: 50,
        padding: 15,
        marginLeft: 50,
        marginBottom: 15,
        borderColor: "#555",
        borderWidth: 2
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#000",
        color: "#FFF"
    },
    addButtonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 20
    },
});
export default Chat
