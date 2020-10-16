import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Layout,
	Menu
} from 'antd';
import {
	HomeOutlined,
	ExceptionOutlined
} from '@ant-design/icons';
import Header from '../../components/Header/Header';
import './AdminLayout.less';
const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const mapStateToProps = state => {
	return {
		roomList: state.inbox.inboxList,
		memberInfo: state.member.memberInfo,
		unReadInbox: state.inbox.unReadInbox
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		inbox(callback, loading) {
			dispatch({ type: 'inbox/inbox', callback, loading });
		},
		inboxRoom(payload) {
			dispatch({ type: 'inbox/inboxRoom', payload });
		},
		inboxSocket(payload) {
			dispatch({ type: 'inbox/inboxSocket', payload });
		},
		notice(callback, loading) {
			dispatch({ type: 'notice/notice', callback, loading });
		},
		noticeRead(callback, loading) {
			dispatch({ type: 'notice/noticeRead', callback, loading });
		},
		GET_memberInfo(callback, loading) {
			dispatch({ type: 'member/GET_memberInfo', callback, loading });
		},
		logout(callback, loading) {
			dispatch({ type: 'member/logout', callback, loading });
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(class AdminLayout extends Component {

  state = {
  	collapsed: true,
  	loading: false
  };

  async componentDidMount() {

  	// 取得聊天室列表、通知列表
  	const { inbox, notice, GET_memberInfo } = this.props;
  	if(localStorage.getItem('token')){
  		await inbox(null, (loading) => this.setState({ loading }));
  		await notice(null, (loading) => this.setState({ loading }));
  		await GET_memberInfo(null, (loading) => this.setState({ loading }));
  	}

  }

  onCollapse = () => {
  	this.state.collapsed ? (this.setState({ collapsed: false })) : (this.setState({ collapsed: true }));
  };


  render() {
  	const { logout, children, goToRoute, inboxRoom, roomList, memberInfo, unReadInbox, unReadNotice, inboxSocket, allNotice, noticeRead } = this.props;
  	const { collapsed, loading } = this.state;
    
  	return (
  		<Layout className='layout'>

  			<Sider collapsedWidth={0} defaultCollapsed='true' collapsed={collapsed} onCollapse={this.onCollapse}>
  				{/* <div className="logo" /> */}
  				<Menu theme="dark" mode="inline">
  					<Menu.Item key="1" style={{ marginTop: '1.5em' }}>
  						<a href='/#/'>
  							<HomeOutlined />
                統計數據
  						</a>
  					</Menu.Item>
            
  					<SubMenu key="sub1" title={
  						<span>
  							<ExceptionOutlined />
  							<span>舉報審核</span>
  						</span>
  					}>
  						<Menu.Item key="2" onClick={() => goToRoute('/report/story')}>
                  限時動態
  						</Menu.Item>
  						<Menu.Item key="3" onClick={() => goToRoute('/report/craft')}>
  							{/* <a href='/#/report/craft'> */}
                  專案
  							{/* </a> */}
  						</Menu.Item>
  						<Menu.Item key="4" onClick={() => goToRoute('/report/comment')}>
  							{/* <a href='/#/report/comment'> */}
                  留言
  							{/* </a> */}
  						</Menu.Item>
  					</SubMenu>
  				</Menu>
  			</Sider>

  			<Layout className="site-layout">

  				{
  					!loading? 
  						<Header
  							memberInfo={memberInfo}
  							allNotice={allNotice}
  							inboxRoom={(payload) => inboxRoom(payload)}
  							inboxSocket={(payload) => inboxSocket(payload)}
  							roomList={roomList}
  							unReadInbox={unReadInbox}
  							unReadNotice={unReadNotice}
  							noticeRead={() => noticeRead()}
  							goToRoute={(payload) => goToRoute(payload)}
  							onHomepage={() => goToRoute('/')}
  							logout={() => logout()}
  							onSearch={() => goToRoute('/search')}
  							onCollapse={this.onCollapse}
  							collapsed={collapsed}
  						/>
  						:null
  				}
  				<Content className='layout-content'>
  					{children}
  				</Content>

  			</Layout>

  		</Layout>
  	);
  }
}
);
