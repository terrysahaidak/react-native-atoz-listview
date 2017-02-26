import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import All from '../screens/Calls/All';
import Missed from '../screens/Calls/Missed';

const CallsNavigator = StackNavigator({
    All: { screen: All },
    Missed: { screen: Missed },
});
CallsNavigator.navigationOptions = {
    tabBar: {
        label: 'Calls',
        icon: ({ focused, tintColor }) => {
            return (
                <Icon
                    name={focused ? 'ios-call' : 'ios-call-outline'}
                    size={30}
                    color={tintColor}
                />
            );
        }
    }
};

export default CallsNavigator;
