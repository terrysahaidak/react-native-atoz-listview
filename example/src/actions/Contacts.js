import _ from 'lodash';
import {
    FETCH_CONTACT,
    ERROR
} from './types';

export const contactFetch = () => {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(result => {
                const groups = _.groupBy(result, (user) => {
                    return user.name.charAt(0).toUpperCase();
                });
                dispatch({
                    type: FETCH_CONTACT,
                    data: groups,
                    count: result.length
                });
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    error: error.message
                });
            });
    };
};
