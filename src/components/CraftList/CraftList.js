/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
	Layout,
	Col,
	Row
} from 'antd';
import {
	HeartOutlined,
	EyeOutlined,
	CloseOutlined
} from '@ant-design/icons';
import OneCraft from '../OneCraft/OneCraft';
import './CraftList.less';

export default class CraftList extends Component {
  state = {
  	loading: false,
  	craftId: 0
  };

  //顯示作品內容
  showInfo = e => {
  	document.getElementById('cardInfo').style.display = 'block';
  	const { view, craftModal } = this.props;
  	const showCrarftId = e.currentTarget.id;

  	this.setState({
  		craftId: showCrarftId
  	});

  	// 顯示單一工藝品專案
  	craftModal(showCrarftId, null, (loading) => this.setState({ loading }));

  	// 新增觀看數
  	view(showCrarftId, null, (loading) => this.setState({ loading }));
  };
  
  handleKeyDown = (craftId, e) => {
  	if (e.key === 'Enter') {
  		this.setState({
  			craftId: craftId
		  });
  		document.getElementById('cardInfo').style.display = 'block';
  		const { view, craftModal } = this.props;
		
  		// 顯示單一工藝品專案
  		craftModal(craftId, null, (loading) => this.setState({ loading }));
  
  		// 新增觀看數
  		view(craftId, null, (loading) => this.setState({ loading }));
  	}
  }


  render() {
  	const { allCrafts, craftInfo, allReportType, memberInfo, craftComment, craftModal, editComment, delComment, keep, follow, like, view, reportCraft, reportComment } = this.props;
  	const { craftId } = this.state;
    
  	// 取得所有專案並塞資料
  	let data, info;
  	if(allCrafts){
  		data = allCrafts.map((item,index) =>{
  			return(<Col key={index} lg={6} md={8} sm={12} xs={24} >
  				<div id={item.craftId} className="card" onClick={this.showInfo}  onKeyDown={this.handleKeyDown.bind(this, item.craftId)} tabIndex='0'>
  					<div className="img">
  						<img src={item.craftCoverImg} alt={item.craftCoverImg} />
  					</div>
  					<br />
  					<div className="info">
  						{item.craftName}
  						<span style={{float: 'right'}}>
  							<HeartOutlined /> {item.likes}
                &nbsp;<EyeOutlined /> {item.views}
  						</span>
  					</div>
  				</div>
  			</Col>);
  		});
  	}

  	return (
  		<Layout>
  			<div className='carftList'>
  				<Row gutter={24}>
  					{ data }
  					<OneCraft
  						craftId = {craftId}
  						memberInfo = {memberInfo}
  						allReportType = {allReportType}
  						craftInfo = {craftInfo}
  						craftComment = {(payload) => {
  							craftComment(payload);
  						}}
  						craftModal = {(payload) => {
  							craftModal(payload);
  						}}
  						editComment = {(payload) => {
  							editComment(payload);
  						}}
  						delComment = {(payload) => {
  							delComment(payload);
  						}}
  						keep = {(payload) => {
  							keep(payload);
  						}}
  						follow = {(payload) => {
  							follow(payload);
  						}}
  						like = {(payload) => {
  							like(payload);
  						}}
  						reportCraft = {(payload) => {
  							reportCraft(payload);
  						}}
  						reportComment = {(payload) => {
  							reportComment(payload);
  						}}
  					>

  					</OneCraft>

  					<div id='cardInfo' style={{display: 'none'}}>
  						<div className='cardMask'>
  							{ info }
  						</div>
  						<div className='cardBtn'>
  							<a className="closeBtn" type='button' onClick={this.handleCancel}>
  								<CloseOutlined />
  							</a>
  						</div>
  					</div>

  				</Row>

  			</div>
  		</Layout>
  	);
  }
}
