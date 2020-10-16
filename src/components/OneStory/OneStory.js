import React, { Component } from 'react';
import {
	Avatar,
	Tag,
	Tooltip
} from 'antd';
import {
	CloseOutlined
} from '@ant-design/icons';
import { handleTime } from '../../assets/normal';
import './OneStory.less';

export default class OneStory extends Component {

	render() {
		const { closeStory, story } = this.props;

		// 取得限時動態並塞資料
		let info;
		if(story){
			info =<div className='showStory'>
				<div className="storyCard" style={{ backgroundImage: `url(${story.storyImageUrl})` }}>
					<div className="storyInfo">
						<Avatar size={40} className='userAvatar' src={story.storyOwnerPhotoUrl} />
						<p className='userName'>{story.storyOwnerName}</p>
						<small>{handleTime(story.createTime)}</small>
					</div>
				</div>

				<div className="storyTagBox">
					<div className="box">
						<span className="storyTagBox-label">類別:</span>{story.storyTypeName}
					</div>
                標籤:
					{story.storyTag.map((tag) => {
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
				<div className='cardBtn'>
					<a className="closeBtn" type='button' onClick={closeStory}>
						<CloseOutlined />
					</a>
				</div>
			</div>;
		}
		return (
			<div className='oneStory'>
				{info}
			</div>
		);
	}
}
