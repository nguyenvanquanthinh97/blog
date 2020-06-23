import * as actionTypes from '../actions/actionTypes';

const usersReducer = (state = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_USER: {
			return [ ...state, action.payload ];
		}
		default:
			return state;
	}
};

export default usersReducer;
