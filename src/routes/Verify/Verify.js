import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
	Form,
	Input,
	Button,
	Spin,
	Result
} from 'antd';
import { SmileOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import './Verify.less';
import Layout from '../../layout/AccountLayout/AccountLayout';

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		verifyEmail(payload, callback, loading) {
			dispatch({ type: 'member/verifyEmail', payload, callback, loading });
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
let query;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class VerifyPage extends React.Component {
    state = {
    	loading: false
    };

    formRef = React.createRef();

    componentDidMount() {
    	query = this.props.location.search;
    	query = query.replace('?email=', '');

    	this.formRef.current.setFieldsValue({
    		resetEmail: query
    	});
    }

    // 表單正確
    onFinish = async (values) => {
    	// 再寄一次
    	const { verifyEmail } = this.props;
    	verifyEmail(values);
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
    				!loading ? <Result
    					icon={<SmileOutlined />}
    					title="驗證信已寄出，請去信箱收信"
    					extra={<Form
    						{...layout}
    						ref={this.formRef}
    						name='resetForm'
    						onFinish={this.onFinish}
    						onFinishFailed={this.onFinishFailed}
    						className='resetForm'
    					>
    						<p>還沒收到信嗎?請確認信箱後再寄一次</p>
    						<Form.Item
    							label="Email"
    							name="resetEmail"
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
    							<Input type='text' value={this.state.myEmail} id='email' />
    						</Form.Item>

    						<Form.Item className="loginBtn" {...tailLayout}>
    							<Button type="primary" htmlType="submit">
                    再寄一次
    							</Button>
    							<p>還沒有會員？ <a href='/#/register'>去註冊</a></p>
    							<p>已有會員？ <a href='/#/login'>去登入</a></p>
    						</Form.Item>

    					</Form>}>

    				</Result>  
    					:<div className="spin">
    						<Spin />
    					</div>

    			}

    		</Layout>
    	);
    }
	}
);
