import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";


const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
        <Text>Hello Screen1!</Text>
        <TextInput
          style={styles.nameTextInput}
          onChangeText={setName}
          value={name}
          placeholder="Type here ..."
        />
        <Button
          title="Go to Chat"
          onPress={() =>
            navigation.navigate("Chat", { name })
          }
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  nameTextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});

export default Start;