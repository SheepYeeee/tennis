import React, { Component } from 'react';
import {
	Avatar,
	Typography,
	Row,
	Col
} from 'antd';
import './ListContent.less';

export default class ListContent extends Component {
	render() {
		const { Text } = Typography;
		const { avatar, name, time, text, notReadCount } = this.props;
		return (
			<div className='ListContent'>
				<Row type="flex" align="middle">
					<Col>
						<Avatar size={40} src={avatar} />
					</Col>
					<Col className="info-text">
						<Row justify="space-between">
							<Col flex="auto"><a>{name}</a>&nbsp;{notReadCount!=='0'?`(${notReadCount})`:null}</Col>
							<Col flex="72px" className="info-time"><Text type="secondary">{time}</Text></Col>
						</Row>
						<Row>
							<Col>{text}</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}