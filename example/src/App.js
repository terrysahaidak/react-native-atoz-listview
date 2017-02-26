import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './Store';
import RootNavigator from './RootNavigator';

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
};

AppRegistry.registerComponent('example', () => App);
