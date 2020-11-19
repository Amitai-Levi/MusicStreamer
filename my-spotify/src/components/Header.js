import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext"



function Header() {

    const { currentUser } = useAuth();
    const { logout } = useAuth();    
    const onLogout = () => {
        logout()
    }

    const [navbar, setNavbar] = useState(false)
    //
    // currentUser && console.log(currentUser);
    const changeBackground = () => {
        if (window.scrollY > 0) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    // const loginButton = <span onClick={login}>Login</span>
    const logoutButton = <span onClick={logout}>Sign Out</span>
    
    
    window.addEventListener("scroll", changeBackground)
    return (
        <>
            <div className={navbar ? "header active_link" : "header"}>
                <span>
                  <Link  to='/' className="logo">
                      <img src={"//s.ytimg.com/yts/img/music/web/on_platform_logo_dark-vflzMsRak.svg"}></img>
                  </Link>
                </span>

                <span className={"tabs_selector"}>
                  <NavLink className={"tab"} exact to="/" activeStyle={{color: 'white', textDecoration:"none"}}>Home</NavLink>
                  <NavLink className={"tab"} exact to="/explore" activeStyle={{color: 'white', textDecoration:"none"}}>Explore</NavLink>
                  <NavLink className={"tab"} exact to="/library" activeStyle={{color: 'white', textDecoration:"none"}}>Library</NavLink>
                  <NavLink className={"tab"} exact to="/search" activeStyle={{color: 'white', textDecoration:"none"}}>Search</NavLink>
                </span>

                <span className={"profile_logo"}>
                  {currentUser ? 
                  <span>
                    <span onClick={logout} className="grey-white-pointer">Sign Out</span> <span className="grey-white-pointer">{currentUser.email}</span>
                  </span>
                  :
                    <Link to="/login" className="grey-white-pointer">Sign In</Link>} 
                </span>
            </div>
        </>
    )
}
export default Header;