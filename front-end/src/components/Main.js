//Install-Style-User
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import dungdunglogo from "../assets/monkey_4.png";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import "./Main.css";
import { Login } from "./user/Login";
import SignUp from "./user/SignUp";
import {
  didVoteChk,
  handleLogin,
  boardRankChk,
} from "../store/actions/UserAction";
import PublicRoute from "./user/PublicRoute";
import PrivateRoute from "./user/PrivateRoute";
import Header, { logout } from "./Header";
import BoardDetail from "./board/BoardDetail";
import Profile from "./user/Profile";
import { Refrigerator } from "./search/Refrigerator";
import { voteBtnClick, voteboardRank } from "../store/actions/UserAction";
import BoardList from "./board/BoardList";
import BoardCreate from "./board/BoardCreate";
import Cart from "../components/cart/Cart";
import Search from "../components/search/Search";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
export default function Main() {
  const dispatch = useDispatch();
  const tokenReducer = useSelector((state) => state.tokenReducer.token);
  useEffect(() => {
    if (tokenReducer === null) dispatch(handleLogin());
  });
  return (
    <>
      <Header />
      <div className="mainContainer">
        <Switch>
          <PublicRoute restricted={false} exact path="/" component={MainPage} />
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />
          <PublicRoute
            restricted={true}
            component={SignUp}
            path="/signup"
            exact
          />
          <PublicRoute
            restricted={false}
            component={BoardList}
            path="/board"
            exact
          />
          <PublicRoute
            restricted={false}
            component={Search}
            path="/search"
            exact
          />
          <PrivateRoute component={BoardCreate} path="/create" exact />
          <PrivateRoute component={Profile} path="/profile" exact />
          <PrivateRoute component={Refrigerator} path="/refrigerator" exact />
          <PrivateRoute component={BoardDetail} path="/board/:id" exact />
          <PrivateRoute component={Cart} path="/cart" exact />
        </Switch>
      </div>
    </>
  );
}

const MainLogo = (
  <div className="dung">
    <img src={dungdunglogo} alt="dungdung" />
  </div>
);
const DidVote = () => {
  return (
    <React.Fragment>
      <CheckIcon className="voteCheck" />
      <CardContent sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}>
        <Typography
          sx={{ fontSize: 14, fontFamily: "BMDOHYEON" }}
          color="text.secondary"
          gutterBottom
        >
          이주의 레시피
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontFamily: "BMDOHYEON" }}
        >
          이번주의 레시피를 투표해주세요!
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontFamily: "BMDOHYEON" }}
          color="text.secondary"
        >
          Pick Me!
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "BMDOHYEON" }}>
          투표해 주신 분들 중 10분을 추첨해서 상품을 드립니다!
        </Typography>
        <Typography
          className="voteCheck"
          variant="body2"
          sx={{ fontFamily: "BMDOHYEON" }}
        >
          이미 투표를 완료하셨습니다.
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};
const MainVoteCard = (props) => {
  const cookies = new Cookies();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = (type) => {
    switch (type) {
      case "OPEN":
        setModalOpen(true);
        return;
      case "CLOSE":
      default:
        setModalOpen(false);
        return;
    }
  };
  return (
    <React.Fragment>
      <CardContent sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}>
        <Typography
          sx={{ fontSize: 14, fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
          color="text.secondary"
          gutterBottom
        >
          이주의 레시피
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontFamily: "BMDOHYEON" }}
        >
          이번주의 레시피를 투표해주세요!
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
          color="text.secondary"
        >
          Pick Me!
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
        >
          투표해 주신 분들 중 5분을 추첨해서 상품을 드립니다!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            cookies.get("accessToken") ? (
              handleModal("OPEN")
            ) : (
              <>
                {alert("로그인 후에 이용해주세요.")}
                {logout()}
              </>
            )
          }
        >
          Learn More
        </Button>
      </CardActions>
      <VoteModal
        open={modalOpen}
        close={() => handleModal("CLOSE")}
        header="이주의 레시피!"
      >
        <VotePage data={props.data} token={cookies.get("accessToken")} />
      </VoteModal>
    </React.Fragment>
  );
};
const VoteModal = (props) => {
  const { open, close, header } = props;

  return (
    <div className={open ? "openModal voteModal" : "voteModal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="voteClose" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="voteClose" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
const VotePage = (props) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;
  const voteHandler = async (id) => {
    dispatch(voteBtnClick(id));
    setTimeout(() => {
      dispatch(didVoteChk(props.token));
      alert("투표가 완료되었습니다.");
      window.location.reload();
    }, 250);
  };
  useEffect(() => {
    setRows([...props.data]);
  }, []);
  return (
    <div className="votePage">
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "100%", fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ width: 200, fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
              >
                사진
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
              >
                제목
              </TableCell>
              <TableCell
                sx={{ width: 100, fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
                align="center"
              >
                <HowToVoteIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}>
            {rows.slice(offset, offset + 5).map((row, i) => (
              <TableRow>
                <TableCell align="center">
                  <img
                    style={{ width: "120px", height: "60px" }}
                    src={row.path}
                    alt="레시피사진"
                  />
                </TableCell>
                <TableCell align="left" style={{ fontFamily: "BMDOHYEON" }}>
                  {row.title}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
                >
                  <button
                    onClick={() => {
                      voteHandler(row.id);
                    }}
                  >
                    투표
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination total={rows.length} limit={5} page={page} setPage={setPage} />
    </div>
  );
};
export const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : <></>}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </>
  );
};
const RankCard = (props) => {
  return (
    <>
      <Card
        sx={{ height: 300, width: 200, margin: "10px", textAlign: "center" }}
      >
        <img
          style={{ width: "auto", height: "200px" }}
          src={props.path}
          alt="img"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "15px",
              fontFamily: "BMDOHYEON, KoPubDotumMedium",
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "BMDOHYEON, KoPubDotumMedium" }}
          >
            {props.subtitle}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
const SkeletonLoadingSet = () => {
  return (
    <div className="skeletonSet">
      <SkeletonLoading />
      <SkeletonLoading />
      <SkeletonLoading />
      <SkeletonLoading />
      <SkeletonLoading />
    </div>
  );
};
const SkeletonLoading = () => {
  return (
    <div style={{ width: "200px", margin: "10px" }}>
      <Skeleton
        animation="wave"
        height={10}
        width="80%"
        style={{ marginBottom: 6 }}
      />
      <Skeleton
        animation="wave"
        height={10}
        width="80%"
        style={{ marginBottom: 6 }}
      />
      <Skeleton animation="wave" height={10} width="40%" />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={10} width="80%" />
    </div>
  );
};
const MainPage = () => {
  const dispatch = useDispatch();
  const [modalOn, setModalOn] = useState(false);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;
  const logoRef = useRef(null);
  const [boardRank, setBoardRank] = useState([]);
  const userReducer = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const voteReducer = useSelector((state) => state.userReducer);
  const [boardVote, setBoardVote] = useState([]);
  const tokenStore = useSelector((state) => state.tokenReducer);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: 50, opacity: 1 },
      {
        y: -50,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "Power1.out",
      }
    );
  });
  useEffect(() => {
    if (tokenStore?.token) dispatch(didVoteChk(tokenStore.token));
  }, [tokenStore?.token]);
  useEffect(() => {
    setVoteLoading(true);
    if (voteReducer?.didvotecheck?.data) {
      setIsVote(voteReducer.didvotecheck.data.isSuccess);
    }
    setVoteLoading(false);
  }, [voteReducer?.didvotecheck?.data]);
  useEffect(() => {
    setLoading(true);
    dispatch(boardRankChk());
    dispatch(voteboardRank());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (userReducer?.voteBoardRankList?.data) {
        setBoardRank([...userReducer.voteBoardRankList.data.result]);
      }
      setLoading(false);
    }, 1000);
  }, [userReducer?.voteBoardRankList?.data]);
  useEffect(() => {
    setTimeout(() => {
      if (userReducer?.voteboardrank?.data) {
        setBoardVote([...userReducer.voteboardrank.data.result]);
      }
    }, 1500);
  }, [userReducer?.voteboardrank?.data]);
  return (
    <>
      <div className="mainHeadLine">
        <div className="dungdung" ref={logoRef}>
          {MainLogo}
        </div>
        <div className="mainVote">
          {voteLoading ? (
            <SkeletonLoading />
          ) : isVote ? (
            <Card variant="outlined">
              <DidVote />
            </Card>
          ) : (
            <>
              <Card
                variant="outlined"
                onClick={() => {
                  modalOn ? setModalOn(false) : setModalOn(true);
                }}
              >
                <MainVoteCard data={boardVote} />
              </Card>
              <VoteModal flag={modalOn} />
            </>
          )}
        </div>
      </div>
      <hr style={{ width: "60%" }} />
      {loading ? (
        <SkeletonLoadingSet />
      ) : (
        <>
          <div className="mainBody">
            <div className="mainBodyTitle">
              <h4>Best 10 Recipe</h4>
            </div>
            <div className="mainBodyCon">
              {boardRank.slice(offset, offset + 5).map((item, i) => (
                <Link to={`/board/${item.boardId}`}>
                  <RankCard
                    path={item.path}
                    title={item.title}
                    content={item.content}
                  />
                </Link>
              ))}
            </div>
            <div className="mainBodyCon">
              <Pagination
                total={boardRank.length}
                limit={5}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
