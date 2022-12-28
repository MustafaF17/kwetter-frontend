import { Routes, Route } from "react-router-dom"
import React, {useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate=useNavigate();
  const [errorResponse, setErrorResponse] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async e => {
    e.preventDefault();


    await axios.post("http://localhost:5168/gateway/auth/register",
      {
        email: email,
        name: name,
        username: username,
        password: password
      })
      .then((res) => {
        console.log(res.data);
        if(res?.status===200)
        navigate('/login')
      }
        )
      .catch(error => {
        setErrorResponse(error.response.status)
      })
    }


  return (
    <Form onSubmit={(registerHandler)}>

    <div className="Auth-form-content">
        <h3 className="Auth-form-title"></h3>
        <div className="text-center">
          Already registered? <a><Link to="/login">Login</Link></a>
          <span className="link-primary">
          </span>
        </div>
        <div>
        <div className="form-group mt-3">
          <label>Email</label>
          <Form.Control autoFocus type="text"  onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mt-3">
          <label>Name</label>
          <Form.Control autoFocus type="text"  onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group mt-3">
          <label>Username</label>
          <Form.Control autoFocus type="text"  onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <Form.Control autoFocus type="text"  onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="d-grid gap-2 mt-3">
        <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
        </div>
      </div>
    
      </Form>
  )
}

export default Register