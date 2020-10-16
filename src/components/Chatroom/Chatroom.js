import React from 'react';
import {
	Form,
	Input,
	List,
	Row,
	Col,
	Button,
	Spin
} from 'antd';
import {
	ArrowLeftOutlined
} from '@ant-design/icons';
import './Chatroom.less';
import OneStory from '../OneStory/OneStory';
import moment from 'moment';


export default class Chatroom extends React.Component {
    state = {
    	areaValue: '',
    	loading: false,
    	visable: false
    };

    formRef = React.createRef();

    componentDidMount() {
    	window.document.getElementsByClassName('chatroom')[0].scrollTop = window.document.getElementsByClassName('chatroom')[0].scrollHeight;
    }
    componentDidUpdate() {
    	window.document.getElementsByClassName('chatroom')[0].scrollTop = window.document.getElementsByClassName('chatroom')[0].scrollHeight;
    }


    // 傳送訊息
    onFinish = (values) => {
    	values.email = this.props.whoInRoom[1];
    	const payload = {
    		data: values,
    		page: 'chatroom'
    	};
    	const { sendMessage } = this.props;
    	sendMessage(payload, null, (loading) => this.setState({ loading }));
    	this.formRef.current.resetFields();
    };

    // form傳送判斷錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };

    // 關閉Story
    closeStory = () =>{
    	this.setState({visable: false});
    }

    // 取得現實動態
    getStory = id =>{
    	const {anonymousStory}=this.props;
    	anonymousStory(id, null, (loading) => this.setState({ loading }));
    	this.setState({visable: true});
    }
    
    render() {
    	const { TextArea } = Input;
    	const { recordList, whoInRoom, oneStory } = this.props;
    	const { loading,visable } = this.state;

    	return (
    		<b>
    			{
    				!loading? <List
    					className="chatroom"
    					size="small"
    					bordered
    					header={
    						<div className="title-text">
    							<Button type="link" href='/#/inbox'><ArrowLeftOutlined /></Button>
    							{whoInRoom[0]}
    						</div>}
    					footer={

    						<Form
    							ref={this.formRef}
    							name='msgForm'
    							className='reply-form'
    							onFinish={this.onFinish}
    							onFinishFailed={this.onFinishFailed}
    						>
    							<Row type="flex" align="middle">
    								<Col className="msg-input">
    									<Form.Item
    										name="context"
    										rules={[
    											{
    												required: true,
    												message: '必填欄位'
    											}
    										]}
    									>
    										<TextArea value='' className="textArea" rows={1} />
    									</Form.Item>
    								</Col>
    								<Col className="send-btn">
    									<Form.Item >
    										<Button
    											type="primary"
    											htmlType="submit">
                                        送出
    										</Button>
    									</Form.Item>
    								</Col>
    							</Row>
    						</Form>}
    					dataSource={recordList}
    					renderItem={ (item,index) => (
    						<Row type="flex" justify={item.isMyself ? 'end' : 'start'}>
    							<List.Item>
    								<Col className={item.isMyself ? 'from-me' : 'from-other'} title={moment(item.contextTime).format('YYYY-MM-DD HH:MM')}>
    									{item.type==='text'?item.context:null}
    									{item.type==='story'?
    										<img className='storyImg' onClick={this.getStory.bind(this,JSON.parse(item.context).storyId)} width='180' alt='story' src={JSON.parse(item.context).storyImageUrl} />
    										:null}
    								</Col>
    							</List.Item>
    						</Row>
    					)}
    				/>:<div className="spin">
    					<Spin />
    				</div>}
    			{
    				visable?<OneStory
    					story={oneStory}
    					closeStory={this.closeStory}
    				></OneStory>:null
    			}
    		</b>

    	);
    }
}
