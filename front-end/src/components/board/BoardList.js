//BoardList.js

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  boardList,
  boardListAfter,
  boardListAfterView,
} from "../../store/actions/BoardAction";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Icon from "@mdi/react";
import ScrollTo from "../shared/ScrollTo";
import BoardCard from "./BoardCard";
import Grid from "@mui/material/Grid";
import "./BoardList.css";
import Loading from "../shared/CustomLoading";
import "../shared/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";

function BoardList() {
  const boardStore = useSelector((state) => state.boardReducer);
  const tokenStore = useSelector((state) => state.tokenReducer);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  //날짜순
  const [boards, setBoards] = useState([]);
  //조회순
  const [viewBoards, setViewBoards] = useState([]);

  const [boardId, setBoardId] = useState(0);
  const [boardpage, setboardPage] = useState({
    id: 0,
    createAt: "",
  });

  const [viewpage, setviewPage] = useState({
    id: 0,
    viewCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selected, setSelected] = useState(1);
  const [boardCount, setBoardCount] = useState(0);

  const btn1 = useRef();
  const btn2 = useRef();

  useEffect(() => {
    async function fetchBoardList() {
      setLoading(true);
      await dispatch(boardList(token));
      setLoading(false);
      // btn1.current.disabled = true;
    }

    fetchBoardList();
  }, []);

  // 첫렌더링
  useEffect(() => {
    if (boardStore?.boardList?.data?.data) {
      setBoards([...boardStore.boardList.data.data.result[0]]);
      setViewBoards([...boardStore.boardList.data.data.result[1]]);
    }
  }, [boardStore?.boardList?.data?.data]);

  useEffect(() => {
    if (boards[boards.length - 1]) {
      setBoardCount(boards[0].boardCount);
      setboardPage({
        id: boards[boards.length - 1].id,
        createAt: boards[boards.length - 1].createAt,
      });
    }
  }, [boards]);

  useEffect(() => {
    if (viewBoards[viewBoards.length - 1]) {
      setviewPage({
        id: viewBoards[viewBoards.length - 1].id,
        viewCount: viewBoards[viewBoards.length - 1].viewCount,
      });
    }
  }, [viewBoards]);

  const pick = useMemo(() => {
    return selected;
  }, [selected]);

  useEffect(() => {
    if (boardStore?.boardListAfter?.data) {
      setBoards([...boards, ...boardStore.boardListAfter.data.data.result]);
    }
  }, [boardStore?.boardListAfter?.data]);

  //뷰 볼드
  useEffect(() => {
    if (boardStore?.boardListAfterView?.data) {
      setViewBoards([
        ...viewBoards,
        ...boardStore.boardListAfterView.data.data.result,
      ]);
    }
  }, [boardStore?.boardListAfterView?.data]);

  useEffect(() => {}, [selected]);

  const handleScroll = useCallback(async () => {
    // 스크롤을 하면서 실행할 내용을 이곳에 추가합니다.

    const { innerHeight } = window;
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)

    const { scrollHeight } = document.body;
    // 브라우저 총 내용의 크기 (스크롤을 포함한다)

    const { scrollTop } = document.documentElement;
    // 현재 스크롤바의 위치

    if (Math.round(scrollTop + innerHeight) > scrollHeight) {
      // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
      setLoading2(true);
      if (pick === 1 && boardpage.createAt) {
        await dispatch(boardListAfter(boardpage));
      } else if (pick === 2 && viewpage.viewCount) {
        await dispatch(boardListAfterView(viewpage));
      }
      setLoading2(false);
    }
  }, [boards, boardpage, viewBoards, viewpage, selected]);

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
      {/* 최신순 조회 */}
      {selected === 1 ? (
        <>
          {loading ? (
            <div>
              <Loading text={"최신순 조회중..."} />
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
                      onClick={() => {
                        setSelected(1);
                      }}
                      variant="outline-primary"
                      ref={btn1}
                    >
                      최신순
                    </Button>
                    <Button
                      onClick={() => {
                        setSelected(2);
                      }}
                      variant="outline-primary"
                      ref={btn2}
                    >
                      조회순
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
                    return <BoardCard item={item} key={index} />;
                  })}
                </Grid>
              </div>
              <ScrollTo />
              {loading2 ? (
                <>
                  <Loading />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}
      {/* 조회순 조회 */}
      {selected === 2 ? (
        <>
          {loading ? (
            <div>
              <Loading text={"조회순 조회중..."} />
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
                      onClick={() => {
                        setSelected(1);
                      }}
                      variant="outline-primary"
                      ref={btn1}
                    >
                      최신순
                    </Button>
                    <Button
                      onClick={() => {
                        setSelected(2);
                      }}
                      variant="outline-primary"
                      ref={btn2}
                    >
                      조회순
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
                  {viewBoards.map((item, index) => {
                    return <BoardCard item={item} key={index} />;
                  })}
                </Grid>
              </div>
              <ScrollTo />
              {loading2 ? (
                <>
                  <Loading />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default BoardList;
