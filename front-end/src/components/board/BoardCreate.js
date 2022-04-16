//BoardCreate.js
import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryList } from '../../store/actions/BoardAction';
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
import Grid from '@mui/material/Grid';

function BoardCreate() {
	const boardStore = useSelector((state) => state.boardReducer);
	const dispatch = useDispatch();

	const [selectCategory, setSelectCategory] = React.useState('');
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState({
		id: 0,
		CategoryName: '',
	});

	const [selectDifficulty, setSelectDifficulty] = React.useState('');
	const difficultyArr = ['아무나', '초급', '중급', '고급', '신의경지'];
	const [difficulty, setDifficulty] = useState('');

	const [cookTime, setCookTime] = useState('');
	const [selectCookTime, setSelectCookTime] = useState(null);
	const format = 'HH:mm';

	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');

	const [step, setStep] = useState('');
	const [steps, setSteps] = useState([]);
	const [content, setContent] = useState('');

	const [sub, setSub] = useState('');
	const [subs, setSubs] = useState([]);
	const [subMaterial, setSubMaterial] = useState('');

	const [tag, setTag] = useState('');
	const [tags, setTags] = useState([]);
	const [tagName, setTagName] = useState('');

	const [pictures, setPictures] = useState([]);
	const onDrop = (picture) => {
		setPictures([...pictures, picture]);
	};

	const [boardForm, setBoardForm] = useState({
		title: '',
		subTitle: '',
		content: '',
		difficulty: '',
		cookTime: '',
		subMaterial: '',
		tagName: '',
	});

	useEffect(() => {
		dispatch(categoryList());
	}, []);

	useEffect(() => {
		if (boardStore.categoryList.data) {
			setCategories([...boardStore.categoryList.data.data.result]);
			// console.log(categories);
		}
	}, [boardStore.categoryList.data]);

	const handelChage = () => {};

	const handleChangeTitle = (event) => {
		console.log('title 값 변경중');
		setTitle(event.target.value);
		console.log(title);
	};

	const handleChangeSubTitle = (event) => {
		console.log('sub title 값 변경중');
		setSubTitle(event.target.value);
	};
	const handleChangeStep = (event) => {
		console.log('Step 값 변경중');
		setStep(event.target.value);
	};

	const addStep = () => {
		setSteps([...steps, step]);
	};
	function deleteStep(index) {
		setSteps([...steps.splice(index, 1, '')]);
	}
	const handleChangeCategory = (event) => {
		setSelectCategory(event.target.value);
	};
	const handleChangeDifficulty = (event) => {
		setSelectDifficulty(event.target.value);
	};
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
	const handleChangeSub = (event) => {
		console.log('123');
		setSub(event.target.value);
	};
	const addSubMaterial = () => {
		console.log('asd');
		setSubs([...subs, sub]);
	};

	const deleteSub = (index) => {
		setSubs([...subs.splice(index, 1, '')]);
	};

	const handleChangeTag = (event) => {
		console.log('123');
		setTag(event.target.value);
	};
	const addTag = () => {
		console.log('asd');
		setTags([...tags, tag]);
	};

	const deleteTag = (index) => {
		setTags([...subs.splice(index, 1, '')]);
	};

	return (
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
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>title</Form.Label>
							<Form.Control
								onChange={handleChangeTitle}
								type="text"
								placeholder="ex) 촉촉하고 부드러운 초코크랙쿠키 만들기"
							/>
						</Form.Group>
						<hr></hr>

						{/* subtitle */}
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>subtitle</Form.Label>
							<Form.Control
								onChange={handleChangeSubTitle}
								as="textarea"
								rows={3}
								placeholder="ex) 만드는방법도 정말 간단하고 촉촉하고 부드러운 초코크랙쿠키를 만들어보았어요~!! 버터가 없다면 식용유로 대체해서 만들어도 좋은 초코크랙쿠키랍니다♡♡♡ "
							/>
						</Form.Group>
						<hr></hr>

						{/* step - content */}
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<div
								style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
							>
								<Form.Label style={{ marginRight: '10px' }}>step</Form.Label>

								<Form.Control
									type="text"
									placeholder="ex) 닭살은 한입크기로 썬다."
									onChange={handleChangeStep}
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
											width: '90%',
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
										onClick={(index) => {
											deleteStep(index);
										}}
									>
										-
									</Button>
								</div>
							);
						})}
						<hr></hr>

						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div>
								{/* category */}
								<Form.Label>category</Form.Label>
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
							<div style={{ marginLeft: '10px' }}>
								{/* difficulty */}
								<Form.Label>difficulty</Form.Label>
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
								<Form.Label>cookTime</Form.Label>
								<Box sx={{ minWidth: 120, width: 120 }}>
									<TimePicker
										value={selectCookTime}
										onChange={handleChangeCookTime}
										defaultValue={moment('00:00', format)}
										format={format}
									/>
								</Box>
							</div>
						</div>
						<hr></hr>

						{/* material */}
						<Form.Label>material</Form.Label>
						<hr></hr>

						{/* sub material */}

						<div
							style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
						>
							<div
								style={{ display: 'flex', flexDirection: 'row', width: '50%' }}
							>
								<Form.Label style={{ marginRight: '10px' }}>
									sub material
								</Form.Label>

								<Form.Control
									type="text"
									placeholder="ex) 푸아그라"
									onChange={handleChangeSub}
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
										addSubMaterial();
									}}
								>
									+
								</Button>
							</div>
						</div>

						{subs.map((item, index) => {
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
									onClick={(index) => {
										deleteSub(index);
									}}
								>
									-
								</Button>
							</div>;
						})}

						<hr></hr>

						{/* tagName */}
						<div
							style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
						>
							<div
								style={{ display: 'flex', flexDirection: 'row', width: '50%' }}
							>
								<Form.Label style={{ marginRight: '10px' }}>tagName</Form.Label>

								<Form.Control type="text" onChange={handleChangeTag} />
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
									onClick={(index) => {
										deleteTag(index);
									}}
								>
									-
								</Button>
							</div>;
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
						/>

						<hr></hr>
						{/* submit */}
						<div>
							<Button variant="outline-primary">submit</Button>
							<Button variant="outline-danger" style={{ marginLeft: '10px' }}>
								reset
							</Button>
						</div>
					</Form>
				</Card>
			</div>
		</>
	);
}
export default BoardCreate;
