import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";


function Nav() {
    const [show, handleShow] = useState(false);
   const history = useHistory();
    const transitionNavBar = () => {
        if(window.scrollY > 100 ){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }
   
      
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
            <img onClick={() => history.push("/")} className="nav__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="logo" title="logo" width="200px"/>
            <img onClick={() => history.push("/profile")} className="nav__avtar" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="avtar" title="avtar" width="200px"/>
            </div>
        </div>
    )
}

export default Nav
