import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Layout,
	Spin,
	Menu
} from 'antd';
import {
	HomeOutlined,
	FireOutlined,
	TeamOutlined,
	CalendarOutlined,
	ProjectOutlined,
	TagOutlined
} from '@ant-design/icons';
import Header from '../../components/Header/Header';
import InterestedType from '../../components/InterestedType/InterestedType';
import './Layout.less';
const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const mapStateToProps = state => {
	return {
		roomList: state.inbox.inboxList,
		memberInfo: state.member.memberInfo,
		unReadInbox: state.inbox.unReadInbox,
		allNotice: state.notice.allNotice,
		unReadNotice: state.notice.unReadNotice,
		allTypes: state.craft.alltypes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		interestedType(payload, callback, loading) {
			dispatch({ type: 'member/interestedType', payload, callback, loading});
		},
		types(callback, loading) {
			dispatch({ type: 'craft/types', callback, loading});
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
)(class GlobalLayout extends Component {

  state = {
  	collapsed: true,
  	loading: false,
  	showChoose: true
  };

  constructor(props) {
  	super(props);
  	this.state = {
  		collapsed: true
  	};
  }

  async componentDidMount() {
    
  	// 取得聊天室列表、通知列表
  	const { inbox, notice, GET_memberInfo } = this.props;
  	if(localStorage.getItem('token')){
  		await inbox(null, (loading) => this.setState({ loading }));
  		await notice(null, (loading) => this.setState({ loading }));
  		await GET_memberInfo(null, (loading) => this.setState({ loading }));
      
  		// 取得所有類別
  		const { memberInfo } = this.props;
  		if(memberInfo){
  			const { types } = this.props;
  			types(null, (loading) => this.setState({ loading }));
  		}
  	}

   
    
  }

  // slider控制器
  onCollapse = () => {
  	this.state.collapsed ? (this.setState({ collapsed: false })) : (this.setState({ collapsed: true }));
  };

  // 顯示選擇偏好
  isShow = () => {
  	this.state.showChoose ? (this.setState({showChoose: false})) : (this.setState({showChoose: true}));
  };


  render() {
  	const { logout, children, goToRoute, allTypes, interestedType, inboxRoom, roomList, memberInfo, unReadInbox, unReadNotice, inboxSocket, allNotice, noticeRead } = this.props;
  	const { collapsed, loading, showChoose } = this.state;
  	let chooseType=null;
  	if(memberInfo){
  		if(!memberInfo.isType){
  			chooseType = <InterestedType
  				isShow={this.isShow}
  				typeList={allTypes}
  				onSubmit={(payload) => {
  					interestedType(payload);
  				}}/>;
  		}
  	}
  	return (
  		<Layout className='layout'>
         
  			<Sider collapsedWidth={0} defaultCollapsed='true' collapsed={collapsed} onCollapse={this.onCollapse}>
              
  				<Menu theme="dark" mode="inline">
  					<Menu.Item key="1" style={{ marginTop: '1.5em' }}>
  						<a href='/#/'>
  							<HomeOutlined />
                  動態首頁
  						</a>
  					</Menu.Item>
  					<Menu.Item key="2">
  						<a href='/#/explore/1'>
  							<TagOutlined />
                  探索
  						</a>
  					</Menu.Item>
  					<Menu.Item key="3">
  						<a >
  							<FireOutlined />
                  培力新視角
  						</a>
  					</Menu.Item>
  					<SubMenu key="sub1" title={
  						<span>
  							<TeamOutlined />
  							<span>創作合作</span>
  						</span>
  					}>
  						<Menu.Item key="4">
  							<a href='/#/teamlist'>
                    搜尋合作
  							</a>
  						</Menu.Item>
  						<Menu.Item key="5">
  							<a href='/#/myteam'>
                    我的合作
  							</a>
  						</Menu.Item>
  						<Menu.Item key="6">張貼合作</Menu.Item>
  					</SubMenu>
  					<SubMenu key="sub2" title={
  						<span>
  							<CalendarOutlined />
  							<span>活動召集</span>
  						</span>
  					}>
  						<Menu.Item key="7">搜尋活動</Menu.Item>
  						<Menu.Item key="7">我的活動</Menu.Item>
  						<Menu.Item key="9">張貼活動</Menu.Item>
  					</SubMenu>
  					<Menu.Item key="10">
  						<ProjectOutlined />
                發表企劃
  					</Menu.Item>
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
  					{ chooseType }
  					{children}
  				</Content>

  			</Layout>
          
  		</Layout>
  	);
  }
}
);
