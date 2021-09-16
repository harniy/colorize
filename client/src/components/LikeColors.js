import React, { useEffect, useRef, useState } from "react";
import "../styles/liked_section.css";
import colorPalet from "../assets/liked_colors.png";

export default function LikedColors({ likeColors, sendColor }) {
  const [isOpen, setIsOpen] = useState(false)

  let section = useRef(null)
  let title = useRef(null)
  let colors = useRef(null)


  function showLikedSection() {

    section.current.style = "transform: translateY(-400px); opacity: 1;";
    setTimeout(() => {
      title.current.style = "transform: translateX(0); opacity: 1;";
      colors.current.classList.add('liked__colors_show')
    }, 800);
    setTimeout(()=>{ 
        colors.current.style = 'opacity: 1'
    },1300)
  }

  function hideLikedSection() {
    
    colors.current.style = "transform: translatey(-50px); opacity: 0"
    title.current.style = "transform: translateX(-100); opacity: 0;";

    setTimeout(()=>{ 
      colors.current.classList.remove('liked__colors_show')
    section.current.style = "transform: translateY(0); opacity: 0.5;";
  },500)

  }

useEffect(() => {
  if(isOpen) {
    showLikedSection()
  } else {
    hideLikedSection()
  }
}, [isOpen])

  return (
    <div className="liked__colors__section" ref={section}>
      <div className="liked__colors__header">
        <img src={colorPalet} onClick={() => setIsOpen(!isOpen)} alt="palet" />
        <h3 className="linked_h3" ref={title}>Liked colors:</h3>
      </div>
      <div className="liked__colors" title="click" ref={colors}>
        {likeColors.map((color) => (
          <div className="l_colors" key={color.id} onClick={()=>sendColor(color)}>
            {color.colors.map((el, i) => (
              <div
                key={i}
                style={{ height: "50px", width: "33%", backgroundColor: el }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
