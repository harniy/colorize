import React, { useMemo, useState } from "react";
import { useRef } from "react";
import "../styles/create_color.css";

export default function CreateColor({ colorFromApp }) {
  const [userColor, setUserColor] = useState({
    color_one: "#fff",
    color_two: "#fff",
    color_three: "#fff",
  });
  const [userName, setUserName] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [selectColorBlock, setSelectColorBlock] = useState("");

  const infoBlock = useRef(null);

  function getColor(e) {
    const blocks = document.querySelectorAll(".user__color");
    setSelectColorBlock("");
    blocks.forEach((el) => el.classList.remove("selected__color"));

    if (e.target.className !== "create__color__block") {
      const colorBlock = e.target;
      colorBlock.classList.add("selected__color");

      setSelectColorBlock(colorBlock.dataset.color);
    }
  }

  useMemo(() => {
    if (selectColorBlock !== "") {
      const color = userColor;
      color[selectColorBlock] = colorFromApp;
      setUserColor(color);
    }
  }, [colorFromApp]);

  function savedColor() {
    const color = { user: userName, colors: Object.values(userColor) };
    fetch("http://localhost:3300/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });

    setUserColor({
      color_one: "#fff",
      color_two: "#fff",
      color_three: "#fff",
    });
    setIsCreate(false);
    setIsSend(false);
    setUserName("");
    infoBlock.current.style.display = 'none'
  }


  function colorShowInfo(e) {
    let currentColor = e.target.style.backgroundColor;
    infoBlock.current.style.display = "block";
    infoBlock.current.innerHTML = currentColor;
  }

  function colorhideInfo() {
    setTimeout(() => {
      infoBlock.current.style.display = "none";
    }, 1000)
  }

  return (
    <div className="create__colors__section">
      <p
        className="create__color__title"
        onClick={() => setIsCreate(!isCreate)}
        title="Click to create"
      >
        Create own colors
      </p>
      <p
        className="speech"
        ref={infoBlock}
        onMouseLeave={colorhideInfo}
      >
        hsl(158, 82%, 66%)
      </p>
      {isCreate ? (
        <div className="create__color__block" onClick={getColor}>
          <div
            style={{ backgroundColor: userColor.color_one }}
            className="user__color"
            data-color="color_one"
            onMouseOver={colorShowInfo}
          ></div>
          <div
            style={{ backgroundColor: userColor.color_two }}
            className="user__color"
            data-color="color_two"
            onMouseOver={colorShowInfo}
          ></div>
          <div
            style={{ backgroundColor: userColor.color_three }}
            className="user__color"
            data-color="color_three"
            onMouseOver={colorShowInfo}
          ></div>
        </div>
      ) : (
        ""
      )}
      {isCreate && Object.values(userColor).some((el) => el !== "#fff") ? (
        <p className="create__color__title" onClick={() => setIsSend(!isSend)}>
          save
        </p>
      ) : (
        ""
      )}

      {isSend ? (
        <div className="save__user__modal">
          <input
            name="user-name"
            placeholder="Name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button name="user-send" onClick={savedColor}>
            ok
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
