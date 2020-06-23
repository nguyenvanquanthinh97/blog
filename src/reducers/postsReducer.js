import * as actionTypes from '../actions/actionTypes';

const postsReducer = (state = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_POSTS: {
			return [ ...action.payload ];
		}
		default:
			return state;
	}
};

export default postsReducer;