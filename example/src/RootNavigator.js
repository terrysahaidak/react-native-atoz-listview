import { TabNavigator, TabView } from 'react-navigation';
import FavoritesNavigator from './navigators/FavoritesNavigator';
import CallsNavigator from './navigators/CallsNavigator';
import ContactsNavigator from './navigators/ContactsNavigator';
import SettingsNavigator from './navigators/SettingsNavigator';
import ChatsNavigator from './navigators/ChatsNavigator';

const RootNavigator = TabNavigator({
    Favorites: { screen: FavoritesNavigator },
    Calls: { screen: CallsNavigator },
    Contacts: { screen: ContactsNavigator },
    Chats: { screen: ChatsNavigator },
    Settings: { screen: SettingsNavigator },
}, {
        tabBarComponent: TabView.TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        initialRouteName: 'Contacts',
        tabBarOptions: {
            style: {
                backgroundColor: '#f7f7f7',
                borderTopWidth: 0.5,
                borderTopColor: 'rgba(0, 0, 0, 0.2)',
                paddingTop: 10,
                paddingBottom: 3,
            },
            activeTintColor: '#0173fa',
            inactiveTintColor: 'rgba(0, 0, 0, 0.6)',
            labelStyle: {
                fontSize: 11,
                fontWeight: '300'
            },
        },

    });

export default RootNavigator;
