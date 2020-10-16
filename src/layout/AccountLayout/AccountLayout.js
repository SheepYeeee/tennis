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
  		<Layout className='layout'>

  			<div className="myRow">
  				<Row >
            
  					<Col lg={14} md={8} sm={0} xs={0} className="bg" style={{backgroundImage: 'url(https://museums.moc.gov.tw/Upload/FrontPhoto/e172f186-f1b4-4c86-b4da-326943d9bb27.jpg)'}}>
            
  					</Col>
  					<Col lg={10} md={16} sm={24} xs={24}>
  						<Content className='content2'>
  							<Row gutter={{ lg: 24, md: 12, sm: 6, xs: 3 }}>
  								<Col lg={2} md={2} sm={2} xs={1}></Col>
  								<Col lg={20} md={20} sm={20} xs={22}>
  									{children}
  								</Col>
  								<Col lg={2} md={2} sm={2} xs={1}></Col>
  							</Row>
  						</Content>
  					</Col>
       
  				</Row>
  			</div>
  		</Layout>
  	);
  }
}
);
