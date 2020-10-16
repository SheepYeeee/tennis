import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Layout,
	Typography,
	Divider
} from 'antd';
import './TeamNav.less';
const { Header } = Layout;
const { Link } = Typography;

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(class TeamNav extends Component {

	render() {
		const { children } = this.props;

		return (
			<div className="team">
				<Header className='team-header'>
					<Link strong href='#/teamlist'>搜尋合作</Link>
					<Divider type="vertical" />
					<Link strong type='' href='#/myteam'>我的合作</Link>
					<Divider type="vertical" />
					<Link strong href='#/'>張貼合作</Link>
				</Header>
            
				<div className="team-content">
					{children}
				</div>
			</div>
		);
	}
}
);
