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
                // group all contact by first letter in name field
                const groups = _.groupBy(result, (user) => {
                    return user.name.charAt(0).toUpperCase();
                });
                // sort group
                const keys = Object.keys(groups);
                const sortedKeys = _.sortBy(keys);
                const sortByKeys = _.fromPairs(
                    _.map(sortedKeys, key => [key, groups[key]])
                );
                dispatch({
                    type: FETCH_CONTACT,
                    data: sortByKeys,
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
