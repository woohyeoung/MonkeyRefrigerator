//BoardList.js

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardList, boardListAfter } from "../../store/actions/BoardAction";
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from "react-bootstrap";
import { Card } from "antd";
import Icon from "@mdi/react";
import ScrollTo from "../shared/ScrollTo";
import BoardCard from "./BoardCard";
import Grid from "@mui/material/Grid";
// import Button from '@mui/material/Button';
import "./BoardList.css";
import Loading from "../shared/CustomLoading";
import "../shared/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function BoardList() {
  const boardStore = useSelector((state) => state.boardReducer);

  const dispatch = useDispatch();

  const [boards, setBoards] = useState([]);
  const [likeBoards, setLikeBoards] = useState([]);
  const [boardId, setBoardId] = useState(0);
  const [page, setPage] = useState({
    id: 0,
    createAt: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(1);
  const [boardCount, setBoardCount] = useState(0);

  const btn1 = useRef();
  const btn2 = useRef();
  const btn1Click = () => {
    btn1.current.disabled = true;
    btn2.current.disabled = false;
    setSelected(1);
  };
  const btn2Click = () => {
    btn1.current.disabled = false;
    btn2.current.disabled = true;
    setSelected(2);
  };
  useEffect(() => {
    async function fetchBoardList() {
      setLoading(true);
      await dispatch(boardList());
      setLoading(false);
      btn1.current.disabled = true;
    }
    fetchBoardList();
  }, []);

  useEffect(() => {
    if (boardStore.boardList.data) {
      setBoards([...boardStore.boardList.data.data.result]);
    }
  }, [boardStore.boardList.data]);

  useEffect(() => {
    if (boards[0]) {
      setBoardCount(boards[0].boardCount);
      setPage({
        id: boards[boards.length - 1].id,
        createAt: boards[boards.length - 1].createAt,
      });
    }
  }, [boards]);
  useEffect(() => {
    if (boardStore.boardListAfter.data) {
      setBoards([...boards, ...boardStore.boardListAfter.data.data.result]);
    }
  }, [boardStore.boardListAfter.data]);

  useEffect(() => {
    console.log("추천순으로 바뀌어라 얍");
  }, [selected]);

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

      await dispatch(boardListAfter(page));
    }
  }, [page, boards]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
    };
  }, [handleScroll]);

  return (
    <>
      {selected === 1 ? (
        <>
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <>
              <div className="">
                {/* count */}
                <div className="row row-title">
                  <div className="count_d">
                    총 "{boardCount ? boardCount : ""}" 개의 레시피가 여러분을
                    기다립니다.
                  </div>

                  {/* Button */}
                  <div className="button_d">
                    {/* disabled={true} */}
                    <Button
                      onClick={btn1Click}
                      variant="outline-primary"
                      ref={btn1}
                    >
                      조회순
                    </Button>
                    <Button
                      onClick={btn2Click}
                      variant="outline-primary"
                      ref={btn2}
                    >
                      추천순
                    </Button>
                  </div>
                </div>
                {/* <BoardCard /> */}
                <Grid
                  container
                  direction="rows"
                  justifyContent="center"
                  alignItems="center"
                >
                  {boards.map((item, index) => {
                    return (
                      <div>
                        <Link to="/board/:id">
                          <BoardCard item={item} key={index} />
                        </Link>
                      </div>
                    );
                  })}
                </Grid>
              </div>
              <ScrollTo />
            </>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <>
              <div className="">
                {/* count */}
                <div className="row row-title">
                  <div className="count_d">
                    총 "{boardCount ? boardCount : ""}" 개의 레시피가 여러분을
                    기다립니다.
                  </div>

                  {/* Button */}
                  <div className="button_d">
                    {/* disabled={true} */}
                    <Button
                      onClick={btn1Click}
                      variant="outline-primary"
                      ref={btn1}
                    >
                      조회순
                    </Button>
                    <Button
                      onClick={btn2Click}
                      variant="outline-primary"
                      ref={btn2}
                    >
                      추천순
                    </Button>
                  </div>
                </div>
                {/* <BoardCard /> */}
                <Grid
                  container
                  direction="rows"
                  justifyContent="center"
                  alignItems="center"
                >
                  {likeBoards.map((item, index) => {
                    return <BoardCard item={item} key={index} />;
                  })}
                </Grid>
              </div>
              <ScrollTo />
            </>
          )}
        </>
      )}
    </>
  );
}

export default BoardList;
