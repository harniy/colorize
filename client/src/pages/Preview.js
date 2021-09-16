import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/preview.css";

export default function Preview() {
    let history = useHistory();

  if (localStorage.getItem("prev")) {
    history.push("/app");
  } else {
    setTimeout(()=>{
        localStorage.setItem("prev", true);
        history.push("/app");
    }, 2000)
  }

  return (
    <div className="preview__sections">
      <h1>Colorize</h1>
      <p>powered by mood</p>
    </div>
  );
}
