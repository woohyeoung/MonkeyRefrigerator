import axios from 'axios';
import { baseUrl } from './BaseUrl';
// console.log(baseUrl);

//board API
export const findBoardAll = () => {
	const result = axios.get(baseUrl + 'board');
	return result;
};
