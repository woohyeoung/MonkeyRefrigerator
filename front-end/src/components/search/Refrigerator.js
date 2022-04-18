//Refrigerator.js
//Install Component
import React, { useEffect, useState, useRef } from "react";

import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import gsap from "gsap";
//User Component
//Style
import "./Refrigerator.css";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Refrigerator = () => {
  const modalRef = useRef(null);
  const [style, setStyle] = useState("hidden");
  const [flag, setFlag] = useState(false);
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
        <h3>My Refrigerator</h3>
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
