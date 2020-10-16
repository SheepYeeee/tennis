import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Col,
	Row,
	Form,
	List,
	Button,
	Checkbox,
	Spin
} from 'antd';
import { handleTime } from '../../assets/normal';
import './Inbox.less';
import NoSelect from '../../components/NoSelect/NoSelect';
import Compose from '../../components/Compose/Compose';
import Chatroom from '../../components/Chatroom/Chatroom';
import ListContent from '../../components/ListContent/ListContent';
import Layout from '../../layout/Layout/Layout';
import {
	PlusOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import { socket } from '../../components/Header/Header';

const mapStateToProps = state => {
	return {
		roomList: state.inbox.inboxList,
		inboxRecord: state.inbox.inboxRecord,
		whoInRoom: state.inbox.whoInRoom,
		memberInfo: state.member.memberInfo,
		oneStory: state.story.oneStory
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		sendMessage(payload, callback, loading) {
			dispatch({ type: 'inbox/sendMessage', payload, callback, loading });
		},
		inbox(callback, loading) {
			dispatch({ type: 'inbox/inbox' }, callback, loading);
		},
		inboxRoom(payload, callback, loading) {
			dispatch({ type: 'inbox/inboxRoom', payload, callback, loading });
		},
		deleteChatRoom(payload, callback, loading) {
			dispatch({ type: 'inbox/deleteChatRoom', payload, callback, loading });
		},
		inboxRoomSocket(payload, callback, loading) {
			dispatch({ type: 'inbox/inboxRoomSocket', payload, callback, loading });
		},
		anonymousStory(payload, callback, loading) {
			dispatch({ type: 'story/anonymousStory', payload, callback, loading });
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(class Inbox extends Component {
    state = {
    	loading: false
    };

    
    async componentDidMount(prevProps) {

    	// 取得聊天室列表、聊天室
    	const { inbox, inboxRoom, inboxRoomSocket } = this.props;
    	await inbox(null, (loading) => this.setState({ loading }));

    	// 取得聊天室
    	const { name } = this.props.match.params;
    	await inboxRoom(name, null, (loading) => this.setState({ loading }));

    	// 監聽聊天室
    	const { memberInfo } = this.props;
        
    	socket.on(`inbox-room-${name}`, function (data) {
    		inboxRoomSocket(data);
    		socket.emit('message-receiver', {
    			'roomId': name,
    			'userEmail': localStorage.getItem('email')
    		});
    	});
        

    	//增加inbox頁的class來做RWD 有問題
    	const { loading } = this.state;
    	if(!loading){
    		let inboxPage = document.getElementById('inboxPage-row');
    		if (this.props.match.path === '/inbox') {
    			inboxPage.className+=' inInbox';
    		} else {
    			inboxPage.className.replace(/\binInbox\b/,'');
    		}
    	}

    }


    componentWillUnmount() {
    	const { name } = this.props.match.params;
    	socket.off(`inbox-room-${name}`);
    }
    

    // 表單正確
    onFinish = async (values) => {
    	let form = [];
    	let arr = Object.keys(values).map((key) => [(key), values[key]]);
    	for (let index = 0; index < arr.length; index++) {
    		const element = arr[index];
    		if (element[1] === true) form.push({ roomId: element[0] });
    	}
    	let { deleteChatRoom, goToRoute } = this.props;
    	// 刪除聊天室
    	await deleteChatRoom(form, null, (loading) => this.setState({ loading }));
    	goToRoute('/inbox');
    };

    // 表單錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };

    // 監聽Checkbox
    checkboxOnChange = index => {
    	let { roomList } = this.props;
    	let a = roomList.slice();
    	a[index].isChecked = !a[index].isChecked;
    	roomList = a;

    	// 勾選顯示刪除按鈕
    	const check = roomList.find((item, index, array) => {
    		return item.isChecked === true;
    	});
    	check ? document.getElementById('delRoom').style.display = 'inline' : document.getElementById('delRoom').style.display = 'none';
    };

    // 進入聊天室
    goChatRoom = async (roomId) => {
    	const { name } = this.props.match.params;
    	socket.off(`inbox-room-${name}`);

    	// 取得聊天紀錄
    	const { goToRoute, inboxRoom, inboxRoomSocket } = this.props;
    	await inboxRoom(roomId, null, (loading) => this.setState({ loading }));

    	// 監聽聊天室
    	const { memberInfo } = this.props;
    	socket.on(`inbox-room-${roomId}`, function (data) {
    		inboxRoomSocket(data);
    		socket.emit('message-receiver', {
    			'roomId': roomId,
    			'userEmail': localStorage.getItem('email')
    		});
    	});
        

    	// 導向聊天室
    	goToRoute(`/inbox/${roomId}`);
    }

    render() {
    	const { loading } = this.state;
    	const { match, roomList, inboxRoom, inboxRecord, whoInRoom, sendMessage, oneStory, anonymousStory } = this.props;
    	const { params, path } = match;
    	const { name } = params;
    	let which = '';
    	// 確認聊天室列表資料
    	if (roomList) {
    		// 判斷頁面
    		if (path === '/inbox') {
    			which = <NoSelect />;
    		} else if (name === 'compose') {
    			which = <Compose sendMessage={(payload) => { sendMessage(payload); }} />;
    		} else {
    			if (inboxRecord && whoInRoom) {
    				which = <Chatroom oneStory={oneStory} anonymousStory={(payload) => { anonymousStory(payload); }} sendMessage={(payload) => { sendMessage(payload); }} roomId={name} getRecord={(payload) => { inboxRoom(payload); }} whoInRoom={whoInRoom} recordList={inboxRecord} />;
    			}
    		}
    	}

    	return (

    		<Layout>

    			<div className='inboxPage'>
    				{
    					!loading? null: <div className='spinDiv'>
    						<div className="cenSpin">
    							<Spin size="large" />
    						</div>
    					</div>
    				}

    				<Row id="inboxPage-row">
    					<Col xs={0} sm={12} md={12} lg={9}>
    						<div className="inbox">
    							<Form
    								name='InboxForm'
    								onFinish={this.onFinish}
    								onFinishFailed={this.onFinishFailed}
    							>
    								<List
    									className="msgList-list"
    									size="large"
    									header={
    										<Row className="msgList-title" type="flex" justify="space-between" align="middle">
    											<Col className="title-text">個人訊息</Col>
    											<Col>

    												<Button
    													id="delRoom"
    													className="delete-btn"
    													type="danger"
    													shape="round"
    													icon={<DeleteOutlined />}
    													htmlType="submit"
    												>
    												</Button>
    												<a href='/#/inbox/compose'>
    													<Button
    														type="primary"
    														shape="round"
    														icon={<PlusOutlined />}
    													>新增
    													</Button>
    												</a>
    											</Col>
    										</Row>}
    									bordered
    									dataSource={roomList}
    									renderItem={(item, index) => (
    										<List.Item  className={item.notReadCount>0 ? 'unRead msgList-item' : 'msgList-item'} >
    											<Row className='msgList-item-row' type="flex" align="middle">
    												<Col className="checkbox">
    													<Form.Item className="list-checkbox"
    														name={item.roomId}
    														valuePropName='checked'
    														initialValue={false}>
    														<Checkbox checked={item.isChecked} onChange={() => this.checkboxOnChange(index)} />
    													</Form.Item>
    												</Col>
    												<Col className="msg-info">
                                                        
    													<b  onClick={() => this.goChatRoom(item.roomId)} >
    														<ListContent
    															avatar={item.userImgUrl}
    															notReadCount = {item.notReadCount}
    															name={item.userName}
    															time={handleTime(item.lastTime)}
    															text={item.lastContext}
    														/></b>
    												</Col>
    											</Row>
    										</List.Item>
    									)}
    								/>
    							</Form>
    						</div>
    					</Col>
    					<Col xs={24} sm={12} md={12} lg={15}>
    						{which}
    					</Col>
    				</Row>
    			</div>
    		</Layout>
    	);
    }
}
);
