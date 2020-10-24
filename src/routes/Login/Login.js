import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
	Form,
	Input,
	Button,
	Spin
} from 'antd';
import {
	FacebookFilled,
	GoogleOutlined,
	AppleFilled
} from '@ant-design/icons';
import './Login.less';
import Layout from '../../layout/AccountLayout/AccountLayout';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import AppleLogin from 'react-apple-login';
import logo from '../../assets/logo.png';

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		login(payload,callback) {
			dispatch({ type: 'member/login', payload,callback});
		},
		fbLogin(payload,callback) {
			dispatch({ type: 'member/fbLogin', payload,callback});
		},
		googleLogin(payload,callback) {
			dispatch({ type: 'member/googleLogin', payload,callback});
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
		offset: 9,
		span: 6
	}
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class LoginPage extends React.Component {
    state = {
    	loading: false
    };

    componentDidMount() {
    	window.addEventListener('transitionend',this.handleResize,0);
    }

	// 幫iframe補上title(無障礙AA)
	handleResize = () => {
		let iframe = document.getElementById('ssIFrame_google');
		iframe.setAttribute('title', 'google登入框');
	}

    // 表單正確
    onFinish = async (values) => {
    	const { login } = this.props;
    	await login(values, null, (loading) => this.setState({ loading }));
    };

    // 表單錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };

    // fb回傳
    responseFacebook = (response) => {
    	localStorage.setItem('type', 'facebook');
    	// 臉書登入
    	const {fbLogin} = this.props;
    	fbLogin(response, null, (loading) => this.setState({ loading }));
    }


    // 點擊按鈕
    componentClicked = (data) => {
    	// console.log('data', data);
    }

	// google回傳
	responseGoogle = (response) => {
		console.log(response);
		localStorage.setItem('type', 'google');
    	// google登入
    	const {googleLogin} = this.props;
    	googleLogin(response, null, (loading) => this.setState({ loading }));
	}

	render() {
    	const { loading } = this.state;
    	return (
    		<Layout>
    			{
    				!loading?<Form
    					{...layout}
    					name='loginForm'
    					onFinish={this.onFinish}
    					onFinishFailed={this.onFinishFailed}
    					className='loginForm'
    				>
						<p className='title'>
							<a href='/#/'>
								<img src={logo} className='logo' alt='logo' />
							</a><br />
							登入
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
    						label="密 碼 "
    						name="passwd"
    						rules={[
    							{
    								required: true,
    								message: '請輸入密碼'
    							}
    							// {
    							//   pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{8,32}$/,
    							//   message: '密碼需包含至少一個英文大寫、小寫、數字及特殊符號，長度為8至32個字元'
    							// },
    						]}
    					>

    						<Input.Password />
    					</Form.Item>

    					<Form.Item className="loginBtn" {...tailLayout}>
    						<Button type="primary" htmlType="submit">
                				登入
    						</Button>
    					</Form.Item>

    					<div className='beCenter'>
    						<FacebookLogin
    							appId="1876475585827793"
    							autoLoad={false}
    							fields="name,email,picture"
    							onClick={this.componentClicked}
    							callback={this.responseFacebook}
    							cssClass="fbBtn"
    							textButton='  Facebook 登入 '
    							icon={<FacebookFilled />}
    							version="8.0"
    						/>
							<br />
    						<GoogleLogin
    							clientId="619397576843-4foom03sp6vva3uaan5sltprocfec2fo.apps.googleusercontent.com"
    							render={renderProps => (
    								<button onClick={renderProps.onClick} className='googleBtn' disabled={renderProps.disabled}><GoogleOutlined />  Google 登入 </button>
    							)}
    							buttonText="Login"
    							onSuccess={this.responseGoogle}
    							onFailure={this.responseGoogle}
    							cookiePolicy={'single_host_origin'}
							/>
							<br />

    						<p>還沒有會員？ <a href='/#/register'>去註冊</a></p>
    						<p>忘記密碼了嗎? <a href='/#/forget'>忘記密碼</a></p>
    					</div>


    				</Form>: <div className="spin">
    					<Spin />
    				</div>

    			}

    		</Layout>
    	);
	}
	}
);
