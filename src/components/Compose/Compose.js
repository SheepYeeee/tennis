import React from 'react';
import {
	Card,
	Form,
	Input,
	Button,
	Row,
	Col,
	Spin
} from 'antd';
import {
	ArrowLeftOutlined
} from '@ant-design/icons';
import './Compose.less';


export default class Compose extends React.Component {
    state = {
    	loading: false
    };

    // 表單正確
    onFinish = async (values) => {
    	const payload = {
    		data: values,
    		page: 'compose'
    	};
    	// 送出訊息
    	const { sendMessage } = this.props;
    	await sendMessage(payload, null, (loading) => this.setState({ loading }));
    };

    // 表單錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };


    render() {
    	const { TextArea } = Input;
    	const { loading } = this.state;
    	return (

    		<Card className="compose" title={
    			<div className="title-text">
    				<Button type="link" href='/#/inbox'><ArrowLeftOutlined /></Button>
                    新訊息
    			</div>}>
    			<div className="card-body">
    				{
    					!loading?<Form
    						name='composeForm'
    						onFinish={this.onFinish}
    						onFinishFailed={this.onFinishFailed}
    						labelCol={{ md: { span: 6 }, lg: { span: 4 } }}
    						wrapperCol={{ md: { span: 18 }, lg: { span: 20 } }}
    						labelAlign="left"
    					>

    						<Form.Item
    							label="收件者"
    							name="email"
    							rules={[
    								{
    									required: true,
    									message: '必填欄位'
    								},
    								{
    									type: 'email',
    									message: 'Email格式錯誤'
    								}
    							]}
    						>
    							<Input placeholder="輸入用戶名稱" />
    						</Form.Item>

    						<Form.Item
    							label="訊息"
    							name="context"
    							rules={[
    								{
    									required: true,
    									message: '必填欄位'
    								}
    							]}
    						>
    							<TextArea rows={10} />
    						</Form.Item>

    						<Form.Item className="send-btn" >
    							<Button type="primary"
    								shape="round"
    								htmlType="submit">
                                傳送
    							</Button>
    						</Form.Item>

    					</Form>:<div className="spin">
    						<Spin />
    					</div>
    				}
    			</div>
    		</Card>
    	);
    }
}
