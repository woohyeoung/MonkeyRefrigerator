//BoardDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { boardDetail } from "../../store/actions/BoardAction";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";

import "./BoardDetail.css";
import { display } from "@mui/system";

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
      <div class="detailRecipeImg">
        <div id="box">
          <img src={board[0].boardImgPath} alt="mainImg" />
          <div>등록일({board[0].modifiedAt})</div>
        </div>
      </div>

      <div class="detailContent">
        <ul>
          <div id="recipeTitle">
            <li>
              <b>{board[0].title}</b>
            </li>
          </div>
          <div id="recipedate">
            <li></li>
          </div>
        </ul>

        <div style={{ fontSize: "30px" }}>
          <b>재료</b>
          <span
            style={{
              color: "#CCC",
              fontStyle: "italic",
              paddingLeft: "10px",
            }}
          >
            ingredients
          </span>
        </div>
        <div style={{ padding: "10%" }}></div>
        <div></div>
        <div></div>
        <ul>
          <div id="recipeTitle">
            <li>{board[0].title}</li>
          </div>
          <div id="recipedate">
            <li>등록일({board[0].modifiedAt})</li>
          </div>
        </ul>
      </div>
    </>
  );
}
export default BoardDetail;
