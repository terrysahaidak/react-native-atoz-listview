import { FETCH_CONTACT, ERROR } from '../actions/types';

const INITIAL = {
    data: [],
    count: 0
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FETCH_CONTACT:
            return { ...state, data: action.data, count: action.count };
        case ERROR:
            return state;
        default:
            return state;
    }
};
