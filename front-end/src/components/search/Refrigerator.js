//Refrigerator.js
//Install Component
import React, { useEffect, useState, useRef } from "react";

import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import gsap from "gsap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//User Component
import headerIcon from "../../assets/monkey_2.png";
//Style
import "./Refrigerator.css";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Refrigerator = () => {
  const modalRef = useRef(null);
  const [style, setStyle] = useState("hidden");
  const [flag, setFlag] = useState(false);
  const onClickHandler = (type) => {
    switch (type) {
      case "SAVE":
        return window.confirm("선택한 재료를 사용하여 검색하시겠습니까?")
          ? alert("이동안하지롱")
          : alert("선택완료 후 저장버튼을 눌러주세요.");
      case "CANCEL":
        return alert("취소버튼 눌렀음");
      default:
        return;
    }
  };

  useEffect(() => {
    if (flag) {
      setTimeout(() => {
        setStyle("visible");
      }, 250);
      gsap.fromTo(modalRef.current, { x: 0, y: -200 }, { x: 250, y: -200 });
    } else {
      setTimeout(() => {
        setStyle("hidden");
      }, 250);
      gsap.fromTo(modalRef.current, { x: 250, y: -200 }, { x: 0, y: -200 });
    }
  });
  return (
    <div className="compartmentRefri">
      <div className="refriHeader">
        <img src={headerIcon} alt="headerIcon" />
        <h3>냉장고 문을 열어 재료들을 넣어주세요!</h3>
      </div>
      <table className="drawer">
        <thead></thead>
        <tbody>
          <tr className="topSpace">
            <td>
              <div
                onClick={() => {
                  flag ? setFlag(false) : setFlag(true);
                }}
              >
                <RefriDoor msg={flag} />
              </div>

              <div
                className="searchModal"
                style={{ overflow: style, transition: "0.4s" }}
                ref={modalRef}
              >
                <SearchModal flag={flag} />
              </div>
            </td>
          </tr>
          <tr className="bottomSpace">
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="refriBtn">
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => onClickHandler("SAVE")}
            variant="contained"
            color="main"
          >
            저장
          </Button>
          &nbsp;
          <Button
            onClick={() => onClickHandler("CANCEL")}
            variant="outlined"
            color="main"
          >
            취소
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};
const RefriDoor = (props) => {
  const door = props.msg ? { transform: "rotateY(-160deg)" } : null;
  return (
    <div className="refriDoor">
      <div className="refriOuter" style={door}></div>
      <div className="refriInner"></div>
    </div>
  );
};
const SearchModal = (props) => {
  const [style, setStyle] = useState(0);
  const searchKind = [
    { field: "id", headerName: "번호", width: 70 },
    {
      field: "name",
      headerName: "재료명",
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
  ];
  useEffect(() => {
    props.flag
      ? setTimeout(() => {
          setStyle(400);
        }, 500)
      : setStyle(0);
  });
  return (
    <div className="modalContainer">
      <TextField
        label="재료 검색"
        type="search"
        variant="outlined"
        helperText="재료명을 입력하세요."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ height: style, width: "100%", transition: "0.5s" }}>
        <DataGrid
          rows={materials}
          columns={searchKind}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};
const materials = [
  { id: 1, name: "yoon" },
  { id: 2, name: "yoon" },
  { id: 3, name: "yoon" },
  { id: 4, name: "yoon" },
  { id: 5, name: "yoon" },
  { id: 6, name: "yoon" },
];

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    main: createColor("#9D2437"),
  },
});
