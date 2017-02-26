import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import All from '../screens/Calls/All';
import Missed from '../screens/Calls/Missed';

const ChatsNavigator = StackNavigator({
    All: { screen: All },
    Missed: { screen: Missed },
});
ChatsNavigator.navigationOptions = {
    tabBar: {
        label: 'Settings',
        icon: ({ focused, tintColor }) => {
            return (
                <Icon
                    name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                    size={30}
                    color={tintColor}
                />
            );
        }
    }
};

export default ChatsNavigator;
