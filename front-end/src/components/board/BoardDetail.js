//BoardDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardDetail } from "../../store/actions/BoardAction";
import "./BoardDetail.css";
import { IoIosAlarm, IoMdStar } from "react-icons/io";
import Loading from "../shared/CustomLoading";

function BoardDetail() {
  const boardStore = useSelector(
    (state) => state.boardReducer.boardDetail.data
  );
  let { id } = useParams();

  const dispatch = useDispatch();

  const [board, setBoard] = useState([]);

  useEffect(() => {
    async function fetchBoardDetail() {
      await dispatch(boardDetail(id));
    }
    fetchBoardDetail();
  }, []);

  useEffect(() => {
    if (boardStore) {
      setBoard([...board, ...boardStore.data.result]);
    }
  }, [boardStore]);
  console.log(board[1]);

  return (
    <>
      <div>
        {!board[1] ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="detailContainer">
            <div id="detailImg">
              <img src={board[1].boardImgPath} alt="mainImg" />
              <br />
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "110px",
                  height: "110px",
                }}
                src={board[1].profileImg}
                alt="userprofile"
              />
            </div>
            <div id="detailContent">
              <div id="detailNick">
                <b>{board[1].nickname}</b>
                <p style={{ fontSize: "15px", color: "#aaa" }}>
                  등록일({board[1].modifiedAt})
                </p>
              </div>
              <div id="detailTitle">
                <b>{board[1].title}</b>
              </div>
              <div id="detailSubtitle">{board[1].subtitle}</div>

              <div className="detailInfo">
                <span className="span1">
                  <IoIosAlarm size="50" />
                  <br></br>
                  <b>{board[1].cookTime}</b>
                </span>
                <span className="span2">
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <br />
                  <IoMdStar />
                  <IoMdStar />
                  <br />
                  <b>{board[1].difficulty}</b>
                </span>
              </div>

              <div className="detailMaterial">
                <div>
                  재료
                  <span>ingredients</span>
                </div>
                <div id="readyMaterial">
                  <ul>
                    <b>[주재료]</b>
                  </ul>
                </div>
              </div>
              <div style={{ padding: "10%" }}></div>
              <div></div>
              <div></div>
              <ul>
                <div id="recipeTitle">
                  <li>{board[1].title}</li>
                </div>
                <div id="recipedate">
                  <li>등록일({board[1].modifiedAt})</li>
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default BoardDetail;
