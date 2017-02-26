import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Missed extends Component {
    static navigationOptions = {
        title: 'Missed'
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Missed</Text>
            </View>
        );
    }
}

export default Missed;
