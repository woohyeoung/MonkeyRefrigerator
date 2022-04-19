//Main.js
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
import "./Main.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import dungdunglogo from "../assets/monkey_2.png";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BoardList from "./board/BoardList";
import BoardCreate from "./board/BoardCreate";
import { Route, Switch } from "react-router-dom";
import { Login } from "./user/Login";
import SignUp from "./user/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, handleLogout } from "../store/actions/UserAction";
import PublicRoute from "./user/PublicRoute";
import PrivateRoute from "./user/PrivateRoute";
import Header from "./Header";
import BoardDetail from "./board/BoardDetail";
import Profile from "./user/Profile";
import { Refrigerator } from "./search/Refrigerator";
import { boardList } from "../store/actions/BoardAction";
import Loading from "./shared/CustomLoading";

function Main() {
  const dispatch = useDispatch();
  const tokenReducer = useSelector((state) => state.tokenReducer.token);
  const boardReducer = useSelector((state) => state.boardReducer);
  const [boardRank, setBoardRank] = useState([]);
  const [imgPath, setImgPath] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const offset = (page - 1) * 5;
  const logoRef = useRef(null);
  useEffect(() => {
    if (tokenReducer === null) dispatch(handleLogin());
  });
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: 0 },
      {
        y: -100,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "Power1.out",
      }
    );
  });
  useEffect(() => {
    const setBoard = async () => {
      setLoading(true);
      await dispatch(boardList());
      setLoading(false);
    };
    setBoard();
  }, []);

  useEffect(() => {
    setImgPath([]);
    if (boardReducer.boardList.data)
      setBoardRank([...boardReducer.boardList.data.data.result]);
    for (let i = 0; i < boardRank.length; i++) {
      imgPath.push(boardRank[i].boardImgPath);
    }
    setImgPath(imgPath);

    imgPath.forEach((element) => {
      console.log(element);
    });
  }, [boardReducer.boardList.data]);

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Switch>
          <PublicRoute restricted={false} exact path="/">
            <div className="mainHeadLine">
              <div className="dungdung" ref={logoRef}>
                {MainLogo}
              </div>
              <div className="mainVote">
                <Card variant="outlined">{mainVoteCard}</Card>
              </div>
            </div>
            {loading ? (
              <div className="loadingMain">
                <Loading />
              </div>
            ) : (
              <>
                <div className="mainBody">
                  <div className="mainBodyTitle">
                    <h4>Best 10 Recipe</h4>
                  </div>
                  <div className="mainBodyCon">
                    {imgPath.slice(offset, offset + 5).map((item, i) => (
                      <RankCard path={item} />
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
          </PublicRoute>
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
          <PrivateRoute component={Profile} path="/profile" exact />
          <PublicRoute
            restricted={false}
            component={BoardList}
            path="/board"
            exact
          />
          <PublicRoute component={BoardCreate} path="/create" exact />
          <PrivateRoute component={Refrigerator} path="/refrigerator" exact />
          <Route path="/board/:id">
            <BoardDetail />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Main;
const MainLogo = (
  <div className="dung">
    <img src={dungdunglogo} alt="dungdung" />
  </div>
);

const mainVoteCard = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        이주의 레시피
      </Typography>
      <Typography variant="h5" component="div">
        이번주의 레시피를 투표해주세요!
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Pick Me!
      </Typography>
      <Typography variant="body2">
        투표해 주신 분들 중 10분을 추첨해서 상품을 드립니다!
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);
const Pagination = ({ total, limit, page, setPage }) => {
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
      <Card sx={{ maxWidth: "10%", margin: "10px" }}>
        <CardHeader
          avatar={<Avatar>사람</Avatar>}
          title="제목"
          subheader="날짜"
        />
        <CardMedia component="img" height="100" image={props.path} alt="img" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            내용
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
