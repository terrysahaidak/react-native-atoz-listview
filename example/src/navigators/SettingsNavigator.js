import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import All from '../screens/Calls/All';
import Missed from '../screens/Calls/Missed';

const SettingsNavigator = StackNavigator({
    All: { screen: All },
    Missed: { screen: Missed },
});
SettingsNavigator.navigationOptions = {
    tabBar: {
        label: 'Settings',
        icon: ({ focused, tintColor }) => {
            return (
                <Icon
                    name={focused ? 'ios-cog' : 'ios-cog'}
                    size={30}
                    color={tintColor}
                />
            );
        }
    }
};

export default SettingsNavigator;
