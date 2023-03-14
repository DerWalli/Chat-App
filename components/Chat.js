import React from "react";
import { View, Text, Button } from "react-native";

export default class Chat extends React.Component {
    componentDidMount(){
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
    }

    render() {
        let color = this.props.route.params.color;
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: color}}>
                <Text>Hello Chat</Text>
            </View>
        )
    }
}