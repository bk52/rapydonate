import React from "react";
import { useDispatch } from 'react-redux';
import { signOut } from "../redux/authSlice";
import BKLogo from '../assets/img/BK.png';

const NavBar = () => {
    const dispatch = useDispatch();
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(signOut())
    }

    return <div className="navBar">
        <a className="brand" href="#">Rapydonate</a>
        <div className="userInfo">
            <span className="userName">Gamer King</span>
            <div className="dropdown">
                <button className="dropbtn"><img src={BKLogo} /></button>
                <div className="dropdown-content">
                    <a href="#" onClick={onLogout}>Logout</a>
                </div>
            </div>
        </div>
    </div>
}

export default NavBar;