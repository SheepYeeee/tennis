import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Spin
} from 'antd';
import {
	CloseOutlined
} from '@ant-design/icons';
import './InterestedType.less';


export default class CraftList extends Component {

    state={
    	loading: false,
    	isShow: true
    }

    // 選擇偏好類別
    isSumbit = async() => {
    	const { onSubmit } = this.props;
    	var checkBoxs = document.querySelectorAll('input[type=\'checkbox\']');
    	var chooseType = [];
    	for(var i = 0; i < checkBoxs.length; i++) {
    		if(checkBoxs[i].checked === true){
    			chooseType.push({'typeId': checkBoxs[i].id});
    		}
    	}
    	// 送出選擇偏好類別
    	await onSubmit(chooseType, null, (loading) => this.setState({ loading }));

    	this.setState({
    		isShow: false
    	});
    };

    // 關閉model
    closeModal = () => {
    	this.setState({
    		isShow: false
    	});
    }


    render() {
    	const {typeList} = this.props;
    	const { loading, isShow } = this.state;
        
    	// 取得所有類別並塞資料
    	let data;
    	if (typeList){
    		data = typeList.map((type, index)=>{
    			return(
    				<Col lg={8} md={12} sm={12} xs={24} key={type.typesId} className='typeBlock'>
    					<input type="checkbox" value={type.typesId} id={type.typesId} />
    					<label htmlFor={type.typesId}>
    						<img alt='example' src={type.typesImgUrl} />
    						<div className="textBlock">
    							<p>{type.typesName}</p>
    						</div>
    					</label>
    				</Col>

    			);
    		});
    	}

    	return (

    		<div className='interestedType'>
    			{
    				!loading&&isShow?<b>
    					<div className='mask'></div>

    					<div className='types'>
    						<div className='typesBody'>
    							<h2>選擇偏好類別</h2>

    							<div className='typeList'>
    								<Row gutter={[16, 16]}>
    									{data}
    								</Row>
    								<Row justify="center">
    									<Button onClick={this.isSumbit}>選擇</Button>
    								</Row>
    							</div>
    						</div>
    					</div>

    					<div className='cardBtn'>
    						<a className="closeBtn" type='button' onClick={this.closeModal}>
    							<CloseOutlined />
    						</a>
    					</div>
    				</b> :null
    			}

    		</div>
    	);
    }
}
