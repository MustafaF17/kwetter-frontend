import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import FlipMove from "react-flip-move";
import axios from "axios";
import Button from "@mui/material/Button";
import { KweetAPI, LikeAPI } from "../../settings";

function Feed() {
  const [tweets, setTweets] = useState([]);
  const [followingTweets, setFollowingTweets] = useState([]);
  const [showFollowingTweets, setshowFollowingTweets] = useState(false);
  const [followButtonText, setFollowButtonText] = useState(
    "Show following feed"
  );

  useEffect(() => {
    getTweets();
    getFollowingTweets();
    getLikedTweets();
  }, []);

  const getTweets = async () => {
    await axios
      .get(KweetAPI + "/Feed")
      .then((res) => {
        setTweets(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFollowingTweets = async () => {
    const options = {
      method: "GET",
      url: KweetAPI + "/followingfeed",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    await axios
      .request(options)
      .then(function (res) {
        console.log(res.data);
        setFollowingTweets(res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getLikedTweets = async () => {
    const options = {
      method: "GET",
      url: LikeAPI + "/likebyuser",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    await axios
      .request(options)
      .then(function (res) {
        console.log(res.data);
        setFollowingTweets(res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const changeFeedTweets = (e) => {
    e.preventDefault();

    if (showFollowingTweets === false) {
      setshowFollowingTweets(true);
      setFollowButtonText("Show normal feed");
    }
    if (showFollowingTweets === true) {
      setshowFollowingTweets(false);
      setFollowButtonText("Show following feed");
    }

    console.log("fired change feed");
    console.log("after firing:" + showFollowingTweets);
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <div className="cbutton">
          <h2>Home</h2>
          <Button variant="contained" onClick={changeFeedTweets}>
            {followButtonText}
          </Button>
        </div>
      </div>

      <TweetBox />
      <FlipMove>
        {showFollowingTweets === false
          ? tweets.map((tweets) => (
              <Post
                userid={tweets.userId}
                key={tweets.id}
                displayName={tweets.name}
                username={tweets.username}
                text={tweets.text}
                status={false}
              />
            ))
          : followingTweets.map((tweets) => (
              <Post
                userid={tweets.userId}
                key={tweets.id}
                displayName={tweets.name}
                username={tweets.username}
                text={tweets.text}
                status={true}
              />
            ))}

        {}
      </FlipMove>
    </div>
  );
}

export default Feed;
