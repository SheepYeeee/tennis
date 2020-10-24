import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Layout,
	Col,
	Row
} from 'antd';
import './AccountLayout.less';

const { Content } = Layout;
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
)(class GlobalLayout extends Component {

  state = {
  	collapsed: true
  };

  onCollapse = () => {
  	this.state.collapsed ? (this.setState({collapsed: false})) :(this.setState({collapsed: true}));
  };


  render() {
  	const { children } = this.props;
  	return (
  		<Layout className='layout' style={{backgroundImage: 'url(https://cdn.wallpapersafari.com/78/52/5HQJZ1.jpg)'}}>

  			<div className="myRow">

  						<Content className='content3'>
  							<Row gutter={{ lg: 24, md: 12, sm: 6, xs: 3 }}>
  								<Col lg={7} md={5} sm={4} xs={3}></Col>
  								<Col lg={10} md={14} sm={16} xs={18}>
  									{children}
  								</Col>
  								<Col lg={7} md={5} sm={4} xs={3}></Col>
  							</Row>
  						</Content>

  			</div>
  		</Layout>
  	);
  }
}
);
