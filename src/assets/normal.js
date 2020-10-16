import moment from 'moment';

//處理時間差(待優化)
export const handleTime = e => {
	const now = moment();
	let time = now.diff(e, 'seconds');
	if (time < 60) {
		time = '幾秒前';
	} else if (time < 3600) {
		time = now.diff(e, 'minutes') + '分鐘前';
	} else {
		time = now.diff(e, 'hours');
		if (time < 24) {
			time += '小時前';
		} else {
			time = now.diff(e, 'days');
			if (time < 30) {
				time += '天前';
			} else if (time < 365) {
				time = moment(e).format('MM-DD');
			} else {
				time = moment(e).format('YYYY-MM-DD');
			}
		}
	}
	return time;
};