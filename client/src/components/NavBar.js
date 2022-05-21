import React from "react";
import { useDispatch } from 'react-redux';
import { signOut } from "../redux/authSlice";

const NavBar = () => {
    const dispatch = useDispatch();
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(signOut())
    }

    return <div className="navBar">
        <a className="brand" href="#">Rapydonate</a>
        <div className="userInfo">
            <span className="userName">Barış KARAMUSTAFA</span>
            <div className="dropdown">
                <button className="dropbtn"><img src="https://gravatar.com/avatar/fb6e7c4ed7cff6da0151ceb18c911733?s=400&d=robohash&r=x" /></button>
                <div className="dropdown-content">
                    <a href="#" onClick={onLogout}>Logout</a>
                </div>
            </div>
        </div>
    </div>
}

export default NavBar;