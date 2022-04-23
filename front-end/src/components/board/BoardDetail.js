//BoardDetail.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardDetail } from "../../store/actions/BoardAction";
import "./BoardDetail.css";
import { IoIosAlarm, IoMdStar } from "react-icons/io";
import Loading from "../shared/CustomLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import MoodIcon from "@mui/icons-material/Mood";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { green } from "@mui/material/colors";
import { addUserCart } from "../../store/actions/CartAction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ScrollTo from "../shared/ScrollTo";

// carousel
const Container = styled.div`
  overflow: hidden;
  height: 450px;
  width: 100%;
`;
const ImageContainer = styled.div`
  padding: 15px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
`;
const Image = styled.img`
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  max-height: 400px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
  }
`;
//

function BoardDetail() {
  const boardStore = useSelector(
    (state) => state.boardReducer.boardDetail.data
  );
  let { id } = useParams();
  const dispatch = useDispatch();
  const [board, setBoard] = useState([]);
  const [steps, setSteps] = useState([]);
  const tokenStore = useSelector((state) => state.tokenReducer.token);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
  };

  useEffect(() => {
    async function fetchBoardDetail() {
      await dispatch(boardDetail(id));
    }
    fetchBoardDetail();
  }, []);
  const moveInCart = async (id) => {
    if (window.confirm("장바구니에 추가하시겠습니까?")) {
      await setInCart(id);
      if (window.confirm("장바구니로 이동하시겠습니까?")) {
        window.location.href = `/cart`;
      }
      setLoading(false);
    } else {
      alert("취소되었습니다.");
    }
  };
  const setInCart = async (id) => {
    const data = { board: id, token: tokenStore };
    setLoading(true);
    dispatch(addUserCart(data));
  };
  useEffect(() => {
    if (boardStore?.data) {
      const boardfetch = () => {
        setBoard([...boardStore?.data?.result]);
      };
      setTimeout(() => {
        boardfetch();
      }, 200);
    }
  }, [boardStore?.data]);

  useEffect(() => {
    console.log(board);
    if (board) {
      const spliceStep = () => {
        if (board[0]) setSteps(step(board[0][0]?.content));
      };
      setTimeout(() => {
        spliceStep();
      }, 200);
    }
  }, [board]);

  function step(str) {
    let strAry = [];
    let strAry2 = [];
    if (str) {
      strAry = str.split("\n");
      for (let index = 0; index < strAry.length; index++) {
        if (strAry[index][0] !== "s") {
          strAry2.push(strAry[index]);
        }
      }
      return strAry2;
    }
  }
  return (
    <>
      <div>
        {!board[1] ? (
          <div>
            <Loading />
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          <div className="detailContainer">
            <Container>
              <StyledSlider {...settings}>
                {board[1].map((item, i) => {
                  return (
                    <div key={i}>
                      <ImageContainer>
                        <Image src={item.boardImgPath} />
                      </ImageContainer>
                    </div>
                  );
                })}
              </StyledSlider>
            </Container>
            <Link>
              <AddShoppingCartIcon
                className="moveToCart"
                sx={{ width: "40px", height: "40px" }}
                onClick={() => {
                  moveInCart(board[0][0].id);
                }}
              />
            </Link>
            <hr className="horizontal" />

            <div
              style={{
                width: "60%",
                borderTop: "1px solid #b3b1b1",
                textAlign: "center",
                marginTop: "5%",
                paddingTop: "10%",
                marginBottom: "5%",
                marginLeft: "20%",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  width: "110px",
                  height: "110px",
                }}
                src={board[0][0].profileImg}
                alt="userprofile"
              />
            </div>
            <div id="detailContent">
              <div id="detailNick">
                <b>{board[0][0].nickname}</b>
                <p style={{ fontSize: "15px", color: "#aaa" }}>
                  등록일({board[0][0].createAt})
                  <br />
                  {!board[0][0].modifiedAt ? (
                    <></>
                  ) : (
                    <>
                      수정일({board[0][0].modifiedAt})
                      <br />
                    </>
                  )}
                  조회수({board[0][0].viewCount})
                </p>
              </div>
              <div id="detailTitle">
                <b>{board[0][0].title}</b>
              </div>
              <div id="detailSubtitle">{board[0][0].subtitle}</div>

              <div className="detailInfo">
                <span className="span1">
                  <IoIosAlarm size="50" />
                  <br></br>
                  <b>{board[0][0].cookTime}</b>
                </span>
                <span className="span2">
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <br />
                  <IoMdStar />
                  <IoMdStar />
                  <br />
                  <b>{board[0][0].difficulty}</b>
                </span>
              </div>

              <div className="detailMaterial">
                <div>
                  재료
                  <span>ingredients</span>
                </div>
                <div id="readyMaterial">
                  <b>[주재료]</b>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <ul className="hs">
                        {board[2].map((item, i) => {
                          return <li key={i}>{item.keyName}</li>;
                        })}
                      </ul>
                    </div>
                    <div style={{ width: "50%" }}>
                      <ul className="hs">
                        {board[2].map((item, i) => {
                          return <li key={i}>{item.count}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="view_step">
                <b style={{ fontWeight: "500", fontSize: "30px" }}>조리순서</b>
                <span
                  style={{
                    color: "#ccc",
                    fontSize: "18px",
                    fontStyle: "italic",
                    paddingLeft: "10px",
                  }}
                >
                  Steps
                </span>
                <br></br>
                <div id="stepDes">
                  {steps.map((item, i) => {
                    return (
                      <>
                        <div key={i}>
                          <div style={{ padding: "0 0 30px 0" }}>
                            <MoodIcon style={{ padding: "0 5px 0 0" }} />
                            {steps[i]}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="detailTag">
                <div style={{ background: "#f2f2f2" }}>
                  <LocalOfferIcon
                    sx={{ color: green[500], marginLeft: "3%" }}
                  />
                  <b style={{ color: "#2a7830", marginLeft: "5%" }}>
                    {board[0][0].tagName ? (
                      board[0][0].tagName
                        .replace(/\'/g, "")
                        .replace(/\[/g, "")
                        .replace(/\]/g, "")
                    ) : (
                      <></>
                    )}
                  </b>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ScrollTo />
    </>
  );
}
export default BoardDetail;
