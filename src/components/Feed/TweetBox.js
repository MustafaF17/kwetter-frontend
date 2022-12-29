import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import { KweetAPI } from "../../settings";
import axios from "axios";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");


  const refreshPage = () => {
    window.location.reload();
  };

  const sendTweet = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: KweetAPI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      data: tweetMessage
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    setTweetMessage("");
    refreshPage();
    
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
