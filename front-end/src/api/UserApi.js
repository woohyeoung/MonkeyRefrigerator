import axios from 'axios';
import { baseUrl } from './BaseUrl';

export const getToken = async (data) => {
	const resultLogin = await axios
		.post(`${baseUrl}login`, data)
		.then((promiseData) => promiseData.data)
		.then((resolve) => resolve.result)
		.catch();
	return resultLogin;
};

//signupFrom API - 회원가입
export const insertSignupForm = (data) => {
	const result = axios.post(baseUrl + 'signupInsert', data);
	return result;
};

//user information API - 프로필 조회
export const selectUserInformation = async (token) => {
	const result = axios
		.get(baseUrl + 'profile', {
			headers: {
				accessToken: token,
			},
		})
		.then((res) => res.data)
		.catch();
	return result;
};

//saveUserMaterialOne 회원이 한개의 재료 저장

export const saveUserMaterialOne = (data) => {
	let data_ = {
		material: {
			id: data.material.id,
			keyName: data.material.keyName,
		},
	};
	const result = axios
		.post(baseUrl + 'user/material', data_, {
			headers: {
				accessToken: data.token,
			},
		})
		.catch((err) => {
			console.log(err);
		});
	console.log(result);
	return result;
};

export const findUserMaterialUserId = (token) => {
	const result = axios
		.get(baseUrl + 'user/material', {
			headers: {
				accessToken: token,
			},
		})
		.catch((err) => {
			console.log(err);
		});
	console.log(result);
	return result;
};

//user password change API - 사용자 비밀번호 변경
export const updatePassword = async (data) => {
	//console.log(data);
	// const result = axios
	//   .post(baseUrl + "pwChange", {
	//     body: {
	//       accessToken: token,
	//     },
	//   })
	//   .then((res) => res.data)
	//   .catch();
	return;
};

export const deleteUserGetMaterialUserId = (data) => {
	console.log(data.token);
	const result = axios
		.delete(
			baseUrl + 'user/material',
			{ data },
			{
				headers: {
					accessToken: data.token,
				},
			}
		)
		.catch((err) => {
			console.log(err);
		});
	console.log(result);
	return result;
};
