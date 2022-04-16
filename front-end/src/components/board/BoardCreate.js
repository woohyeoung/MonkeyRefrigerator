//BoardCreate.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
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

function BoardCreate() {
	const boardStore = useSelector((state) => state.boardReducer);
	const dispatch = useDispatch();

	const [difficultyArr] = ['아무나', '초급', '중급', '고급', '신의경지'];
	const [cookTimeArr] = [1, 2, 3, 4];

	const [selectCategory, setSelectCategory] = React.useState('');
	const [title, setTitle] = useState('');
	const [subtitle, setSubtitle] = useState('');
	const [content, setContent] = useState('');
	const [step, setStep] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [cookTime, setCookTime] = useState('');
	const [subMaterial, setSubMaterial] = useState('');
	const [tagName, setTagName] = useState('');
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState({
		id: 0,
		CategoryName: '',
	});

	useEffect(() => {
		dispatch(categoryList());
	}, []);

	useEffect(() => {
		if (boardStore.categoryList.data) {
			setCategories([...boardStore.categoryList.data.data.result]);
			console.log(categories);
		}
	}, [boardStore.categoryList.data]);

	const handleChange = (event) => {
		setSelectCategory(event.target.value);
	};

	return (
		<>
			<div>
				<Card
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Form style={{ width: '600px' }}>
						<h1
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								fontFamily: 'BMDOHYEON',
								marginTop: '10px',
							}}
						>
							레시피 등록
						</h1>
						{/* title */}
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>title</Form.Label>
							<Form.Control
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
							<Form.Control as="textarea" rows={2} />
						</Form.Group>
						<hr></hr>
						{/* category */}
						<Form.Label>category</Form.Label>
						<Box sx={{ minWidth: 120, width: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={selectCategory}
									label="Category"
									onChange={handleChange}
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
						<hr></hr>
						{/* step */}
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>step</Form.Label>

								<Form.Control
									type="text"
									placeholder="ex) 닭살은 한입크기로 썬다."
								/>
							</Form.Group>
							<Button
								style={{
									margin: '10px',
									width: 'auto',
									height: '30px',
									justifyContent: 'center',
									alignItems: 'center',
									verticalAlign: 'middle',
								}}
							>
								추가
							</Button>
						</div>
						<hr></hr>
						{/* sub material */}
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>sub material</Form.Label>

								<Form.Control
									type="text"
									placeholder="ex) 닭살은 한입크기로 썬다."
								/>
							</Form.Group>
							<Button
								style={{
									margin: '10px',
									width: 'auto',
									height: '30px',
									justifyContent: 'center',
									alignItems: 'center',
									verticalAlign: 'middle',
								}}
							>
								추가
							</Button>
						</div>
						<hr></hr>
						{/* difficulty */}
						<Form.Label>difficulty</Form.Label>
						<Box sx={{ minWidth: 120, width: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Age</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={selectCategory}
									label="selectCategory"
									onChange={handleChange}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<hr></hr>
						{/* cookTime */}
						<Form.Label>cookTime</Form.Label>
						<Box sx={{ minWidth: 120, width: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Age</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={selectCategory}
									label="selectCategory"
									onChange={handleChange}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<hr></hr>
						{/* tagName */}
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>tagName</Form.Label>

								<Form.Control
									type="text"
									placeholder="ex) 닭살은 한입크기로 썬다."
								/>
							</Form.Group>
							<Button
								style={{
									margin: '10px',
									width: 'auto',
									height: '30px',
									justifyContent: 'center',
									alignItems: 'center',
									verticalAlign: 'middle',
								}}
							>
								추가
							</Button>
						</div>
						<hr></hr>
						{/* image */}
						<Form.Label>image</Form.Label>

						<hr></hr>
						<Form.Label>material</Form.Label>

						<hr></hr>
						{/* submit */}
						<div>
							<Button variant="outline-primary">submit</Button>
							<Button variant="outline-danger">reset</Button>
						</div>
					</Form>
				</Card>
			</div>
		</>
	);
}
export default BoardCreate;
