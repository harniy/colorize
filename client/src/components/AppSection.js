import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import like_clean from "../assets/like1.png";
import like_click from "../assets/like2.png";
import CreateColor from "./CreateColors";
import LikedColors from "./LikeColors";
import UsersColors from "./UsersColors";

export default function AppSection() {
  const [color, setColor] = useState({});
  const [likeColors, setLikeColors] = useState([]);
  const [isLike, setIslike] = useState(false);
  const [userGetColor, setUserGetColor] = useState("");

  const colorsFromDb = useSelector(state => state.colors.value)

  useEffect(()=>{
    if(Object.keys(colorsFromDb).length) {
      let completeColors = {
        id: Date.now(),
        colors: colorsFromDb.colors,
      };
      setColor(completeColors);
    }
  }, [colorsFromDb])

  function createColor() {
    const a = Math.floor(Math.random() * 360);
    const b = Math.floor(Math.random() * (100 - 25) + 25);
    const c = Math.floor(Math.random() * (100 - 25) + 25);

    return `hsl(${a}, ${b}%, ${c}%)`;
  }

  function startColor() {
    let colors = [];
    for (let i = 0; i <= 2; i++) {
      colors.push(createColor());
    }
    let completeColors = {
      id: Date.now(),
      colors: colors,
    };
    setColor(completeColors);
  }

  function likeColorsFunc() {
    setLikeColors([...likeColors, color]);
    setIslike(true);
    setTimeout(() => {
      startColor();
      setIslike(false);
    }, 500);
  }

  function sendColor(data) {
    setColor(data);
  }
  


  return (
    <main>
      <button className="btn btn-1" onClick={startColor}>
        colorize
      </button>

      {Object.keys(color).length !== 0 ? (
        <div className="random__color__section">
          <h3>Random colors:</h3>
          {color.colors.map((el, i) => (
            <div
              className="color__block"
              style={{ backgroundColor: el, position: "relative" }}
              key={i}
              onClick={() => setUserGetColor(el)}
            >
              <p className="color__info">{el}</p>
            </div>
          ))}
          <img
            src={!isLike ? like_clean : like_click}
            className="like__btn"
            onClick={() => (isLike ? "" : likeColorsFunc())}
            title="like"
            alt="like"
          />
        </div>
      ) : (
        ""
      )}

      {Object.keys(color).length !== 0 ? (
        <CreateColor
          colorFromApp={userGetColor}
        />
      ) : (
        ""
      )}

      {Object.keys(likeColors).length !== 0 ? (
        <LikedColors likeColors={likeColors} sendColor={sendColor} />
      ) : (
        ""
      )}

      <UsersColors /> 
    </main>
  );
}
