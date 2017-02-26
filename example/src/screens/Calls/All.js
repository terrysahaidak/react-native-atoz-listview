import React, { Component } from 'react';
import { View, Text } from 'react-native';

class All extends Component {
    static navigationOptions = {
        title: 'All'
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>All</Text>
            </View>
        );
    }
}

export default All;
