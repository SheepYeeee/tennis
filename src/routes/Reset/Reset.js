import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
	Form,
	Input,
	Button,
	Spin
} from 'antd';
import './Reset.less';
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
		updatePassword(payload, callback, loading) {
			dispatch({ type: 'member/updatePassword', payload, callback, loading });
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
	class ResetPage extends React.Component {
    state = {
    	loading: false,
    	email: '',
    	hash:''
    };
    
    componentDidMount(){
    	let query = this.props.location.search;
    	query = query.replace('?HASH=','');
    	query = query.split('&EMAIL=');
    	this.setState({
    		hash: query[0],
    		email: query[1]
    	});
    }

    // 表單正確
    onFinish = (values) => {
      
    	let payload = {
    		hash: this.state.hash,
    		data: values
    	};
    	// 重設密碼
    	const {updatePassword} = this.props;
    	updatePassword(payload);
    };

    // 表單錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };

    render() {
    	const { loading,email } = this.state;
    	return (
    		<Layout>
    			{
    				!loading?<Form
    					{...layout}
    					name='resetForm'
    					onFinish={this.onFinish}
    					onFinishFailed={this.onFinishFailed}
    					className='resetForm'
    				>
    					<p className='title'>
    						<a href='/#/'>
    							<img src={logo} className='logo' alt='logo' />
    						</a><br />
							重設密碼
    					</p>

    					<p>用戶{email}你好，<br />請重設密碼</p>
    					<Form.Item
    						label="新密碼 "
    						name="passwd"
    						rules={[
    							{
    								required: true,
    								message: '請輸入新密碼'
    							},
    							{
    								// eslint-disable-next-line no-useless-escape
    								pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{8,32}$/,
    								message: '密碼需包含至少一個英文大寫、小寫、數字及特殊符號，長度為8至32個字元'
    							}
    						]}
    					>
    						<Input.Password />
    					</Form.Item>

    					<Form.Item
    						label="確認新密碼 "
    						name="passwdCheck"
    						rules={[
    							{
    								required: true,
    								message: '請再次輸入新密碼'
    							},
    							{
    								// eslint-disable-next-line no-useless-escape
    								pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{8,32}$/,
    								message: '密碼需包含至少一個英文大寫、小寫、數字及特殊符號，長度為8至32個字元'
    							}
    						]}
    					>
    						<Input.Password />
    					</Form.Item>

    					<Form.Item className="loginBtn" {...tailLayout}>
    						<Button type="primary" htmlType="submit">
                重設密碼
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
