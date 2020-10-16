import React, { Component } from 'react';
import {
	Avatar,
	Tag,
	Tooltip,
	Button,
	Input,
	Row,
	Col,
	Dropdown,
	Menu,
	message,
	Radio,
	Modal,
	Select
} from 'antd';
import ScrollContainer from 'react-indiana-drag-scroll';
import Slider from 'react-slick';
import { handleTime } from '../../assets/normal';
import TextArea from 'antd/lib/input/TextArea';
import {
	HeartOutlined,
	HeartFilled,
	CloseOutlined,
	WarningOutlined,
	PlusOutlined,
	UserOutlined,
	MoreOutlined,
	UploadOutlined,
	RightOutlined,
	LeftOutlined,
	MessageOutlined,
	ShareAltOutlined,
	DeleteOutlined
} from '@ant-design/icons';

import './Story.less';
const { Option } = Select;

export default class Story extends Component {
  state = {
  	visible: false,
  	loading: false,
  	isAdd: false,
  	fitstType: 1,
  	uploadTags: ['1'],
  	uploadType: 1,
  	uploadImg: '',
  	inputVisible: false,
  	inputValue: '',
  	modalText: '',
  	playList: [],
  	modalRadioValue: '',
  	isShowStoryModal: false,
  	modalValue: '',
  	reportId: 0,
  	isShowDelModal: false,
  	delId: 0,
  	message: ''
  };

  // 輪播設定
  settings = {
  	dots: false,
  	infinite: false,
  	autoplay: true,
  	speed: 1000,
  	autoplaySpeed: 5000,
  	slidesToShow: 1,
  	slidesToScroll: 1,
  	afterChange: index => {
  		// 如果是最後一則限時動態 將在10秒後關閉整個modal
  		setTimeout(() => {
  			const { allStories } = this.props;
  			if ((index + 1) === allStories.length) {
  				this.setState({ visible: false });
  			}
  		}, 5000);
  	}
  }


  constructor(props) {
  	super(props);
  	this.handleNext = this.handleNext.bind(this);
  	this.handlePrev = this.handlePrev.bind(this);
  }

  // 下一個
  handleNext = () => {
  	this.slider.slickNext();
  }
  // 上一個
  handlePrev = () => {
  	this.slider.slickPrev();
  }

  // 切換輪播時
  onChangeStory = index => {
  	if (index === undefined) {
  		index = 0;
  	}
  	// 先歸零
  	this.setState({ seconds: 0 });

  	if (this.state.seconds < 100) {
  		// 讀條
  		const upTime = () => {
  			this.setState({ seconds: this.state.seconds + 1 });
  			if (this.state.seconds < 100) {
  				setTimeout(upTime, 50);
  			} else if (this.state.seconds === 100) {
  				this.setState({ seconds: 0 });
  				// 如果是最後一則限時動態 將在10秒後關閉整個modal
  				if ((index + 1) === this.state.playList.length) {
  					this.isShow();
  				} else {
  					this.handleNext();
  				}
  			}
  		};
  		upTime();
  	}

  }

  // 顯示限時動態
  isShow = (types, index) => {
  	let type;
  	switch (types) {
  	case 'userStory':
  		type = 'userId';
  		break;
  	case 'typeStory':
  		type = 'typeId';
  		break;
  	default:
  		break;
  	}
  	let payload = {
  		type: type,
  		id: index
  	};
  	// 取的story
  	const { getStorys } = this.props;
  	getStorys(payload);

  	if (this.state.visible) {
  		this.setState({ visible: false });
  	} else {
  		this.setState({ visible: true });
  	}
  };

  // 圖片變更&預覽圖片
  loadFile = e => {
  	// 圖片變更
  	this.setState({
  		uploadImg: e.target.files[0]
  	});
  	// 預覽圖片
  	const bk = document.getElementsByClassName('addStoryInfo')[0];
  	bk.style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
  	document.getElementById('uploadItem').style.display = 'none';
  	document.getElementById('btnRow').style.display = 'inline-flex';
  }

  // 顯示新增限時動態
  isAdd = () => {
  	if (this.state.isAdd) {
  		this.setState({ isAdd: false });
  		document.getElementById('btnRow').style.display = 'none';
  		document.getElementById('uploadItem').style.display = 'block';

  	} else {
  		this.setState({ isAdd: true });
  	}
  };

  // 限時動態下拉式選單
  handleMenuClick = (id, e) => {
  	switch (e.key) {
  	case '1':
  		// 顯示刪除story modal
  		this.setState({
  			isShowDelModal: true,
  			delId: id
  		});
  		break;
  	case '2':
  		// 顯示檢舉story modal
  		this.setState({
  			isShowStoryModal: true,
  			reportId: id
  		});
  		break;
  	case '3':
  		message.info('已幫您複製該網址');
  		break;

  	default:
  		break;
  	}
  }

  // 更改舉報modal的radio button
  handleRadioChange = e => {
  	this.setState({
  		modalRadioValue: e.target.value
  	});
  };

  // 更改舉報modal的textarea
  handleTextareaChange = e => {
  	this.setState({
  		modalValue: e.target.value
  	});
  };

  // 送出story檢舉modal
  projectStoryHandleOk = () => {

  	let payload = {
  		storyId: this.state.reportId,
  		data: {
  			reportTypeId: this.state.modalRadioValue,
  			reportText: this.state.modalValue
  		}
  	};
  	// 檢舉story
  	const { reportStory } = this.props;
  	reportStory(payload, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		isShowStoryModal: false,
  		modalRadioValue: '',
  		modalValue: '',
  		reportId: 0
  	});
  };

  // 關閉story檢舉modal
  projectStoryHandleCancel = e => {
  	this.setState({
  		isShowStoryModal: false,
  		modalRadioValue: '',
  		modalValue: ''
  	});
  };

  //送出刪除story
  delStoryHandleOk = () => {

  	let storyId = this.state.delId;

  	// 刪除story
  	const { delStory } = this.props;
  	delStory(storyId, null, (loading) => this.setState({ loading }));

  	// 清空
  	this.setState({
  		isShowDelModal: false,
  		delId: 0,
  		visible: false
  	});
  };

  //關閉刪除story modal
  delStoryHandleCancel = e => {
  	// 清空
  	this.setState({
  		isShowDelModal: false,
  		delId: 0
  	});
  };

  // 關閉限時動態
  handleCancel = e => {
  	this.setState({
  		visible: false
  	});
  };

  // 變更已選type
  handleTypesChange = value => {
  	this.setState({
  		uploadType: value
  	});
  };

  // 變更已選tag
  handleTagsChange = value => {
  	this.setState({
  		uploadTags: value
  	});
  };

  // 新增story表單送出
  onFinish = e => {
  	// 組成form data
  	const payload = new FormData();
  	payload.append('storyImg', this.state.uploadImg);
  	payload.append('type', this.state.uploadType);
  	this.state.uploadTags.map((item) => {
  		payload.append('tags[]', item);
  	});

  	// 新增story
  	const { addStory } = this.props;
  	addStory(payload, null, (loading) => this.setState({ loading }));
  	this.setState({ isAdd: false });
  };

  // story按讚監聽
  onLike = (id) =>{
  	//按讚story
  	const { likeStroy } = this.props;
  	likeStroy(id);

  	// 變更css
  	let heart = document.getElementById(`heart${id}`).querySelector('.anticon-heart');
  	if (heart.style.color === 'rgb(224, 224, 224)'){
  		heart.style.color = 'rgb(255, 0, 0)';
  	}else if(heart.style.color === 'rgb(255, 0, 0)'){
  		heart.style.color = 'rgb(224, 224, 224)';
  	}
  }

  // 輸入message
  keyinMessage = e => {
  	const { value } = e.target;
  	this.setState({
  		message: value
  	});
  }

  // 送出message
  sendMessage = id => {
  	let payload = {
  		storyId: id,
  		data: {
  			context: this.state.message
  		}
  	};
  	// story傳訊
  	const { storySendMessage } = this.props;
  	storySendMessage(payload);
  }

  render() {
  	const { visible, isAdd, fitstType, modalValue, modalRadioValue } = this.state;
  	const { typeList, memberInfo, allStoryTag, allStories, userStoryCircle, allReportType, myStoryCircle, typeStoryCircle } = this.props;

  	// 下拉是選單item
  	let menu = (storyId, owerId) => (
  		<Menu onClick={this.handleMenuClick.bind(this, storyId)}>
  			{memberInfo.userId === owerId ? <Menu.Item key="1">
  				<DeleteOutlined />
          		刪除
  			</Menu.Item> : <Menu.Item key="2">
  				<WarningOutlined />
          		舉報
  			</Menu.Item>}

  			<Menu.Item key="3">
  				<ShareAltOutlined />
          		分享
  			</Menu.Item>
  		</Menu>
  	);

  	// 取得舉報項目並塞資料
  	let reportItem;
  	if (allReportType) {
  		reportItem = allReportType.map((item, index) => {
  			return (
  				<Radio.Button key={index} value={item.reportTypeId}>{item.reportTypeName}</Radio.Button>
  			);
  		});
  	}

  	// 取得story並塞資料
  	let stories;
  	if (allStories) {
  		stories = allStories.map((item, index) => {
  			return (
  				<div key={index}>
  					<div className="storyCard" style={{ backgroundImage: `url(${item.storyImageUrl}) ` }}>
  						<div className="storyInfo">
  							<Avatar size={30} className='userAvatar' src={item.storyOwnerPhotoUrl} />
  							<p className='userName'>{item.storyOwnerName}</p>
  							<small>{handleTime(item.createTime)}</small>
  							
  							<Dropdown className="beRight" overlay={menu(item.storyId, item.storyOwnerId)}>
  								<MoreOutlined />
  							</Dropdown>

  							{memberInfo && memberInfo !== '' && (memberInfo.userId !== item.storyOwnerId)?
  								<div className="progress">
  									<Row gutter={8}>
  										<Col span={6}> <Button onClick={this.onLike.bind(this,item.storyId)} id={'heart'+item.storyId} shape="circle" icon={item.isLike?<HeartFilled style={{color: '#FF0000'}} />:<HeartFilled style={{color: '#e0e0e0'}} />} /> </Col>
  										<Col span={18}> 
  											<Input
  												onChange={this.keyinMessage}
  												onPressEnter={this.sendMessage.bind(this, item.storyId)}
  												placeholder="send message"
  												prefix={<MessageOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
  											/>
  										</Col>
  									</Row>
  								</div>:null
  							}
  						</div>
  					</div>

  					<div className="storyTagBox">
  						<div className="box">
  							<span className="storyTagBox-label">類別:</span>{item.storyTypeName}
  						</div>
              			標籤:
  						{item.storyTag.map((tag) => {
  							const isLongTag = tag.length > 20;
  							const tagElem = (
  								<Tag key={tag.tagId}>
  									{isLongTag ? `${tag.content.slice(0, 20)}...` : tag.content}
  								</Tag>
  							);
  							return isLongTag ? (
  								<Tooltip title={tag.content} key={tag.tagId}>
  									{tagElem}
  								</Tooltip>
  							) : (
  								tagElem
  							);
  						})}
  					</div>
  				</div>
  			);
  		});
  	}

  	// 取得所有類別並塞資料
  	let inputTypes;
  	if (typeList) {
  		inputTypes = typeList.map((type, index) => {
  			return (
  				<Option key={index} value={type.typesId} label={type.typesName}>{type.typesName}</Option>
  			);
  		});
  	} 

  	// 取得標籤選項並塞資料
  	let inputTags;
  	if (allStoryTag) {
  		inputTags = allStoryTag.map((tag, index) => {
  			return (
  				<Option key={index} value={tag.storyTagId} label={tag.tagContent}>
  					{tag.tagContent}
  				</Option>
  			);
  		});
  	}

  	// 取得所有story圈圈並塞資料
  	let userCircle, typeCircle,myCircle;
  	if(userStoryCircle){
  		userCircle = userStoryCircle.map((item)=>{
  			return(
  				<div className='storyCircle ' key={item.storyOwnerUserId} tabIndex='0'>
  					<div className="story userStory" id={item.storyOwnerUserId} onClick={this.isShow.bind(this,'userStory', item.storyOwnerUserId)}>
  						<Avatar size={50} src={item.storyOwnerPhotoUrl} />
  					</div>
  					<p>{item.storyOwnerName}</p>
  				</div>
  			);
  		});


  	}
  	if (typeStoryCircle) {
  		typeCircle = typeStoryCircle.map((item) => {
  			return (
  				<div className='storyCircle ' key={item.typeId} tabIndex='0'>
  					<div className="story typeStory" id={item.typeId} onClick={this.isShow.bind(this,'typeStory', item.typeId)}>
  						<Avatar size={50} src={item.typeImageUrl} />
  					</div>
  					<p>{item.typeName}</p>
  				</div>
  			);
  		});
  	}
  	if (myStoryCircle) {
  		myCircle = myStoryCircle.map((item) => {
  			return (
  				<div className='storyCircle ' key={item.storyOwnerUserId} tabIndex='0'>
  					<div className="story typeStory" id={item.storyOwnerUserId} onClick={this.isShow.bind(this,'userStory', item.storyOwnerUserId)}>
  						<Avatar size={50} src={item.storyOwnerPhotoUrl} />
  					</div>
  					<p>{item.storyOwnerName}</p>
  				</div>
  			);
  		});
  	}
    
  	return (
  		<div className='stories' tabIndex='0'>

  			<ScrollContainer className="scroll-container">
  				{
  					localStorage.getItem('token')?
  						<div className='addStory'>
  							<Avatar size={60} icon={<PlusOutlined />} onClick={this.isAdd} tabIndex='0' />
  						</div>
						
  						:null
  				}

  				{myCircle}{userCircle}{typeCircle}
  			</ScrollContainer>

  			{visible ? <div className="showStory">
  				<Slider ref={c => (this.slider = c)} {...this.settings} >
  					{stories}
  				</Slider>
  				<div className='cardBtn'>
  					<a className="closeBtn" type='button' onClick={this.handleCancel}>
  						<CloseOutlined />
  					</a>
  					<a className="nextBtn" type='button' onClick={this.handleNext} >
  						<RightOutlined />
  					</a>
  					<a className="prevBtn" type='button' onClick={this.handlePrev}>
  						<LeftOutlined />
  					</a>
  				</div>

  			</div> : null}

  			{isAdd ? <div className="showAddStory">
  				<form onSubmit={this.onFinish}>
  					<div className="storyCard">
  						<div className="addStoryInfo">

  							<label id='uploadItem'>
  								<UploadOutlined style={{ fontSize: '50px', color: '#08c', marginTop: '2em', marginBottom: '5px' }} />
  								<br />
								  <input className='image' id='addStoryImg' type="file" accept="image/*" onChange={this.loadFile} />
                      				點擊或拖曳來上傳圖片<br />
  								<small>
									快速分享您正在創作的內容<br />
									創作中的作品片段會在 24 小時後到期
  								</small>
  							</label>

  						</div>
  						<Row id='btnRow' gutter={16}>
  							<Col span={12}><Button onClick={this.isAdd}>取消</Button></Col>
  							<Col span={12}><Button onClick={this.onFinish} type="submit">上傳</Button></Col>
  						</Row>
  					</div>

  					<div className='cardBtn'>
  						<a className="closeBtn" type='button' onClick={this.isAdd}>
  							<CloseOutlined />
  						</a>
  						<div className="tagBox">
  							<div className="box">
  								<span className="tagBox-text">選擇類別:</span>
  								<Select defaultValue={fitstType} className='tagBox-select-type' size="small" placeholder="type" onChange={this.handleTypesChange}>
  									{inputTypes}
  								</Select>
  							</div>
  							<div className="box">
  								<span className="tagBox-text">新增標籤:</span>
  								<Select
  									className='tagBox-select-tag'
  									mode="multiple"
  									size="small"
  									defaultValue={fitstType}
  									placeholder="add tag"
  									onChange={this.handleTagsChange}
  									optionLabelProp="label"
  								>
  									{inputTags}
  								</Select>
  							</div>
  						</div>

  					</div>
  				</form>
  			</div> : null}

  			<Modal
  				className="projectModel"
  				title="舉報限時動態"
  				visible={this.state.isShowStoryModal}
  				onOk={this.projectStoryHandleOk}
  				onCancel={this.projectStoryHandleCancel}
  				width={420}
  				footer={[
  					<Button key="back" onClick={this.projectStoryHandleCancel}>
              取消
  					</Button>,

  					(modalRadioValue && (modalRadioValue !== 1 || modalValue)) ?
  						<Button key="submit" type="primary" onClick={this.projectStoryHandleOk} >
                送出
  						</Button> :
  						<Button key="submit" type="primary" onClick={this.projectStoryHandleOk} disabled>
                送出
  						</Button>
  				]}>
  				<Radio.Group buttonStyle="solid" size="large" onChange={this.handleRadioChange} value={this.state.modalRadioValue}>

  					{
  						reportItem
  					}

  				</Radio.Group>

  				<TextArea className="model-textArea" placeholder='更多說明...' onChange={this.handleTextareaChange} value={this.state.modalValue} />
  			</Modal>

  			<Modal
  				className="delModel"
  				title="刪除限時動態"
  				visible={this.state.isShowDelModal}
  				onOk={this.delStoryHandleOk}
  				onCancel={this.delStoryHandleCancel}
  				okType=""
  				width={420}
  				footer={[
  					<Button key="back" onClick={this.delStoryHandleCancel}>
              取消
  					</Button>,
  					<Button key="submit" type="primary" onClick={this.delStoryHandleOk}>
              刪除
  					</Button>
  				]}
  			>確定要刪除該限時動態嗎?</Modal>

  		</div>
  	);
  }
}
