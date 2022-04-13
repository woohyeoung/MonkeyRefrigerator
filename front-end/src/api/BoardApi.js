import axios from 'axios';
import { baseUrl } from './BaseUrl';

//board API
export const findBoardAll = () => {
	console.log(baseUrl);
	const result = axios.get(baseUrl + 'board');
	return result;
};
