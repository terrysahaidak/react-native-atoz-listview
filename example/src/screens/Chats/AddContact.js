import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AddContact extends Component {
    static navigationOptions = {
        title: 'AddContact'
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>AddContact</Text>
            </View>
        );
    }
}

export default AddContact;
