import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Contacts/Home';

const ContactsNavigator = StackNavigator({
    ContactsHome: { screen: Home },
});
ContactsNavigator.navigationOptions = {
    tabBar: {
        label: 'Contacts',
        icon: ({ focused, tintColor }) => {
            return (
                <Icon
                    name={focused ? 'ios-contact' : 'ios-contact-outline'}
                    size={30}
                    color={tintColor}
                />
            );
        }
    }
};

export default ContactsNavigator;
