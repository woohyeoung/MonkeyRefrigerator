//Refrigerator.js
//Install Component
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import gsap from 'gsap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { mdiTag } from '@mdi/js';
import Icon from '@mdi/react';

//User Component
import headerIcon from '../../assets/monkey_3.png';
//Style
import './Refrigerator.css';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { searchMaterialList } from '../../store/actions/BoardAction';
import {
	userMaterialOne,
	userMaterialUserId,
	deleteUserGetMaterial,
	searchRefrigerator,
} from '../../store/actions/UserAction';

import { useHistory } from 'react-router-dom';
import Loading from '../shared/CustomLoading';
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const Refrigerator = () => {
	const tokenStore = useSelector((state) => state.tokenReducer);
	const userStore = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();

	const [style, setStyle] = useState('hidden');
	//모달 flag
	const [flag, setFlag] = useState(false);
	//회원이 가지고 있는 재료
	const [materialList, setMaterialList] = useState([]);

	const [token, setToken] = useState(Cookies.get('accessToken'));

	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');

	const [refrigeratorList, setRefrigeratorList] = useState([]);

	//첫 렌더링
	useEffect(() => {
		setText('회원 재료 불러오는중...');
		setLoading(true);
		setTimeout(() => {
			dispatch(userMaterialUserId(token));
			setLoading(false);
		}, 1000);
	}, [dispatch]);

	//토큰 변경시 토큰 받기
	useEffect(() => {
		if (token === undefined && tokenStore.token !== null) {
			setToken(tokenStore.token);
		}
	}, [tokenStore]);

	useEffect(() => {
		setTimeout(() => {
			if (userStore.userMaterialList.data.data.result) {
				setMaterialList([...userStore.userMaterialList.data.data.result]);
			}
		}, 500);
	}, [materialList]);

	// useEffect(() => {
	// 	if (useStore.userRefrigeratorList.data.data.result) {
	// 		setRefrigeratorList([...useStore.userRefrigeratorList.data.data.result]);
	// 	}
	// }, [useStore.userRefrigeratorList.data]);

	const modalRef = useRef(null);
	const onClickHandler = (type) => {
		switch (type) {
			case 'SAVE':
				return window.confirm('선택한 재료를 사용하여 검색하시겠습니까?') ? (
					onSelectMain()
				) : (
					<></>
				);
			case 'CANCEL':
				return alert('취소버튼 눌렀음');
			default:
				return;
		}
	};
	const Modalstyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};
	const onSelectMain = () => {
		if (materialList.length === 0) {
			window.alert('재료는 한개 이상 있어야 검색이 가능합니다.');
			return;
		}
		handleOpen();
	};

	const mainMateRef = useRef();
	const onClickMainMate = (item) => {
		let a = window.confirm(item.keyName + '을 주재료로 선택 하시겠습니까?');
		if (!a) {
			return;
		}
		let data = {
			token: token,
			item: item,
		};
		setText('레시피 검색중입니다...');
		setLoading(true);
		setTimeout(() => {
			dispatch(searchRefrigerator(data));
			setLoading(false);
			setOpen2(true);
		}, 1000);
	};
	const [open2, setOpen2] = useState(false);
	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => {
		setOpen2(false);
	};
	const Modalstyle2 = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 1000,
		bgcolor: 'background.paper',
		border: '1px solid #d3d3d3',
		boxShadow: 24,
		p: 4,
	};

	const display = useCallback(() => {
		if (flag) {
			setTimeout(() => {
				setStyle('visible');
			}, 250);
			gsap.fromTo(modalRef.current, { x: 0, y: -200 }, { x: 250, y: -200 });
		} else {
			setTimeout(() => {
				setStyle('hidden');
			}, 250);
			gsap.fromTo(modalRef.current, { x: 250, y: -200 }, { x: 0, y: -200 });
		}
	}, [flag]);
	useEffect(() => {
		display();
	}, [flag]);

	const [deleteflag, setDeleteFlag] = useState(false);
	const [deleteData, setDeleteData] = useState({});
	const deleteMaterial = async (data) => {
		if (window.confirm('정말 삭제 하시겠습니까?')) {
			setText('회원 재료 삭제중...');
			setLoading(true);
			setDeleteFlag(true);
			setDeleteData(data);
			setLoading(false);
		} else {
		}
	};
	useEffect(() => {
		if (deleteflag) {
			setTimeout(() => {
				dispatch(deleteUserGetMaterial(deleteData));
				dispatch(userMaterialUserId(token));
			}, 500);
		}
	}, [deleteflag]);

	const door = flag ? { transform: 'rotateY(-160deg)' } : null;
	return (
		<>
			{loading ? (
				<>
					<Loading text={text} />
				</>
			) : (
				<>
					<Modal
						open={open2}
						onClose={handleClose2}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={Modalstyle2}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								<h1>레시피에 만족하시나요?</h1>
								{}
								<Card sx={{ maxWidth: 345, width: 345 }}>
									<CardHeader />
								</Card>
							</Typography>
						</Box>
					</Modal>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={Modalstyle}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								<h1>주재료를 선택</h1>
								{materialList.length > 0 ? (
									<>
										{materialList.map((item, index) => {
											return (
												<div key={index} ref={mainMateRef}>
													<span style={{ margin: '0 10px 0 0' }}>
														{item.id}번 {item.keyName}
													</span>

													<button
														onClick={() => {
															onClickMainMate(item);
														}}
													>
														선택
													</button>
												</div>
											);
										})}
									</>
								) : (
									<></>
								)}
							</Typography>
						</Box>
					</Modal>

					<div className="compartmentRefri">
						<div className="refriHeader">
							<img src={headerIcon} alt="headerIcon" />
							<h3>냉장고 문을 열어 재료들을 넣어주세요!(최대 : 5)</h3>
							<h5 style={{ color: 'red' }}>
								남은 용량 : {5 - materialList.length}
							</h5>
						</div>
						<table className="drawer">
							<thead></thead>
							<tbody>
								<tr className="topSpace">
									<td>
										<div>
											<div className="refriDoor">
												<div
													className="refriOuter"
													onClick={() => {
														flag ? setFlag(false) : setFlag(true);
													}}
													style={door}
												></div>
												<div
													className="refriInner"
													style={{ cursor: 'Default' }}
												>
													{materialList.length > 0 ? (
														<>
															{materialList.map((item, index) => {
																return (
																	<>
																		<div
																			style={{
																				display: 'flex',
																			}}
																		>
																			<div style={{}}>
																				<Icon
																					path={mdiTag}
																					title="profile"
																					size={1}
																					color="white"
																				/>
																				{item.keyName}
																			</div>
																			<button
																				onClick={() => {
																					let data = {
																						token: token,
																						materialId: item.materialId,
																					};
																					console.log(data.token);
																					deleteMaterial(data);
																				}}
																			>
																				x
																			</button>
																		</div>
																	</>
																);
															})}
														</>
													) : (
														<></>
													)}
												</div>
											</div>
										</div>

										<div
											className="searchModal"
											style={{ overflow: style, transition: '0.4s' }}
											ref={modalRef}
										>
											<SearchModal
												flag={flag}
												materialList={materialList}
												token={token}
											/>
										</div>
									</td>
								</tr>
								<tr className="bottomSpace">
									<td></td>
								</tr>
							</tbody>
						</table>
						<div className="refriBtn">
							<ThemeProvider theme={theme}>
								<Button
									onClick={() => onClickHandler('SAVE')}
									variant="contained"
									color="main"
								>
									레시피 검색
								</Button>
								&nbsp;
								{/* <Button
									onClick={() => onClickHandler('CANCEL')}
									variant="outlined"
									color="main"
								>
									취소
								</Button> */}
							</ThemeProvider>
						</div>
					</div>
				</>
			)}
		</>
	);
};

const SearchModal = (props) => {
	const boardStore = useSelector((state) => state.boardReducer);
	const userStore = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();
	let history = useHistory();

	const [keyword, setKeyword] = useState('');
	const [materialList, setMaterialList] = useState([...props.materialList]);
	const [searchList, setSearchList] = useState([]);
	const [_selectMaterial, _setSelectMaterial] = useState({});
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState(props.token);

	// 재료 검색 - api
	const searchKeyword = () => {
		if (keyword === '') {
			window.alert('한글자 이상의 키워드를 입력해주세요.');
			return;
		}
		dispatch(searchMaterialList(keyword));
	};

	// 재료 검색 바뀔때 마다
	useEffect(() => {
		setTimeout(() => {
			if (boardStore.searchMaterialList.data) {
				setSearchList(boardStore.searchMaterialList.data.data.result);
			}
		}, 500);
	}, [boardStore.searchMaterialList.data]);

	// useEffect(() => {
	// 	if (userStore.userMaterialList.data) {
	// 		setMaterialList([...userStore.userMaterialList.data.data.result]);
	// 	}
	// }, [userStore.userMaterialList.data]);

	const [style, setStyle] = useState(0);
	const searchKind = [
		{ field: 'id', headerName: '번호', width: 90 },
		{
			field: 'keyName',
			headerName: '재료명',
			sortable: false,
			width: 200,
			valueGetter: (params) => `${params.row.keyName || ''}`,
		},
	];
	useEffect(() => {
		props.flag
			? setTimeout(() => {
					setStyle(200);
			  }, 500)
			: setStyle(0);
	});

	const onKeyPress = (e) => {
		if (e.key == 'Enter') {
			searchKeyword();
		}
	};

	// 검색 키워드
	const handleChangeSearch = (event) => {
		setKeyword(event.target.value);
	};
	const searchInput = useRef();
	const dataGridRef = useRef();

	//재료 선택
	const selectMaterial = (e) => {
		console.log(e);
		_setSelectMaterial({ id: e.row.id, keyName: e.row.keyName });
		handleOpen();
	};

	const Modalstyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		_setSelectMaterial({});
	};

	const pickMaterial = async () => {
		if (materialList.length === 5) {
			window.alert('5개 이상은 넣을 수 업습니다.');
			return;
		}

		const idx = materialList.findIndex((item) => {
			return item.materialId === _selectMaterial.id;
		});

		if (idx === -1) {
			const data = {
				token: token,
				material: {
					id: _selectMaterial.id,
				},
			};

			setLoading(true);
			await dispatch(userMaterialOne(data));
			await dispatch(userMaterialUserId(token));
			setLoading(false);

			handleClose();
		} else {
			window.alert('이미 담겨져 있는 재료입니다');
			handleClose();
			return;
		}
	};
	return (
		<>
			{loading ? (
				<>
					<Loading text={'재료 저장중입니다...'} />
				</>
			) : (
				<div>
					<div className="modalContainer">
						<div>
							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<Box sx={Modalstyle}>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2"
									>
										재료 [
										{_setSelectMaterial ? (
											<>{_selectMaterial.keyName}</>
										) : (
											<></>
										)}
										] 을(를) 넣으시겠습니까?
									</Typography>
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										<Button onClick={pickMaterial}>확인</Button>
										<Button onClick={handleClose}>취소</Button>
									</Typography>
								</Box>
							</Modal>
						</div>
						<TextField
							label="재료 검색"
							type="search"
							variant="outlined"
							helperText="재료명을 입력하세요."
							ref={searchInput}
							value={keyword}
							onChange={handleChangeSearch}
							onKeyPress={onKeyPress}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<div style={{ cursor: 'pointer' }} onClick={searchKeyword}>
											<SearchIcon />
										</div>
									</InputAdornment>
								),
							}}
						/>
						<div style={{ height: style, width: '100%', transition: '0.5s' }}>
							<DataGrid
								onRowClick={selectMaterial}
								rows={searchList}
								columns={searchKind}
								ref={dataGridRef}
								// pageSize={5}
								// rowsPerPageOptions={[5]}
								hideFooterPagination={true}
								hideFooter={true}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
	palette: {
		main: createColor('#9D2437'),
	},
});
