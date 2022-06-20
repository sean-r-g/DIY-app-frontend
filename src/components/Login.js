import {Modal, Button} from 'react-bootstrap'
import { useRef, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = ({user, setUser, loggedIn, setLogin}) => {

  const userRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [signedUp, setSignedUp] = useState(false);
//   const [loggedIn, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      // .post(`https://localhost:8000/register/`, {
      .post(`https://diybackend.herokuapp.com/register/`, {
        username: user,
        email: email,
        password: pwd,
      })
      .then((response, err) => {
        alert(response.data.message);
        setSignedUp(true);
      })
        .catch((err) => {
        return alert(`${user} already exists. Please pick another username.`);
      })
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    // const url = "https://localhost:8000/token/";
    const url = "https://diybackend.herokuapp.com/token/"
    axios
      .post(url, {
        username: user,
        password: pwd,
      })
      .then((response) => {
        let accessToken = localStorage.setItem("token", response.data.access);
        let decodedToken = jwt_decode(response.data.access);
        setToken(localStorage.getItem("token", accessToken));
        setUserInfo(decodedToken);
        setLogin(true);
      })
      .catch((err) => {
        return alert(`Wrong username or password. Try again...`);
      })
  };

  // const getUserInfo = () => {
  //   console.log(userInfo.username);
  //   console.log(token);
  //   console.log(userInfo);
  // };

  const handleSignOut = async (e) => {
    e.preventDefault();
    console.log(`logged out`);
    localStorage.removeItem("token");
    setToken("");
    setUserInfo("");
    setLogin(false);
  };

  const addToList = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const toggleCreateAcct = () => {
    setSignedUp(true)
  }
  const toggleLogin = () => {
    setLogin(false)
    setSignedUp(false)
  }

  return (
    <>
    {!loggedIn ? <button id='loginmodal' variant="primary" onClick={handleShow}>
      Login
    </button> : <button id='loginmodal' variant="primary" onClick={handleShow}>Log Out</button>}

    <Modal id='login-modal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id='modaltitle'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body id='modalbody'>
      {signedUp ? (
        <section>
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <br/>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              required
            />
            <br/>
            <label htmlFor="email">Email:</label>
            <br/>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <br/>
            <label htmlFor="password">Password:</label>
            <br/>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              required
            />
            <br/>
            <br/>
            <button>Sign up!</button>
            <br/>
            <br/>
            <button onClick={toggleLogin}>Login</button>
          </form>
        </section>
      ) : (
        <>
          {!loggedIn ? (
            <section>
              <form onSubmit={handleSignIn}>
                <label htmlFor="Username">Username:</label>
                <br/>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                  value={user}
                  required
                />
                <br/>
                <label htmlFor="password">Password:</label>
                <br/>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  value={pwd}
                  required
                />
                <br/>
                <br/>
                <button>Sign in</button>
              </form>
              <br/>
              <button onClick={toggleCreateAcct}>Create Account</button>
            </section>
          ) : (
            <>
              <h1> You're Logged in as {user}!</h1>
              {/* <button onClick={getUserInfo}>My Info</button> */}
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          )}
        </>
      )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default Login