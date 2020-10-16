import React, { Component } from 'react';
import {
	Card,
	Typography
} from 'antd';
import './NoSelect.less';

export default class NoSelect extends Component {
	render() {
		const { Title } = Typography;
		return (
			<Card className="noSelect">
				<Title className="card-text" level={4} type="secondary">沒有選取任何訊息</Title>
			</Card>
		);
	}
}
