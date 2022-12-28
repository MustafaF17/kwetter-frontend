import { Routes, Route } from "react-router-dom"
import React, {useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate=useNavigate();
    const [errorResponse, setErrorResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const loginHandler = async e => {
      e.preventDefault();
      console.log("Username: " + username + " password: " + password);
  
      await axios.post("http://localhost:5168/gateway/auth/login",
        {
          username: username,
          password: password
        })
        .then((res) =>  
        {
            //console.log(res.data);
            localStorage.setItem('token', "Bearer " + res.data);

            if(res?.status===200)
            navigate('/timeline')
            // Modal show success
        }
        
        )
        .catch(error => {
          setErrorResponse(error.response.status)
          console.log("Invalid user");
        })
      }


  return (
    <Form onSubmit={(loginHandler)}>

    <div className="Auth-form-content">
        <h3 className="Auth-form-title"></h3>
        <div className="text-center">
          Not registered? <a><Link to="/register">Register</Link></a>
          <span className="link-primary">
          </span>
        </div>
        <div>
        <div className="form-group mt-3">
          <label>Username</label>
          <Form.Control autoFocus type="text"  onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <Form.Control autoFocus type="password"  onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="d-grid gap-2 mt-3">
        <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        </div>
      </div>
    
      </Form>
  )
}

export default Login