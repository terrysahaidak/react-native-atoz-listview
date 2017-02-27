import { combineReducers } from 'redux';
import Contact from './Contact';
import RootNavigator from '../RootNavigator';

const navReducer = (state, action) => {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default combineReducers({
    nav: navReducer,
    contacts: Contact
});
