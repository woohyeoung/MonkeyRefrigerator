//BoardDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { boardDetail } from "../../store/actions/BoardAction";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";

function BoardDetail() {
  const boardStore = useSelector((state) => state.boardReducer);
  let { id } = useParams();

  const dispatch = useDispatch();

  const [board, setBoard] = useState([id]);

  useEffect(() => {
    async function fetchBoardDetail() {
      await dispatch(boardDetail(board));
    }
    fetchBoardDetail();
  }, []);

  useEffect(() => {
    if (boardStore.boardDetail.data) {
      setBoard([...boardStore.boardDetail.data.data.result]);
    }
  }, [boardStore.boardDetail.data]);

  console.log(board[0]);
  // useEffect(() => {
  //   if (boardStore.boardDetail.data) {
  //     setBoard([...board, ...boardStore.boardDetail.data.data.result]);
  //   }
  // }, [boardStore.boardDetail.data]);

  return (
    <>
      <Card>
        {/* <CardHeader
          avatar={
            <Avatar src={board[0].boardImgPath}>
              <div>안녕하세요</div>
            </Avatar>
          }
        /> */}
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          height={"400px"}
          src={board[0].boardImgPath}
        />
      </Card>
    </>
  );
}
export default BoardDetail;
