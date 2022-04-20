//Refrigerator.js
//Install Component
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import gsap from 'gsap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

//User Component
import headerIcon from '../../assets/monkey_3.png';
//Style
import './Refrigerator.css';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { searchMaterialList } from '../../store/actions/BoardAction';
import {
	findUserMaterialUserId,
	saveUserMaterialOne,
} from '../../store/actions/UserAction';

import { useHistory } from 'react-router-dom';

export const Refrigerator = () => {
	const boardStore = useSelector((state) => state.boardReducer);
	const tokenStore = useSelector((state) => state.tokenReducer);
	const dispatch = useDispatch();

	const [style, setStyle] = useState('hidden');
	const [flag, setFlag] = useState(false);

	const modalRef = useRef(null);
	const onClickHandler = (type) => {
		switch (type) {
			case 'SAVE':
				return window.confirm('선택한 재료를 사용하여 검색하시겠습니까?')
					? alert('이동안하지롱')
					: alert('선택완료 후 저장버튼을 눌러주세요.');
			case 'CANCEL':
				return alert('취소버튼 눌렀음');
			default:
				return;
		}
	};

	useEffect(() => {
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
	});
	return (
		<div className="compartmentRefri">
			<div className="refriHeader">
				<img src={headerIcon} alt="headerIcon" />
				<h3>냉장고 문을 열어 재료들을 넣어주세요!</h3>
			</div>
			<table className="drawer">
				<thead></thead>
				<tbody>
					<tr className="topSpace">
						<td>
							<div
								onClick={() => {
									flag ? setFlag(false) : setFlag(true);
								}}
							>
								<RefriDoor msg={flag} />
							</div>

							<div
								className="searchModal"
								style={{ overflow: style, transition: '0.4s' }}
								ref={modalRef}
							>
								<SearchModal flag={flag} />
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
						저장
					</Button>
					&nbsp;
					<Button
						onClick={() => onClickHandler('CANCEL')}
						variant="outlined"
						color="main"
					>
						취소
					</Button>
				</ThemeProvider>
			</div>
		</div>
	);
};
const RefriDoor = (props) => {
	const door = props.msg ? { transform: 'rotateY(-160deg)' } : null;
	return (
		<div className="refriDoor">
			<div className="refriOuter" style={door}></div>
			<div className="refriInner"></div>
		</div>
	);
};
const SearchModal = (props) => {
	const boardStore = useSelector((state) => state.boardReducer);
	const tokenStore = useSelector((state) => state.tokenReducer);
	const userStore = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();

	let history = useHistory();

	const [keyword, setKeyword] = useState('');
	const [materialList, setMaterialList] = useState([]);
	const [material, setMaterial] = useState({});
	const [searchList, setSearchList] = useState([]);

	useEffect(() => {
		dispatch(findUserMaterialUserId(tokenStore.token));
	}, []);
	console.log(userStore.userMaterialList.data);
	useEffect(() => {
		if (userStore.userMaterialList.data) {
			setMaterialList([...userStore.userMaterialList.data.data.result]);
		}
	}, [userStore.userMaterialList.data]);

	// 재료 검색 - api
	const searchKeyword = () => {
		dispatch(searchMaterialList(keyword));
	};
	// 재료 검색 바뀔때 마다
	useEffect(() => {
		if (boardStore.searchMaterialList.data) {
			setSearchList(boardStore.searchMaterialList.data.data.result);
		}
	}, [boardStore.searchMaterialList.data]);

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
	const selectMaterial = () => {
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
	const handleClose = () => setOpen(false);
	function redirectHome() {
		history.push('/');
	}
	const pickMaterial = async () => {
		let idx = materialList.findIndex((item) => {
			return item.id === searchList[0].id;
		});
		if (idx == -1) {
			setMaterialList([...materialList, searchList[0]]);

			if (!tokenStore.token || tokenStore.token === null) {
				window.alert('error! login please');
				redirectHome();
			}
			const data = {
				token: tokenStore.token,
				material: {
					id: searchList[0].id,
					keyName: searchList[0].keyName,
				},
			};
			await dispatch(saveUserMaterialOne(data));
			window.alert('상품이 등록되었습니다.');
			handleClose();
		} else {
			<Alert severity="error">This is an error alert — check it out!</Alert>;
			handleClose();
			return;
		}
	};
	console.log(materialList);
	return (
		<div className="modalContainer">
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={Modalstyle}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							재료 [{searchList[0] ? <>{searchList[0].keyName}</> : <></>}]
							을(를) 넣으시겠습니까?
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
