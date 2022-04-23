//BoardList.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	kewordBoardList,
	kewordBoardListAfter,
} from '../../store/actions/BoardAction';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Card } from 'antd';
import Icon from '@mdi/react';
import ScrollTo from '../shared/ScrollTo';
import BoardCard from '../board/BoardCard';
import Grid from '@mui/material/Grid';
import Loading from '../shared/CustomLoading';
import '../shared/loading.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Search() {
	const boardStore = useSelector((state) => state.boardReducer);
	const searchStore = useSelector((state) => state.searchReducer);

	const dispatch = useDispatch();

	const [keyword, setKeyword] = useState();

	const [boards, setBoards] = useState([]);

	const [page, setPage] = useState({
		id: 0,
		createAt: 0,
	});
	const [loading, setLoading] = useState(false);
	const [boardCount, setBoardCount] = useState(0);

	// useEffect(() => {
	// 	setKeyword(location.state.keyword);
	// }, []);

	useEffect(() => {
		if (searchStore) {
			setKeyword(searchStore);
		}
	}, [searchStore]);

	//표본
	useEffect(() => {
		if (keyword === '') {
		} else {
			async function fetchBoardList() {
				setLoading(true);
				await dispatch(kewordBoardList(keyword));
				setLoading(false);
			}
			fetchBoardList();
		}
	}, [keyword]);

	useEffect(() => {
		if (boardStore.boardListKeyword.data) {
			setLoading(true);
			async function LoadBoardList() {
				await setBoards([...boardStore.boardListKeyword.data.data.result]);
				setLoading(false);
			}
			LoadBoardList();
		}
	}, [boardStore.boardListKeyword.data]);

	useEffect(() => {
		if (boards[0]) {
			setBoardCount(boards[0].boardCount);
			setPage({
				id: boards[boards.length - 1].id,
				createAt: boards[boards.length - 1].createAt,
				keyword: keyword,
			});
		}
	}, [boards]);

	useEffect(() => {
		setTimeout(() => {
			if (boardStore.boardListKeywordAfter.data) {
				setBoards([
					...boards,
					...boardStore.boardListKeywordAfter.data.data.result,
				]);
			}
		}, 500);
	}, [boardStore.boardListKeywordAfter.data]);

	const handleScroll = useCallback(async () => {
		// 스크롤을 하면서 실행할 내용을 이곳에 추가합니다.
		const { innerHeight } = window;
		// 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
		const { scrollHeight } = document.body;
		// 브라우저 총 내용의 크기 (스크롤을 포함한다)
		const { scrollTop } = document.documentElement;
		// 현재 스크롤바의 위치
		if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
			// scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.

			await dispatch(kewordBoardListAfter(page));
		}
	}, [page, boards]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, true);
		// 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
			// 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
		};
	}, [handleScroll]);

	return (
		<>
			{loading ? (
				<div>
					<Loading text={'검색결과 조회중...'} />
				</div>
			) : (
				<>
					<div className="">
						<div className="row row-title">
							"{keyword ? <div style={{ color: 'red' }}>{keyword}</div> : <></>}
							" 검색결과입니다.
						</div>

						{/* <BoardCard /> */}
						<Grid
							container
							direction="rows"
							justifyContent="center"
							alignItems="center"
						>
							{boards.map((item, index) => {
								return <BoardCard item={item} key={index} />;
							})}
						</Grid>
					</div>
					<ScrollTo />
				</>
			)}
		</>
	);
}

export default Search;
