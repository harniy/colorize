import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { colorsFromDb } from "../features/colors";
import "../styles/users_colors.css";

export default function UsersColors() {
  const [colorsDb, setColorsDb] = useState([]);
  const serverUrl = useSelector(state => state.server.url)


  const dispatch = useDispatch();

  const getColorsFromDb = async () => {
    try {
      const resp = await fetch(`${serverUrl}colors/`);
      const data = await resp.json();
      console.log(data)
      setColorsDb([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  function changeTitle(e, num) {
    if(num === 1) {
      e.target.innerText = 'update'
    } else {
      e.target.innerText = 'Users colors'
    }
  }

  return (
    <div>
      {colorsDb.length ? (
        <div className="users__colors_db">
          <h3
            style={{ margin: 0 }}
            className="popular__colors__title"
            onClick={getColorsFromDb}
            onMouseOver={(e)=> changeTitle(e, 1)}
            onMouseLeave={(e)=> changeTitle(e, 0)}
          >
            Users colors
          </h3>
          <div className="users__colors__section">
            {colorsDb.map((el, i) => (
              <div
                className="colors__Db"
                key={i}
                onClick={() => dispatch(colorsFromDb(colorsDb[i]))}
              >
                <p style={{ paddingRight: 10, width: "30%" }} title={el.user}>
                  {el.user.length > 6 ? el.user.slice(0, 6) + "..." : el.user}:
                </p>
                {el.colors.map((color, idx) => (
                  <div
                    title="click"
                    key={idx}
                    style={{ height: 40, width: "20%", backgroundColor: color }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="users__colors_db" onClick={getColorsFromDb}>
          popular colors
        </div>
      )}
    </div>
  );
}
