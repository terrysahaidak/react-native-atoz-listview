import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Favorites extends Component {
    static navigationOptions = {
        title: 'Favorites',
        header: ({ state, setParams }) => {
            const right = (
                <Button
                    title="Add"
                    onPress={() => this.props.navigation.navigate('Add')}
                />
            );
            return { right };
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Favorites</Text>
            </View>
        );
    }
}

export default Favorites;
