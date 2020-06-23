import _ from 'lodash';

import * as actionTypes from './actionTypes';
import jsonPlaceholder from '../api/jsonPlaceholer';

export const fetchPost = () => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get('/posts');

		dispatch({
			type: actionTypes.FETCH_POSTS,
			payload: response.data
		});
	};
};

/**
 * @function fetchUser(id): using memoized function to fetch user
 * Thanks to this, we can fetchUser with the same id only one time.
 */
export const fetchUser = (id) => {
	return (dispatch) => _fetchUser(id, dispatch);
};

//memoize function for fetching user
const _fetchUser = _.memoize(async (id, dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({
		type: actionTypes.FETCH_USER,
		payload: response.data
	});
});
