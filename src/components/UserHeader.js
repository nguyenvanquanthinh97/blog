import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class UserHeader extends React.Component {
	componentDidMount() {
		this.props.fetchUser(this.props.userId);
	}

	render() {
		const { user } = this.props;

		if (!user) return null;

		return <div className="header">{user.name}</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	const { userId } = ownProps;
	return { user: state.users.find((user) => user.id === userId) };
};

const mapDispatchToProps = (dispatch) => ({
	fetchUser: (id) => dispatch(actions.fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
