import _ from 'lodash';

import * as actionTypes from './actionTypes';
import jsonPlaceholder from '../api/jsonPlaceholer';

export const fetchPosts = () => {
	return async (dispatch) => {
		const response = await jsonPlaceholder.get('/posts');

		dispatch({
			type: actionTypes.FETCH_POSTS,
			payload: response.data
		});
	};
};

/**
 * @function fetchPostsAndUsers()
 * this will be used to create 2 action type and dispatch them
 */

export const fetchPostsAndUsers = () => {
	return async (dispatch, getState) => {
		await dispatch(fetchPosts());
		const { posts } = getState();

		/**
		 * 
		 * can use either of 2 methods belows to handle fetch user one with same id
		 * Method1: _.uniqBy(posts, 'userId').map(({ userId }) => dispatch(fetchUser(userId)));
		 * Method2: _.chain(posts).map('userId').uniq().forEach((userId) => dispatch(fetchUser(userId))).value();
		 */
		//_.uniqBy(posts, 'userId').map(({ userId }) => dispatch(fetchUser(userId)));

		_.chain(posts).map('userId').uniq().forEach((userId) => dispatch(fetchUser(userId))).value();
	};
};

export const fetchUser = (id) => async (dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({
		type: actionTypes.FETCH_USER,
		payload: response.data
	});
};

// /**
//  * @function fetchUser(id): using memoized function to fetch user
//  * Thanks to this, we can fetchUser with the same id only one time.
//  */
// export const fetchUser = (id) => {
// 	return (dispatch) => _fetchUser(id, dispatch);
// };

// //memoize function for fetching user
// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({
// 		type: actionTypes.FETCH_USER,
// 		payload: response.data
// 	});
// });
