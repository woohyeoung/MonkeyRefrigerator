//Cart.js
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { boardList } from "../../store/actions/BoardAction";
import Skeleton from "@mui/material/Skeleton";
import "./Cart.css";

export default function Cart(props) {
  const tokenStore = useSelector((state) => state.tokenReducer);
  // const dispatch = useDispatch();
  const [token, setToken] = useState(props.token);

  useEffect(() => {
    if (tokenStore) setToken(tokenStore.token);
  }, [tokenStore]);

  return (
    <>
      <div className="carthhead">
        <h2>장바구니입니다</h2>
      </div>
      <CartBody />
    </>
  );
}
const CartBody = () => {
  const dispatch = useDispatch();
  const boardReducer = useSelector((state) => state.boardReducer);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const setCart = async () => {
      setLoading(true);
      await dispatch(boardList()); // 이걸 내가 짜서 보내자
      setLoading(false);
    };
    setCart();
  }, []);
  useEffect(() => {
    if (boardReducer.boardList.data)
      setCartData([...boardReducer.boardList.data.data.result]);
  }, [boardReducer.boardList.data]);
  return (
    <>
      <div className="cartbbody">
        {loading ? (
          <SkeletonLoadingSet />
        ) : (
          <Box sx={{ width: "90%", height: 600, overflowY: "scroll" }}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {cartData.map((item, i) => (
                <ImageListItem key={i}>
                  <CartCard
                    path={cartData[i].boardImgPath}
                    title={cartData[i].title}
                    subtitle={cartData[i].subtitle}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </div>
    </>
  );
};
const CartCard = (props) => {
  return (
    <Card sx={{ width: 345 }}>
      <img style={{ width: "100%" }} src={props.path} alt="images" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.subtitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
const SkeletonLoadingSet = () => {
  return (
    <>
      <div className="skeletonSet">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
      <div className="skeletonSet">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    </>
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
