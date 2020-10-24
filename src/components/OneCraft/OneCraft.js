/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
	Layout,
	Col,
	Input,
	Row,
	Avatar,
	Button,
	Form,
	Dropdown,
	Menu,
	Modal,
	Radio
} from 'antd';
import {
	HeartOutlined,
	EyeOutlined,
	CloseOutlined,
	MessageOutlined,
	WarningOutlined,
	PlusOutlined,
	EditOutlined,
	MoreOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OneCraft.less';
import TextArea from 'antd/lib/input/TextArea';
import { handleTime } from '../../assets/normal';

export default class OneCraft extends Component {
  state = {
  	loading: false,
  	isShowModal: false,
  	craftId: 0,
  	isShowProjectModal: false,
  	reportCraftId: 0,
  	reportCommentsId: 0,
  	editCommentsId: 0,
  	deleteCommentsId: 0,
  	modalRadioValue: '',
  	modalValue: ''
  };

  formRef = React.createRef();

  //點選關注創作人
  handleFollow = () => {
  	const { follow } = this.props;
  	const button = document.getElementById('follow');
  	const isFollow = document.getElementsByClassName('isFollow');
  	const text = button.getElementsByTagName('span')[1];
  	const plusIcon = button.getElementsByClassName('anticon-plus')[0];
  	const id = button.getAttribute('name');

  	let payload = {
  		id: id,
  		craftId: this.props.craftId
  	};
  	// 關注創作人
  	follow(payload, null, (loading) => this.setState({ loading }));

  	if (isFollow.length) {
  		button.classList.add('ant-btn-primary');
  		button.classList.remove('isFollow', 'ant-btn-ghost');
  		text.innerText = '關注創作人';
  		plusIcon.style.display = 'inline';
  	} else {
  		button.classList.add('isFollow', 'ant-btn-ghost');
  		button.classList.remove('ant-btn-primary');
  		text.innerText = '正在關注';
  		plusIcon.style.display = 'none';
  	}
  }

  //點選收藏專案
  handleSave = () => {
  	const { keep } = this.props;
  	const button = document.getElementById('save');
  	const isSave = document.getElementsByClassName('isSave');
  	const text = button.getElementsByTagName('span')[0];
  	const id = button.getAttribute('name');
  	// 收藏專案
  	keep(id, null, (loading) => this.setState({ loading }));

  	if (isSave.length) {
  		button.classList.remove('isSave');
  		text.innerText = '收藏專案';
  	} else {
  		button.classList.add('isSave');
  		text.innerText = '已收藏';
  	}
  }

  //點選讚賞專案
  handleLike = () => {
  	const { like } = this.props;
  	const button = document.getElementById('like');
  	const isLike = document.getElementsByClassName('isLike');
  	const text = button.getElementsByTagName('span')[0];
  	const id = button.getAttribute('name');
  	// 讚賞專案
  	like(id, null, (loading) => this.setState({ loading }));

  	if (isLike.length) {
  		button.classList.remove('isLike');
  		text.innerText = '讚賞專案';
  	} else {
  		button.classList.add('isLike');
  		text.innerText = '已讚賞';
  	}
  }

  //顯示專案檢舉modal
  showProjectModal = e => {
  	let id = e.currentTarget.id;
  	this.setState({
  		isShowProjectModal: true,
  		reportCraftId: id
  	});
  }

  //送出專案檢舉modal
  projectModelHandleOk = () => {
  	const { reportCraft } = this.props;
  	let payload = {
  		craftsId: this.state.reportCraftId,
  		data: {
  			reportTypeId: this.state.modalRadioValue,
  			reportText: this.state.modalValue
  		}
  	};
  	// 檢舉專案
  	reportCraft(payload, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		isShowProjectModal: false,
  		modalRadioValue: '',
  		modalValue: '',
  		reportCraftId: 0
  	});
  };

  //關閉專案檢舉modal
  projectModelHandleCancel = e => {
  	this.setState({
  		isShowProjectModal: false,
  		modalRadioValue: '',
  		modalValue: ''
  	});
  };

  //更改舉報專案的radio button
  handleRadioChange = e => {
  	this.setState({
  		modalRadioValue: e.target.value
  	});
  };

  //舉報專案的textarea更改
  handleTextareaChange = e => {
  	this.setState({
  		modalValue: e.target.value
  	});
  };

  //送出留言檢舉
  modelHandleOk = e => {
  	const { reportComment } = this.props;
  	let payload = {
  		commentsId: this.state.reportCommentsId,
  		data: {
  			reportTypeId: this.state.modalRadioValue,
  			reportText: this.state.modalValue
  		}
  	};
  	// 檢舉留言
  	reportComment(payload, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		isShowModal: false,
  		modalRadioValue: '',
  		modalValue: '',
  		reportCommentsId: 0
  	});
  };

  //關閉留言檢舉modal
  modelHandleCancel = e => {
  	this.setState({
  		isShowModal: false,
  		modalRadioValue: '',
  		modalValue: ''
  	});
  };

  //送出刪除留言
  delCommentModelHandleOk = () => {
  	const { delComment } = this.props;
  	let payload = {
  		delCommentId: this.state.deleteCommentsId,
  		craftId: this.props.craftId
  	};
  	// 刪除留言
  	delComment(payload, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		isShowDelModal: false,
  		deleteCommentsId: 0
  	});
  };

  //關閉刪除留言modal
  delCommentHandleCancel = e => {
  	// 清空
  	this.setState({
  		isShowDelModal: false,
  		deleteCommentsId: 0
  	});
  };

  //送出編輯留言
  editCommentModelHandleOk = () => {
  	const { editComment } = this.props;
  	let payload = {
  		craftId: this.props.craftId,
  		commentId: this.state.editCommentsId,
  		data: {
  			context: document.getElementById('editComment').value
  		}
  	};
  	// 編輯留言
  	editComment(payload, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		isShowEditModal: false,
  		editCommentsId: 0
  	});
  };

  //關閉刪除留言modal
  editCommentHandleCancel = e => {
  	// 清空
  	this.setState({
  		isShowEditModal: false,
  		editCommentsId: 0
  	});
  };

  //關閉作品內容
  handleCancel = e => {
  	document.getElementById('cardInfo').style.display = 'none';
  };

  //留言欄內容更改
  handleChange = e => {
  	this.setState({
  		value: e.target.value
  	});
  };

  //留言送出
  handleSubmit = () => {
  	if (!this.state.value) {
  		return;
  	}
  	const { craftComment } = this.props;
  	let payload = { craftId: this.props.craftId, form: { context: this.state.value } };

  	// 專案留言
  	craftComment(payload, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		value: ''
  	});
  	this.formRef.current.resetFields();
  };

  // 留言下拉式選單
  handleMenuClick = (id, e) => {
  	switch (e.key) {
  	case '1':
  		// 顯示檢舉留言modal
  		this.setState({
  			isShowModal: true,
  			reportCommentsId: id
  		});
  		break;
  	case '2':
  		// 顯示編輯留言modal
  		this.setState({
  			isShowEditModal: true,
  			editCommentsId: id
  		});
  		break;
  	case '3':
  		// 顯示刪除留言modal
  		this.setState({
  			isShowDelModal: true,
  			deleteCommentsId: id
  		});
  		break;

  	default:
  		break;
  	}
  }

  render() {
  	const { modalRadioValue, modalValue } = this.state;
  	const { craftInfo, allReportType, memberInfo } = this.props;

  	// 本人留言下拉式選單
  	const myComment = (commentId) => (
  		<Menu onClick={this.handleMenuClick.bind(this, commentId)}>
  			<Menu.Item key="2">
  				<EditOutlined />
            編輯
  			</Menu.Item>
  			<Menu.Item key="3">
  				<DeleteOutlined />
          刪除
  			</Menu.Item>
  		</Menu>
  	);
  	// 他人留言下拉式選單
  	const otherComment = (commentId) => (
  		<Menu onClick={this.handleMenuClick.bind(this, commentId)}>
  			<Menu.Item key="1">
  				<WarningOutlined />
            舉報
  			</Menu.Item>
  		</Menu>
  	);

  	// 取得會員資訊、專案資訊、舉報項目並塞資料
  	let userrInfo, info, reportItem;
  	if (memberInfo) {
  		userrInfo = memberInfo;
  	}
  	if (craftInfo) {
  		info = <div className='cardContent' id='cardModal' name={craftInfo.craftId}>
  			<div className='craftUser'>
  				<Avatar size={40} src={craftInfo.userImgUrl} className='userAvatar' />
  				<p className='userName'>{craftInfo.userName}</p>
  			</div>
  			<div className='cardBody'>
  				<Row>
  					<Col lg={12} md={24} sm={24} xs={24}>
  						<Carousel imgs={craftInfo.craftImg} />
  					</Col>
  					<Col lg={12} md={24} sm={24} xs={24}>
  						<div className='craftInfo'>
  							<div className='craftTitle'>{craftInfo.craftName}</div>
  							<div className='info'>
  								{craftInfo.craftIntro}
  							</div>
  							<div className='userInfo'>
  								<Row>
  									<Col lg={6} md={6} sm={6} xs={8}>
  										<Avatar size={70} src={craftInfo.userImgUrl} className='userAvatar' />
  									</Col>
  									<Col lg={18} md={18} sm={18} xs={16}>
  										<div className='workShop'>
  											{craftInfo.userWorkshop}
  										</div>
  										<div className='userName'>
  											{craftInfo.userName}
  										</div>
  										<div className='follow'>
  											<Button name={craftInfo.userId} id='follow' className={craftInfo.isFollow ? 'isFollow' : null} type="primary" size={'small'} icon={<PlusOutlined />} onClick={this.handleFollow}>{craftInfo.isFollow ? '正在關注' : '關注創作人'}</Button>
  										</div>
  									</Col>
  								</Row>
  								<Row>

  								</Row>
  								<Row gutter={8}>
  									<div className='userIntro'>
  										{craftInfo.userIntro}
  									</div>
  								</Row>
  								<Row gutter={8}>
  									<Col lg={{ span: 10, offset: 2 }} md={{ span: 10, offset: 2 }} sm={{ span: 10, offset: 2 }} xs={{ span: 10, offset: 2 }}>
  										<Button name={craftInfo.craftId} id='save' className={craftInfo.isKeep ? 'isSave' : null} size={'large'} onClick={this.handleSave}>{craftInfo.isKeep ? '已收藏' : '收藏專案'}</Button>
  									</Col>
  									<Col lg={{ span: 10, offset: 2 }} md={{ span: 10, offset: 2 }} sm={{ span: 10, offset: 2 }} xs={{ span: 10, offset: 2 }}>
  										<Button name={craftInfo.craftId} id='like' className={craftInfo.isLike ? 'isLike' : null} size={'large'} onClick={this.handleLike}>{craftInfo.isLike ? '已讚賞' : '讚賞專案'}</Button>
  									</Col>
  								</Row>
  							</div>
  						</div>
  					</Col>
  				</Row>
  				<Row gutter={16}>
  					<Col lg={14} md={14} sm={24} xs={24}>
  						<div className='comment'>

  							{localStorage.getItem('token') ?
  								<div className='commentBox'>
  									<Row gutter={8}>
  										<Col className='addCommentAvatar' span={6}>
  											<Avatar size={50} src={userrInfo.photo} className='userAvatar' />
  										</Col>
  										<Col span={18}>
  											<div className='addComment'>
  												<Form
  													ref={this.formRef}
  													className='commentForm'
  													initialValues={{
  														comment: ''
  													}}
  												>
  													<Form.Item
  														name="comment">
  														<textarea className='commentTextArea' rows={3} onChange={this.handleChange} />
  													</Form.Item>
  													<Form.Item className='addBtn'>
  														<Button name={craftInfo.craftId} className='comments' htmlType="submit" onClick={this.handleSubmit} type="primary">
                                送出留言
  														</Button>
  													</Form.Item>
  												</Form>
  											</div>
  										</Col>
  									</Row>
  								</div>
  								: null}

  							<div className='commentList'>
  								{
  									craftInfo.commentList.map((item, index) => {
  										return (<Row className='commentItem' key={index} gutter={8}>
  											<Col span={6} className='commentAvatar'>
  												<Avatar size={50} src={item.commentUserImage} className='userAvatar' />
  											</Col>
  											<Col span={18}>

  												<div className='commentInfo'>
  													<strong>{item.commentUser}</strong><small>  {handleTime(item.commentTime)}</small>

  													{
  														memberInfo?
  															<Dropdown className="beRight" overlay={item.isMyself?myComment(item.commentId):otherComment(item.commentId)}>
  																<MoreOutlined id={item.commentId} />
  															</Dropdown>:null
  													}

  												</div>
  												<div className='commmentText'>
  													{item.commentText}
  												</div>
  											</Col>
  										</Row>);
  									})
  								}


  							</div>
  						</div>
  					</Col>
  					<Col lg={1} md={1} sm={0} xs={0}></Col>
  					<Col lg={9} md={9} sm={24} xs={24}>
  						<div className='countBox'>
  							<strong>{craftInfo.craftName}</strong>
  							<div className='counts'>
  								<HeartOutlined /> {craftInfo.likes}&nbsp;
  								<EyeOutlined /> {craftInfo.views}&nbsp;
  								<MessageOutlined /> {craftInfo.comments}&nbsp;
  							</div>
  							<div className='craftTime'>發佈日期: {handleTime(craftInfo.uploadTime)}</div>
  						</div>

  						<div className='tagBox'>
  							<strong>類別</strong><br />
  							{
  								craftInfo.types.map((item) => {
  									return (<Button key={item} className='tagBtn' size='small'>{item}</Button>);
  								})
  							}
  						</div>

  						<div className='projectInfo'>
  							{
  								memberInfo?
  									<Button id={craftInfo.craftId} type="text" icon={<WarningOutlined />} className='report' onClick={this.showProjectModal}>舉報</Button>
  									:null
  							}

  							{
  								memberInfo.userId === craftInfo.userId ?
  									<div>
  										<Button id={craftInfo.craftId} type="text" icon={<EditOutlined />} className='report' onClick={this.showProjectModal}>編輯</Button>
  										<Button id={craftInfo.craftId} type="text" icon={<DeleteOutlined />} className='report' onClick={this.showProjectModal}>刪除</Button>
  									</div>
  									:null
  							}
  						</div>

  					</Col>

  				</Row>
  			</div>
  		</div>;
  	}
  	if (allReportType) {
  		reportItem = allReportType.map((item, index) => {
  			return (
  				<Radio.Button key={index} value={item.reportTypeId}>{item.reportTypeName}</Radio.Button>
  			);
  		});
  	}

  	return (
  		<div id='cardInfo' style={{ display: 'none' }}>
  			<div className='cardMask'>
  				{info}
  			</div>
  			<div className='cardBtn'>
  				<a className="closeBtn" type='button' onClick={this.handleCancel}>
  					<CloseOutlined />
  				</a>
  			</div>

  			<Modal
  				className="projectModel"
  				title="舉報留言"
  				visible={this.state.isShowModal}
  				onOk={this.modelHandleOk}
  				onCancel={this.modelHandleCancel}
  				width={420}
  				footer={[
  					<Button key="back" onClick={this.modelHandleCancel}>
                取消
  					</Button>,

  					(modalRadioValue && (modalRadioValue !== 1 || modalValue)) ?
  						<Button key="submit" type="primary" onClick={this.modelHandleOk} >
                  送出
  						</Button> :
  						<Button key="submit" type="primary" onClick={this.modelHandleOk} disabled>
                  送出
  						</Button>
  				]}
  			>
  				<Radio.Group size="large" buttonStyle="solid" onChange={this.handleRadioChange} value={this.state.modalRadioValue}>

  					{
  						reportItem
  					}

  				</Radio.Group>

  				<TextArea className="model-textArea" placeholder='更多說明...' onChange={this.handleTextareaChange} value={this.state.modalValue} />
  			</Modal>

  			<Modal
  				className="projectModel"
  				title="舉報專案"
  				visible={this.state.isShowProjectModal}
  				onOk={this.projectModelHandleOk}
  				onCancel={this.projectModelHandleCancel}
  				okType=""
  				width={420}
  				footer={[
  					<Button key="back" onClick={this.projectModelHandleCancel}>
                取消
  					</Button>,

  					(modalRadioValue && (modalRadioValue !== 1 || modalValue)) ?
  						<Button key="submit" type="primary" onClick={this.projectModelHandleOk} >
                  送出
  						</Button> :
  						<Button key="submit" type="primary" onClick={this.projectModelHandleOk} disabled>
                  送出
  						</Button>
  				]}
  			>
  				<Radio.Group size="large" buttonStyle="solid" onChange={this.handleRadioChange} value={this.state.modalRadioValue}>
  					{
  						reportItem
  					}
  				</Radio.Group>

  				<TextArea className="model-textArea" placeholder='更多說明...' onChange={this.handleTextareaChange} value={this.state.modalValue} />

  			</Modal>

  			<Modal
  				className="projectModel"
  				title="刪除留言"
  				visible={this.state.isShowDelModal}
  				onOk={this.delCommentModelHandleOk}
  				onCancel={this.delCommentHandleCancel}
  				okType=""
  				width={420}
  				footer={[
  					<Button key="back" onClick={this.delCommentHandleCancel}>
                取消
  					</Button>,
  					<Button key="submit" type="primary" onClick={this.delCommentModelHandleOk}>
                刪除
  					</Button>
  				]}
  			>確定要刪除該留言嗎?</Modal>

  			<Modal
  				className="projectModel"
  				title="編輯留言"
  				visible={this.state.isShowEditModal}
  				onOk={this.editCommentModelHandleOk}
  				onCancel={this.editCommentHandleCancel}
  				okType=""
  				width={420}
  				footer={[
  					<Button key="back" onClick={this.editCommentHandleCancel}>
                取消
  					</Button>,
  					<Button key="submit" type="primary" onClick={this.editCommentModelHandleOk}>
                編輯
  					</Button>
  				]}
  			>
  				<Input id='editComment' placeholder="請重新輸入留言" />
  			</Modal>

  		</div>

  	);
  }
}


// 圖片輪播
class Carousel extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			className: 'image-carousel',
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 2000
		};
		const { imgs } = this.props;
		let img;
		if (imgs) {
			img = imgs.map((item, index) => {
				return (<img key={index} className='image' src={item} alt={index} />);
			});
		}
		return (
			<Slider {...settings}>
				{img}
			</Slider>
		);
	}
}
