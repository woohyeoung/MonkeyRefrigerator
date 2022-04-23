//Cart.js
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import "./Cart.css";
import { delUserCart, getUserCart } from "../../store/actions/CartAction";
import Loading from "../shared/CustomLoading";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Cart() {
  const dispatch = useDispatch();
  const tokenStore = useSelector((state) => state.tokenReducer);
  const cartStore = useSelector((state) => state.cartReducer);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (tokenStore?.token) dispatch(getUserCart(tokenStore.token));
  }, [dispatch, tokenStore.token]);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserCart(tokenStore.token));
    setLoading(false);
  }, [dispatch, tokenStore.token]);

  useEffect(() => {
    if (cartStore?.usercartget?.data) {
      setCartData([...cartStore.usercartget.data.result]);
    }
  }, [cartStore?.usercartget?.data]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="carthhead">
            <h2>장바구니</h2>
          </div>
          <CartBody data={cartData} />
        </>
      )}
    </>
  );
}
const CartBody = (props) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setCartData(props.data);
    setLoading(false);
  }, [props]);

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
                    id={item.id}
                    path={item.boardImgPath}
                    title={item.title}
                    subtitle={item.subtitle}
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const tokenStore = useSelector((state) => state.tokenReducer);
  const DeleteCartCard = async () => {
    const delData = { board: props.id, token: tokenStore.token };
    setLoading(true);
    await dispatch(delUserCart(delData));
    await dispatch(getUserCart(tokenStore.token));
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Card sx={{ width: 345 }}>
            <div className="cartDelIcon" onClick={DeleteCartCard}>
              <DeleteIcon
                className="cartdeliicon"
                sx={{ width: "30px", height: "30px", color: "#9d2437" }}
              />
            </div>
            <img style={{ width: "100%" }} src={props.path} alt="images" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </>
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
