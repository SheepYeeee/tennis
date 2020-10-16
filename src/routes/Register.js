import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
	Spin,
	Form,
	Input,
	DatePicker,
	Button
} from 'antd';
import './Login/Login.less';
import Layout from '../layout/AccountLayout/AccountLayout';
import logo from '../assets/logo.png';

const mapStateToProps = state => {
	return {
		registerRes: state.member.registerRes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		register(payload,callback) {
			dispatch({ type: 'member/register', payload,callback});
		}
	};
};

const layout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 10
	}
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 10
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class RegisterPage extends React.Component {
    state = {
    	loading: false,
    	imageUrl: ''
    };

    formRef = React.createRef();   
    componentDidMount(){
    	let query = this.props.location.search;
    	if(query!==''){
    		query = query.replace('?email=','');
    		query = query.split('&name=');
    		let qq = query[1].split('&imageUrl=');
    		this.setState({
    			imageUrl: qq[1]
    		});
    		this.formRef.current.setFieldsValue({
    			email: query[0],
    			name: qq[0]
    		});
    	}
    }

    // 表單正確
    onFinish = async values => {
    	if(localStorage.getItem('type')){
    		values.type = localStorage.getItem('type');
    		if(localStorage.getItem('type') === 'facebook' || localStorage.getItem('type') === 'google'){
    			values.imageUrl = this.state.imageUrl;
    		}
    	}
    	// 註冊會員
    	const { register } = this.props;
    	await register(values, null, (loading) => this.setState({ loading }));
    };

    // 表單錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };

    render() {
    	const { loading } = this.state;
    	return (
    		<Layout>
    			{
    				!loading ? <Form
    					{...layout}
    					name='loginForm'
    					ref={this.formRef}
    					onFinish={this.onFinish}
    					onFinishFailed={this.onFinishFailed}
    					className='loginForm'
    				>
    					<p className='title'>
    						<a href='/#/'>
    							<img src={logo} className='logo' alt='logo' />
    						</a><br />
							註冊
    					</p>

    					<Form.Item
    						label="Email"
    						name="email"
    						rules={[
    							{
    								required: true,
    								message: '請輸入Email'
    							},
    							{
    								type: 'email',
    								message: 'Email格式錯誤'
    							}
    						]}
    					>
    						<Input />
    					</Form.Item>

    					<Form.Item
    						label="姓 名 "
    						name="name"
    						rules={[
    							{
    								required: true,
    								message: '請輸入姓名'
    							}
    						]}
    					>
    						<Input />
    					</Form.Item>

    					<Form.Item
    						label="密 碼 "
    						name="passwd"
    						rules={this.props.location.search===''?[
    							{
    								required: true,
    								message: '請輸入密碼'
    							},
    							{
    								// eslint-disable-next-line no-useless-escape
    								pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{8,32}$/,
    								message: '密碼需包含至少一個英文大寫、小寫、數字及特殊符號，長度為8至32個字元'
    							}
    						]:null}
              
    					>
    						{this.props.location.search===''?<Input.Password />:<Input.Password disabled/>}
    					</Form.Item>

    					<Form.Item
    						label="生 日 "
    						name="birth"
    						rules={[
    							{
    								type: 'object',
    								required: true,
    								message: '請輸入生日'
    							}
    						]}
    					>
    						<DatePicker className='input' />
    					</Form.Item>

    					<Form.Item
    						label="手 機 "
    						name="phone"
    						rules={[
    							{
    								required: true,
    								message: '請輸入手機'
    							},
    							{
    								pattern: /^[0-9]+$/,
    								message: '請輸入0~9'
    							},
    							{
    								len: 10,
    								message: '手機格式錯誤'
    							}
    						]}
    					>
    						<Input />
    					</Form.Item>


    					<Form.Item className="loginBtn" {...tailLayout}>
    						<Button type="primary" htmlType="submit">
                				註冊
    						</Button>
    						<p>已有會員？ <a href='/#/login'>去登入</a></p>
    					</Form.Item>

    				</Form>:<div className="spin">
    					<Spin />
    				</div>
    			}
          

    		</Layout>
    	);
    }
	}
);
