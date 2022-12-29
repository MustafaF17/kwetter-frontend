import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate=useNavigate();
  function logout() {

    console.log("Logged out");
    localStorage.setItem('token','');
    navigate('/login')
    }
    
    function profile() {
      navigate('/profile')
      }

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <a onClick={profile}><SidebarOption Icon={PermIdentityIcon} text="Profile" /></a>
      <a onClick={logout}><SidebarOption Icon={MoreHorizIcon} text="Logout"  /></a>
    </div>
  );
}

export default Sidebar;
