import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "../Timeline/Timeline.css";

function Timeline() {
  const [tweets, setTweets] = useState([]);
  const [followingTweets, setFollowingTweets] = useState([]);
  const [commentText,setCommentText] = useState("")

  useEffect(() => {
    getTweets();
    // getFollowingTweets();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const getTweets = async () => {
    await axios
      .get("http://localhost:5168/gateway/Kweet/Feed")
      .then((res) => {
        setTweets(res.data);
        console.log(res.data);

      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  const submitTweetHandler = async e => {
    e.preventDefault();
    console.log("Test")
    console.log(localStorage.getItem('token'));
    console.log(commentText);

    const options = {
      method: 'POST',
      url: 'http://localhost:5168/gateway/kweet',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      data: commentText
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    refreshPage();

  }


  // const getFollowingTweets = async () => {
  //   await axios
  //     .get("")
  //     .then((res) => {
  //       setFollowingTweets(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };


  return (
    <>

<Form>

  <div className="tweet-wrap">
        <div className="tweet-header-info">
          <div className="form-group">
            <div className="form-group purple-border">
              <label htmlFor="exampleFormControlTextarea4">
                Whats on your mind?
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea4"
                rows="3"
                onChange={e => setCommentText(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <Button variant="primary" onClick={submitTweetHandler}>
        Submit Tweet
      </Button>
      </div>

  </Form>

      <div>
        <div>
          {tweets.map((tweets) => (
            <div key={tweets.id}>
           <div className="tweet-wrap">
           <div className="tweet-header">
             <img
               src="https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg"
               className="avator"
             ></img>
             <div className="tweet-header-info">
                <span>{tweets.username}</span>
                <span>{}</span>
               <span>. Jun 27</span>
               <p>{tweets.text}</p>
             </div>
           </div>
           <div className="tweet-info-counts">
             <div className="likes">
               <svg
                 className="feather feather-heart sc-dnqmqq jxshSx"
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="20"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="2"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 aria-hidden="true"
               >
                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
               </svg>
             </div>
   
             <div className="message">
               <svg
                 className="feather feather-send sc-dnqmqq jxshSx"
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="20"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="2"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 aria-hidden="true"
               >
                 <line x1="22" y1="2" x2="11" y2="13"></line>
                 <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
               </svg>
             </div>
           </div>
         </div>
         </div>
          ))}
        </div>
      </div>

      {/* <div class="tweet-wrap">
        <div class="tweet-header">
          <img
            src="https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg"
            className="avator"
          ></img>
          <div class="tweet-header-info">
            Steve Schoger <span>@Steve Schoger</span>
            <span>. Jun 27</span>
            <p>
              🔥 If you're tired of using outline styles for secondary buttons,
              a soft solid background based on the text color can be a great
              alternative.
            </p>
          </div>
        </div>
        <div class="tweet-info-counts">
          <div class="likes">
            <svg
              class="feather feather-heart sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>

          <div class="message">
            <svg
              class="feather feather-send sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Timeline;
