import axios from 'axios';
import { baseUrl } from './BaseUrl';
// console.log(baseUrl);

//board API -- 조회순 첫번째 목록
export const findBoardAll = () => {
	const result = axios.get(baseUrl + 'board');
	return result;
};

//board API -- 조회순 첫번째 이후 목록
export const findBoardAllAfter = (page) => {
	const result = axios.get(baseUrl + 'board', {
		params: {
			id: page.id,
			createAt: page.createAt,
		},
	});
	return result;
};
