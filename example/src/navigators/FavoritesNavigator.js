import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Favorites/Home';
import AddContact from '../screens/Favorites/AddContact';

const FavoritesNavigator = StackNavigator({
    Home: { screen: Home },
    Add: { screen: AddContact },
});
FavoritesNavigator.navigationOptions = {
    tabBar: {
        label: 'Favorites',
        icon: ({ focused, tintColor }) => {
            return (
                <Icon
                    name={focused ? 'ios-star' : 'ios-star-outline'}
                    size={30}
                    color={tintColor}
                />
            );
        }
    }
};

export default FavoritesNavigator;
