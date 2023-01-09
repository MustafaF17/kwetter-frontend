import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import { Avatar, Button } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import { useNavigate } from "react-router-dom";
import { FollowAPI, KweetAPI } from "../../settings";

const Post = forwardRef(
  ({ userid, displayName, username, verified, text, image, status }, ref) => {
    const navigate = useNavigate();
    const refreshPage = () => {
      window.location.reload();
    };
    const [showModal, setShowModal] = useState(false);

    const toggleShow = async (username) => {
      if (showModal) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    };

    const followUser = async (userid) => {
      console.log("following: " + userid);
      // Add API call to this
      const options = {
        method: "POST",
        url: FollowAPI + "/follow",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: userid,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

        refreshPage();
    };

    const unfollowUser = async (userid) => {
      const options = {
        method: "DELETE",
        url: FollowAPI + "/unfollow",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: userid,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
        refreshPage();
    };

    return (
      <>
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {displayName}{" "}
                  <a>
                    <Button onClick={() => toggleShow()}>@{username}</Button>
                    <span className="post__headerSpecial">
                      {verified && <VerifiedUserIcon className="post__badge" />}{" "}
                      {/* @{username} */}
                    </span>
                  </a>
                </h3>
              </div>
              <div className="post__headerDescription">
                <p>{text}</p>
              </div>
            </div>
            <img src={image} alt="" />
            <div className="post__footer">
              <ChatBubbleOutlineIcon fontSize="small" />
              <RepeatIcon fontSize="small" />
              <FavoriteBorderIcon
                fontSize="small"
                onClick={(event) => (window.location.href = "main")}
              />
              <PublishIcon fontSize="small" />
            </div>
            {showModal && profileModal()}
          </div>
        </div>
      </>
    );

    // Update Modal
    function profileModal() {
      return (
        <>
          {status === true ? (
            <Button onClick={() => unfollowUser(userid)} variant="contained">
              Unfollow
            </Button>
          ) : (
            <Button onClick={() => followUser(userid)} variant="outlined">
              Follow
            </Button>
          )}
        </>
      );
    }
  }
);

export default Post;
