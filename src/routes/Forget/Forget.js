import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
	Form,
	Input,
	Button,
	Spin
} from 'antd';
import './Forget.less';
import Layout from '../../layout/AccountLayout/AccountLayout';
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
		forgetPassword(payload, callback, loading) {
			dispatch({ type: 'member/forgetPassword', payload, callback, loading });
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
	class ForgetPage extends React.Component {
    state = {
    	loading: false
    };


    // 表單正確
    onFinish = async (values) => {
    	// 忘記密碼(寄信)
    	const {forgetPassword} = this.props;
    	forgetPassword(values, null, (loading) => this.setState({ loading }));
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
    				!loading?<Form
    					{...layout}
    					name='forgetForm'
    					onFinish={this.onFinish}
    					onFinishFailed={this.onFinishFailed}
    					className='forgetForm'
    				>
    					<p className='title'>
    						<a href='/#/'>
    							<img src={logo} className='logo' alt='logo' />
    						</a><br />
							忘記密碼
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


    					<Form.Item className="loginBtn" {...tailLayout}>
    						<Button type="primary" htmlType="submit">
                寄送驗證信
    						</Button>
    						<p>還沒有會員？ <a href='/#/register'>去註冊</a></p>
    						<p>已有會員？ <a href='/#/login'>去登入</a></p>
    					</Form.Item>

    				</Form>: <div className="spin">
    					<Spin />
    				</div>

    			}

    		</Layout>
    	);
    }
	}
);
