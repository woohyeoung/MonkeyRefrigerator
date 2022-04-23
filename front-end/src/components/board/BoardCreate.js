//BoardCreate.js
import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	boardSaveOne,
	categoryList,
	searchMaterialList,
} from '../../store/actions/BoardAction';
import { Form, Button } from 'react-bootstrap';
import Card from '@mui/material/Card';
import Icon from '@mdi/react';
import Loading from '../shared/CustomLoading';
import '../shared/loading.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './BoardCreate.css';
import logoImg from '../../assets/monkey_2.png';
import { mdiSilverwareForkKnife } from '@mdi/js';
import { TimePicker } from 'antd';
import moment from 'moment';
import ImageUploader from 'react-images-upload';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function BoardCreate() {
	const boardStore = useSelector((state) => state.boardReducer);
	const tokenStore = useSelector((state) => state.tokenReducer);

	const dispatch = useDispatch();

	let history = useHistory();

	const [loading, setLoading] = useState(false);

	const [title, setTitle] = useState('');

	const [subTitle, setSubTitle] = useState('');

	const [step, setStep] = useState('');
	const [steps, setSteps] = useState([]);

	const [selectCategory, setSelectCategory] = React.useState('');
	// 카테고리 목록
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState({
		id: 0,
		name: '',
	});

	const [selectDifficulty, setSelectDifficulty] = React.useState('');
	const difficultyArr = ['아무나', '초급', '중급', '고급', '신의경지'];
	const [difficulty, setDifficulty] = useState('');

	const [cookTime, setCookTime] = useState('');
	const [selectCookTime, setSelectCookTime] = useState(null);
	const format = 'HH:mm';

	const [keyword, setKeyword] = useState('');
	const [searchList, setSearchList] = useState('');

	const [materialList, setMaterialList] = useState([]);
	const [show, setShow] = useState(false);
	const [materialCount, setMaterialCount] = useState([]);

	const [sub, setSub] = useState('');
	const [subs, setSubs] = useState([]);

	const [tag, setTag] = useState('');
	const [tags, setTags] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [pictures, setPictures] = useState([]);
	const [dataURLs, setDataURLs] = useState([]);
	const onDrop = (pictureFiles, pictureDataURLs) => {
		setPictures([pictureFiles]);
		setDataURLs([pictureDataURLs]);
	};

	//카테고리 목록
	useEffect(() => {
		dispatch(categoryList());
	}, []);

	//카테고리 목록이 바뀔때 마다
	useEffect(() => {
		if (boardStore.categoryList.data) {
			setCategories([...boardStore.categoryList.data.data.result]);
		}
	}, [boardStore.categoryList.data]);

	// 재료 검색 바뀔때 마다
	useEffect(() => {
		if (boardStore.searchMaterialList.data) {
			setSearchList(boardStore.searchMaterialList.data.data.result);
		}
	}, [boardStore.searchMaterialList.data]);

	//제목
	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
	};

	//부제목
	const handleChangeSubTitle = (event) => {
		setSubTitle(event.target.value);
	};
	// 내용
	const handleChangeStep = (event) => {
		setStep(event.target.value);
	};
	// 내용 하나 추가
	const addStep = () => {
		if (step === '') {
			window.alert('한글자 이상 입력하세요');
			return;
		} else {
			setSteps([...steps, step]);
			setStep('');
		}
	};
	// 내용 하나 삭제
	function deleteStep(index) {
		steps.splice(index, 1);
		setSteps([...steps]);
	}
	// 카테고리 선택
	const handleChangeCategory = (event) => {
		setSelectCategory(event.target.value);
		let obj = categories.find((e) => {
			return e.name === event.target.value;
		});
		setCategory({ id: obj.id, name: obj.name });
	};
	// 난이도 선택
	const handleChangeDifficulty = (event) => {
		setSelectDifficulty(event.target.value);
		setDifficulty(event.target.value);
	};
	// 조리시간 선택
	const handleChangeCookTime = (time) => {
		let cTime = time._d.toString().split(' ')[4];
		setSelectCookTime(time);

		function convertTime(time) {
			let arr = time.split(':');
			let hour = Number(arr[0]);
			let minute = Number(arr[1]) ? Number(arr[1]) : '';
			let str = minute
				? hour + '시간 ' + minute + '분 이내'
				: hour + '시간 이내';
			return str;
		}
		let str = convertTime(cTime);
		setCookTime(str);
	};
	// 부재료
	const handleChangeSub = (event) => {
		setSub(event.target.value);
	};
	// 부재료 하나 추가
	const addSub = () => {
		if (sub === '') {
			window.alert('한글자 이상 입력하세요');
			return;
		} else {
			setSubs([...subs, sub]);
			setSub('');
		}
	};
	// 부재료 하나 삭제
	const deleteSub = (index) => {
		subs.splice(index, 1);
		setSubs([...subs]);
	};

	// 태그
	const handleChangeTag = (event) => {
		setTag(event.target.value);
	};
	// 태그 하나 추가
	const addTag = () => {
		if (tag === '') {
			window.alert('한글자 이상 입력하세요');
			return;
		} else {
			setTags([...tags, '#' + tag]);
			setTag('');
		}
	};
	// 태그 하나 삭제
	const deleteTag = (index) => {
		tags.splice(index, 1);
		setTags([...tags]);
	};

	// 재료 검색
	const handleChangeSearch = (event) => {
		setKeyword(event.target.value);
	};
	// 재료 검색 - api
	const searchKeyword = () => {
		dispatch(searchMaterialList(keyword));
	};

	//엔터시 재료 검색
	const onKeyPress = (e) => {
		if (e.key == 'Enter') {
			searchKeyword();
		}
	};

	// 등록폼 검사
	async function validated() {
		if (title === '') {
			window.alert('제목을 입력하세요');
			titleInput.current.focus();
			return false;
		}
		if (subTitle === '') {
			window.alert('부제목을 입력하세요');
			subtitleInput.current.focus();
			return false;
		}
		if (steps.length === 0) {
			window.alert('step을 한개 이상 입력하세요');
			stepInput.current.focus();
			return false;
		}

		if (category.id === 0) {
			window.alert('카테고리를 선택해 주세요');
			return false;
		}

		if (difficulty === '') {
			window.alert('난이도를 선택해 주세요');
			return false;
		}

		if (selectCookTime === null || cookTime === '') {
			window.alert('조리시간을 선택해주세요');
			return false;
		}
		if (materialList.length === 0) {
			window.alert('재료는 한개 이상 넣어주세요');
			return false;
		}

		if (pictures.length === 0) {
			window.alert('1장 이상의 사진을 업로드 해주세요');
			return false;
		}

		if (pictures[0].length === 0) {
			window.alert('1장 이상의 사진을 업로드 해주세요');
			return false;
		}

		if (pictures.length > 5) {
			window.alert('5개 이상의 사진은 업로드 할 수 없습니다.');
			return false;
		}
		if (!window.confirm('등록 하시겠습니까?', true)) {
			return false;
		}
		return true;
	}

	// 제출
	const onSubmit = async () => {
		//검사
		let flag = await validated();
		//검사 false
		if (!flag) {
			return;
		}
		async function onPress() {
			let formData = new FormData();
			formData.enctype = 'multipart/form-data';
			//다중 image pictures 배열 (file)
			for (let i = 0; i < pictures[0].length; i++) {
				formData.append('image', pictures[0][i]);
			}
			formData.append('title', title);
			formData.append('subTitle', subTitle);

			const stepsConver = (steps) => {
				let str = '';
				for (let i = 0; i < steps.length; i++) {
					str += i + 1 + '번 : ' + steps[i] + '\n';
				}
				return str;
			};
			formData.append('content', stepsConver(steps));

			formData.append('category', category.id);

			formData.append('difficulty', difficulty);
			//재료 배열
			formData.append('cookTime', cookTime);
			for (let i = 0; i < materialList.length; i++) {
				formData.append('material', materialList[i].id);
			}
			//재료별 수량 배열
			for (let i = 0; i < materialCount.length; i++) {
				formData.append('materialCount', materialCount[i]);
			}
			// 부 재료 데이터 가공
			const subsConver = (subs) => {
				let str = '';
				for (let i = 0; i < subs.length; i++) {
					if (i === subs.length - 1) {
						str += subs[i];
						continue;
					}
					str += subs[i] + ',';
				}
				return str;
			};
			formData.append('subs', subsConver(subs));
			// 태그 데이터 가공
			const tagsConver = (tags) => {
				let str = '';
				for (let i = 0; i < tags.length; i++) {
					if (i === 0) {
						str += '[';
					}
					str += "'" + tags[i] + "'";
					if (i !== tags.length - 1) {
						str += ',';
					}

					if (i === tags.length - 1) {
						str += ']';
						continue;
					}
				}
				return str;
			};
			formData.append('tags', tagsConver(tags));
			if (!tokenStore.token || tokenStore.token === null) {
				window.alert('error! login please');
				redirectHome();
			}

			const boardForm = {
				token: tokenStore.token,
				formData: formData,
			};

			setLoading(true);
			await dispatch(boardSaveOne(boardForm));
			setLoading(false);

			setTitle('');
			setSubTitle('');
			setSteps([]);

			setCategory({
				id: 0,
				name: '',
			});
			setSelectCategory('');

			setDifficulty('');
			setSelectDifficulty('');

			setCookTime('');
			setSelectCookTime(null);

			setSubs([]);
			setTags([]);

			setMaterialList([]);
		}

		await onPress();

		redirect();
	};
	function redirectHome() {
		history.push('/');
	}
	function redirect() {
		history.push('/board');
	}
	const titleInput = useRef();
	const subtitleInput = useRef();
	const stepInput = useRef();
	const categoryInput = useRef();
	const difficultyInput = useRef();
	const cookTimeInput = useRef()

	return (
		<>
			{/* modal */}
			<Modal show={show} onHide={handleClose} style={{ zIndex: '9999' }}>
				<Modal.Header closeButton>
					<Modal.Title>재료 검색</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
						{materialList[0] ? (
							<div style={{ display: 'flex' }}>
								담긴 재료 :
								{materialList.map((item) => {
									return (
										<div style={{ margin: '0 3px 0 3px' }}>{item.keyName}</div>
									);
								})}
							</div>
						) : (
							<></>
						)}
						<div style={{ display: 'flex', width: '100%' }}>
							<Form.Control
								onChange={handleChangeSearch}
								onKeyPress={onKeyPress}
								type="text"
								placeholder="ex) 양파"
								style={{ width: '80%' }}
							/>
							<Button
								size="sm"
								variant="outline-primary"
								onClick={searchKeyword}
							>
								검색
							</Button>
						</div>
					</Form.Group>
					{searchList[0] ? (
						<div>
							<span style={{ fontSize: '30px', margin: '0 10px 0 0' }}>
								{searchList[0].id}번 :{searchList[0].keyName}
							</span>

							<Button
								onClick={() => {
									let id = materialList.findIndex((e) => {
										return e.id === searchList[0].id;
									});
									if (id === -1) {
										setMaterialList([
											...materialList,
											{
												id: searchList[0].id,
												keyName: searchList[0].keyName,
											},
										]);
									} else {
										window.alert('이미 들어있는 재료입니다.');
										return;
									}

									do {
										let result = window.prompt(
											'수량 입력 : ex) 1T, 1개,반개, 3/4 등등 '
										);
										setMaterialCount([...materialCount, result]);
										if (result && result !== '') {
											break;
										}
									} while (true);
								}}
							>
								선택
							</Button>
						</div>
					) : (
						<></>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>
			<>
				{loading ? (
					<div>
						<Loading text={'저장중...'} />
					</div>
				) : (
					<>
						<div className="abc">
							<Card
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Form style={{ width: '600px', marginBottom: '10px' }}>
									{/* 레시피 등록 */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'center',
										}}
									>
										<img src={logoImg} width={90} height={90}></img>
										<h1
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												fontFamily: 'BMDOHYEON',
												margin: '10px 10px 0px 10px',
											}}
										>
											레시피 등록
										</h1>

										<Icon
											path={mdiSilverwareForkKnife}
											title="fork"
											size={3.5}
											color="black"
										/>
									</div>

									{/* title */}
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>
											title <span style={{ color: 'red' }}>(필수)</span>
										</Form.Label>
										<Form.Control
											onChange={handleChangeTitle}
											type="text"
											placeholder="ex) 촉촉하고 부드러운 초코크랙쿠키 만들기"
											ref={titleInput}
										/>
									</Form.Group>
									<hr></hr>

									{/* subtitle */}
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlTextarea1"
									>
										<Form.Label>
											subtitle <span style={{ color: 'red' }}>(필수)</span>
										</Form.Label>
										<Form.Control
											onChange={handleChangeSubTitle}
											as="textarea"
											rows={3}
											placeholder="ex) 만드는방법도 정말 간단하고 촉촉하고 부드러운 초코크랙쿠키를 만들어보았어요~!! 버터가 없다면 식용유로 대체해서 만들어도 좋은 초코크랙쿠키랍니다♡♡♡ "
											ref={subtitleInput}
										/>
									</Form.Group>
									<hr></hr>

									{/* step - content */}
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlTextarea1"
									>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												width: '100%',
											}}
										>
											<Form.Label style={{ marginRight: '10px' }}>
												step <span style={{ color: 'red' }}>(필수)</span>
											</Form.Label>

											<Form.Control
												type="text"
												placeholder="ex) 닭살은 한입크기로 썬다."
												onChange={handleChangeStep}
												ref={stepInput}
												style={{ width: '70%' }}
												value={step}
											/>
											{/* step Button */}
											<div>
												<Button
													style={{
														marginLeft: '10px',
														justifyContent: 'center',
														alignItems: 'center',
														verticalAlign: 'middle',
													}}
													onClick={() => {
														addStep();
													}}
												>
													+
												</Button>
											</div>
										</div>
									</Form.Group>

									{/* step 보이는곳 */}
									{steps.map((item, index) => {
										return (
											<div
												style={{
													display: 'flex',
													width: '100%',
												}}
												key={index}
											>
												<Card
													style={{
														background: '#FDFD96',
														color: 'black',
														marginBottom: '10px',
														display: 'flex',
														width: '80%',
													}}
												>
													<div
														style={{
															padding: '5px',
														}}
													>
														{index + 1 + '번 : ' + item}
													</div>
												</Card>
												<Button
													variant="outline-primary"
													style={{
														marginLeft: '10px',
														justifyContent: 'center',
														alignItems: 'center',
														verticalAlign: 'middle',
														height: '80%',
													}}
													onClick={() => {
														deleteStep(index);
													}}
												>
													-
												</Button>
											</div>
										);
									})}
									<hr></hr>

									{/* category, difficulty, cookTime */}
									<div style={{ display: 'flex' }}>
										{/* category */}
										<div>
											<Form.Label>
												category <span style={{ color: 'red' }}>(필수)</span>
											</Form.Label>
											<Box sx={{ minWidth: 120, width: 120 }}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-label-c">
														Category
													</InputLabel>
													<Select
														labelId="demo-simple-select-label-c"
														id="demo-simple-select-c"
														value={selectCategory}
														label="Category"
														onChange={handleChangeCategory}
														ref={categoryInput}
													>
														{categories.map((item, index) => {
															return (
																<MenuItem value={item.name} key={index}>
																	{item.name}
																</MenuItem>
															);
														})}
													</Select>
												</FormControl>
											</Box>
										</div>
										{/* difficulty */}
										<div style={{ marginLeft: '10px' }}>
											<Form.Label>
												difficulty <span style={{ color: 'red' }}>(필수)</span>
											</Form.Label>
											<Box sx={{ minWidth: 120, width: 120 }}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-label-d">
														difficulty
													</InputLabel>
													<Select
														labelId="demo-simple-select-label-d"
														id="demo-simple-select-d"
														value={selectDifficulty}
														label="difficulty"
														onChange={handleChangeDifficulty}
														ref={difficultyInput}
													>
														{difficultyArr.map((item, index) => {
															return (
																<MenuItem value={item} key={index}>
																	{item}
																</MenuItem>
															);
														})}
													</Select>
												</FormControl>
											</Box>
										</div>
										{/* cookTime */}
										<div style={{ marginLeft: '10px' }}>
											<Form.Label>
												cookTime <span style={{ color: 'red' }}>(필수)</span>
											</Form.Label>
											<Box sx={{ minWidth: 120, width: 120 }}>
												<TimePicker
													value={selectCookTime}
													onChange={handleChangeCookTime}
													defaultValue={moment('00:00', format)}
													format={format}
													ref={cookTimeInput}
												/>
											</Box>
										</div>
									</div>
									<hr></hr>

									{/* material */}
									<Form.Label>
										material
										<span style={{ color: 'red' }}> (필수)</span>
										<Button
											variant="outline-danger"
											size="sm"
											onClick={() => {
												setMaterialList([]);
												setMaterialCount([]);
											}}
											style={{ fontSize: '1px', margin: '0 0 0 10px' }}
										>
											모두 지우기
										</Button>
									</Form.Label>

									<div style={{ display: 'flex' }}>
										<Button
											style={{
												marginLeft: '10px',
												justifyContent: 'center',
												alignItems: 'center',
												verticalAlign: 'middle',
											}}
											onClick={handleShow}
										>
											재료찾기
										</Button>
										<div style={{ display: 'flex', margin: '0 0 0 10px' }}>
											{materialList[0] ? (
												<div style={{ display: 'flex', height: '70%' }}>
													담긴 재료 :
													{materialList.map((item) => {
														return (
															<div
																style={{
																	margin: '0 3px 0 3px',
																	border: '1px solid #3d3d3d',
																	borderRadius: '10px',
																	backgroundColor: 'lightyellow',
																}}
															>
																{item.keyName}
															</div>
														);
													})}
												</div>
											) : (
												<></>
											)}
										</div>
									</div>

									<hr></hr>

									{/* sub material */}

									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											width: '100%',
										}}
									>
										<Form.Label style={{ marginRight: '10px' }}>
											sub material (선택)
										</Form.Label>

										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												width: '50%',
											}}
										>
											<Form.Control
												type="text"
												placeholder="ex) 푸아그라"
												onChange={handleChangeSub}
												value={sub}
											/>
										</div>
										{/* sub material Button */}
										<div>
											<Button
												style={{
													marginLeft: '10px',
													justifyContent: 'center',
													alignItems: 'center',
													verticalAlign: 'middle',
												}}
												onClick={() => {
													addSub();
												}}
											>
												+
											</Button>
										</div>
									</div>

									{subs.map((item, index) => {
										return (
											<div
												style={{
													display: 'flex',
													width: '50%',
												}}
												key={index}
											>
												<Card
													style={{
														background: '#FFDDDC',
														color: 'black',
														marginBottom: '10px',
														display: 'flex',
														width: '90%',
													}}
												>
													<div
														style={{
															padding: '5px',
														}}
													>
														{item}
													</div>
												</Card>
												<Button
													variant="outline-primary"
													style={{
														marginLeft: '10px',
														justifyContent: 'center',
														alignItems: 'center',
														verticalAlign: 'middle',
														height: '80%',
													}}
													onClick={() => {
														deleteSub(index);
													}}
												>
													-
												</Button>
											</div>
										);
									})}

									<hr></hr>

									{/* tagName */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											width: '100%',
										}}
									>
										<Form.Label style={{ marginRight: '10px' }}>
											tagName (선택)
										</Form.Label>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												width: '30%',
											}}
										>
											<Form.Control
												type="text"
												value={tag}
												onChange={handleChangeTag}
											/>
										</div>
										{/* sub material Button */}
										<div>
											<Button
												style={{
													marginLeft: '10px',
													justifyContent: 'center',
													alignItems: 'center',
													verticalAlign: 'middle',
												}}
												onClick={() => {
													addTag();
												}}
											>
												+
											</Button>
										</div>
									</div>

									{tags.map((item, index) => {
										return (
											<div
												style={{
													display: 'flex',
													width: '30%',
												}}
												key={index}
											>
												<Card
													style={{
														background: '#DBFFCF',
														color: 'black',
														marginBottom: '10px',
														display: 'flex',
														width: '90%',
													}}
												>
													<div
														style={{
															padding: '5px',
														}}
													>
														{item}
													</div>
												</Card>
												<Button
													variant="outline-primary"
													style={{
														marginLeft: '10px',
														justifyContent: 'center',
														alignItems: 'center',
														verticalAlign: 'middle',
														height: '80%',
													}}
													onClick={() => {
														deleteTag(index);
													}}
												>
													-
												</Button>
											</div>
										);
									})}

									<hr></hr>
									{/* image */}
									<Form.Label>image</Form.Label>
									<ImageUploader
										label={'레시피 이미지'}
										buttonText={'이미지를 골라주세요'}
										withIcon={true}
										onChange={onDrop}
										imgExtension={['.jpg', '.gif', '.png', '.gif']}
										maxFileSize={5242880}
										withPreview={true}
										buttonStyles={{
											backgroundColor: '#a2f2d9',
										}}
										labelStyles={{}}
										fileContainerStyle={{
											border: '1px solid #D3D3D3',
										}}
									/>

									<hr></hr>
									{/* submit */}
									<div>
										<Button variant="outline-primary" onClick={onSubmit}>
											등록
										</Button>
									</div>
								</Form>
							</Card>
						</div>
					</>
				)}
			</>
		</>
	);
}
export default BoardCreate;
