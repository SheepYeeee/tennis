import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
	Form,
	Input,
	Button,
	Spin,
	Upload
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import './NewCraft.less';
import Layout from '../../layout/Layout/Layout';

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
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
    	loading: false,
    	uploadImg: []
    };

    // 表單正確
    onFinish = async (values) => {
    	console.log(values);
    };

    // 表單錯誤
    onFinishFailed = errorInfo => {
    	console.log('Failed:', errorInfo);
    };
	
	// 上傳圖片
	loadFile = e => {
		// 圖片變更
		this.setState({
			uploadImg: e.target.files[0]
		});
		// 預覽圖片
		var img = document.createElement('img'); 
		img.src = URL.createObjectURL(e.target.files[0]); 
		const bk = document.getElementById('showImgs');
		bk.appendChild(img);

		for (var i = 0; i < document.getElementById('showImgs').getElementsByTagName('img').length; i++) {
			document.getElementById('showImgs').getElementsByTagName('img')[i].classList.add('imgBlock');
		}
	}



	render() {
    	const { loading } = this.state;
    	return (
    		<Layout>
    			{
    				!loading?<Form
    					{...layout}
    					name='newCraftForm'
    					onFinish={this.onFinish}
    					onFinishFailed={this.onFinishFailed}
    					className='newCraftForm'
    				>
    					<p className='title'>
							新增貼文
    					</p>

    					<Form.Item
    						label="貼文名稱"
    						name="title"
    						rules={[
    							{
    								required: true,
    								message: '請輸入貼文名稱'
    							}
    						]}
    					>
    						<Input />
    					</Form.Item>
						
    					<Form.Item
    						label="貼文簡介"
    						name="intro"
    						rules={[
    							{
    								required: true,
    								message: '請輸入貼文簡介'
    							}
    						]}
    					>
    						<Input.TextArea />
    					</Form.Item>
						
    					<Form.Item label="Dragger">
							<label id='uploadItem'>
								<UploadOutlined style={{ fontSize: '20px', color: '#08c', marginTop: '1em', marginBottom: '5px' }} />
								<input className='image' id='addImg' type="file" accept="image/*" onChange={this.loadFile} />
									點擊或拖曳來上傳圖片<br />
							</label>
							<div id='showImgs'>
							</div>
    					</Form.Item>


    					<Form.Item className="addBtn" {...tailLayout}>
    						<Button type="primary" htmlType="submit">
								新增貼文
    						</Button>
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
