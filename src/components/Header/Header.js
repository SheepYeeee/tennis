/* eslint-disable indent */
import React, { Component } from 'react';
import {
	Layout,
	Col,
	Row,
	Button,
	Avatar,
	Tooltip,
	Dropdown,
	Menu,
	Badge,
	Typography,
	Spin
} from 'antd';
import { handleTime } from '../../assets/normal';
import {
	MenuOutlined,
	MailOutlined,
	SearchOutlined,
	BellOutlined
} from '@ant-design/icons';
import logo from '../../assets/logo.png';
import './Header.less';
import ListContent from '../ListContent/ListContent';
import socketIOClient from 'socket.io-client';
var socket;

export default class Header extends Component {
  state = {
  	loading: false
  }

  constructor() {
  	super();

  	if(localStorage.getItem('token')){

  		socket = socketIOClient(`ws://${process.env.API_HOST}:${process.env.WS_PORT}/`, {
  			query: {
  				Authorization: localStorage.getItem('token')
  			}
		});
		  
		// const socket = io({
		// 	// option 1
		// 	ca: fs.readFileSync('server-cert.pem'),
		  
		// 	// option 2. WARNING: it leaves you vulnerable to MITM attacks!
		// 	rejectUnauthorized: false
		// });
  	}
  }

  componentDidMount() {
  	if(localStorage.getItem('token')){
  		// 監聽聊天列表socket、取得會員資訊
  		const { inboxSocket } = this.props;
  		socket.on('inbox', function (data) {
  			inboxSocket(data);
  		});
  	}
  }

  componentWillUnmount() {
  	if(localStorage.getItem('token')){
  		socket.off('inbox');
  	}
  	
  }

  // 下拉式選單之選項
  setting = (
    <Menu className='setting'>
    	<Menu.Item>
        個人檔案
    	</Menu.Item>
    	<Menu.Item>
    		<a >設定</a>
    	</Menu.Item>
    	<Menu.Item>
    		<a onClick={()=>this.onLogout()}>登出</a>
    	</Menu.Item>
    </Menu>
  );
  
  // 登出
  onLogout = () => {
  	const { logout } = this.props;
  	logout(null, (loading) => this.setState({ loading }));
  }

  // 進入聊天室
  goChatRoom = async (roomId) => {
  	// 取得聊天紀錄
  	const { goToRoute, inboxRoom } = this.props;
  	await inboxRoom(roomId, null, (loading) => this.setState({ loading }));

  	// 導向聊天室
  	goToRoute(`/inbox/${roomId}`);
  }



  render() {
  	const { onHomepage, onCollapse, onSearch, roomList, memberInfo, unReadInbox, unReadNotice, allNotice, noticeRead } = this.props;
  	const { Text } = Typography;
  	const { loading } = this.state;

  	// 取得會員頭像
  	let avatar,userName;
  	if(memberInfo){
		  avatar = memberInfo.photo;
		  userName = memberInfo.name;
  	}

  	// 取得通知並塞資料
  	let notify;
  	if (allNotice) {
  		notify = <Menu className='notifyList'>
  			<div className='title'>
          通知
  			</div>
  			{
  				allNotice.length === 0 ?<Menu.Item  >
                  目前還沒有任何訊息喔~
  				</Menu.Item>:
  					allNotice.map((item, index)=>{
  						return(
  							<Menu.Item key={index}>
  								{item.isRead?null:<Badge dot color='#ff4d4f' className="isread-badge" />}

  								<div className='ListContent'>
  									<Row type="flex" align="middle">
  										<Col>
  											<Avatar size={40} src={item.userImgUrl} />
  										</Col>
  										<Col className="info-text">
  											<Row justify="space-between">
  												<Col flex="auto"><a>{item.userName}</a>&nbsp;</Col>
  												<Col flex="72px" className="info-time"><Text type="secondary">{item.time}</Text></Col>
  											</Row>
  											<Row>
  												<Col>{item.context}</Col>
  											</Row>
  										</Col>
  									</Row>
  								</div>

  							</Menu.Item>
  						);
  					})
  			}
  		</Menu>;
  	}

  	// 取得訊息列表並塞資料
  	let list;
  	if (roomList) {
  		let room = roomList.filter((item, index) => index < 5);
  		if (room.length === 0) {
  			list = <Menu className='msgList'>
  				<div className='title'>
  					<Row type="flex" justify="space-between">
  						<Col>訊息</Col>
  						<Col><a href='/#/inbox/compose'>撰寫</a> | <a href='/#/inbox/'>檢視</a>
  						</Col>
  					</Row>
  				</div>
  				<Menu.Item  >
            目前還沒有任何訊息喔~
  				</Menu.Item>
  			</Menu>;
  		} else {
  			list = <Menu className='msgList'>
  				<div className='title'>
  					<Row type="flex" justify="space-between">
  						<Col>訊息</Col>
  						<Col><a href='/#/inbox/compose'>撰寫</a> | <a href='/#/inbox/'>檢視</a>
  						</Col>
  					</Row>
  				</div>
  				{
  					room.map((item, index) => {
  						return (
  							<Menu.Item key={index} className={item.notReadCount>0 ? 'unRead ' : null} >
  								<b   onClick={() => this.goChatRoom(item.roomId)} >
  									<ListContent
									  	notReadCount = {item.notReadCount}
  										avatar={item.userImgUrl}
  										name={item.userName}
  										time={handleTime(item.lastTime)}
  										text={item.lastContext}
  									/>
  								</b>
  							</Menu.Item>
  						);
  					})
  				}
  			</Menu>;
  		}

  	}

  	return (
  		<Layout.Header className='header'>
  			{
  				!loading? <div className='align-center'>
  					<Row justify="space-between">
  						<Col>
  							<Row gutter={{ lg: 24, md: 12, sm: 6, xs: 3 }}>

  								<Col>
  									<Button className="colBtn" type='button' title='菜單按鈕' alt='菜單按鈕' onClick={onCollapse}>
  										<MenuOutlined alt='菜單按鈕' />
  									</Button>
  								</Col>

  								<Col>
								  	<h1>
										<a href='/#/' onClick={onHomepage}>
											<img src={logo} className='logo' alt='logo' />
										</a>
									</h1>
  								</Col>

  							</Row>
  						</Col>
  						<Col>

  							<Tooltip title="搜尋" >
  								<SearchOutlined className='toolIcon' onClick={onSearch} tabIndex='0'/>
  							</Tooltip>

  							{
  								localStorage.getItem('token')?
  									<b>
  										<Dropdown overlay={list} trigger="click" placement="bottomRight" arrow >
  											<Badge count={unReadInbox} className='toolIcon' tabIndex='0'>
  												<MailOutlined id='inbox'  />
  											</Badge>
  										</Dropdown>

  										<Dropdown overlay={notify} trigger="click" placement="bottomRight" arrow>
  											<Badge count={unReadNotice} className='toolIcon' onClick={()=>noticeRead(null, false)} tabIndex='0'>
  												<BellOutlined id='notice'  />
  											</Badge>
  										</Dropdown>

  										<Dropdown overlay={this.setting} placement="bottomCenter" arrow>
  											<Avatar size={40} src={avatar} alt={userName} tabIndex='0' />
  										</Dropdown>
  									</b>:<b><a className='link' href='/#/register'>註冊</a> | <a className='link' href='/#/login'>登入</a></b>
  							}

  						</Col>

  					</Row>
  				</div>:<div className="spin">
  					<Spin />
  				</div>
  			}

  		</Layout.Header>
  	);
  }
}
export { socket };
