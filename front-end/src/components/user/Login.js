//Login.js
//Install Component;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
//User Component
import { handleLogin, loginVali } from "../../store/actions/UserAction";
//Style
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Assignment from "@mui/icons-material/Assignment";
import "./SignUp.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
  const dispatch = useDispatch();
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const pwHandler = (e) => {
    setPw(e.target.value);
  };
  const onClickLogin = async (e) => {
    e.preventDefault();
    if (email === "" || pw === "") {
      window.alert("이메일과 비밀번호를 확인해주세요.");
      return;
    }
    dispatch(loginVali(email, pw));
    dispatch(handleLogin());
    setTimeout(() => {
      if (!Cookies.get("accessToken") && !tokenReducer) {
        window.alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        inputReset();
      }
    }, 500);
  };
  const inputReset = () => {
    setEmail("");
    setPw("");
  };
  return (
    <div className="loginContainer">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "main.main" }}>
              <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box
              component="form"
              onSubmit={onClickLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="main"
                value={email}
                onChange={emailHandler}
                placeholder="이메일을 입력하세요."
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="main"
                value={pw}
                onChange={pwHandler}
                placeholder="비밀번호를 입력하세요."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="main"
              >
                LOGIN
              </Button>
              <Link href="/signup">
                <Button
                  variant="outlined"
                  startIcon={<Assignment />}
                  style={{ float: "right" }}
                  color="main"
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    main: createColor("#9D2437"),
  },
});
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:8080/">
        Monkey Refrigerator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
