import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import UserHeader from './UserHeader';

class PostList extends React.Component {
	componentDidMount() {
		this.props.fetchPost();
	}

	renderPostList = () => {
		return this.props.posts.map((post) => {
			return (
				<div key={post.id} className="item">
					<i className="large user middle aligned icon" />
					<div className="content">
						<h1>{post.title}</h1>
						<p>{post.body}</p>
						<UserHeader userId={post.userId} />
					</div>
				</div>
			);
		});
	};

	render() {
		return <div className="ui relaxed divided list">{this.renderPostList()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { posts: state.posts };
};

const mapDispatchToProps = (dispatch) => ({
	fetchPost: () => dispatch(actions.fetchPost())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
