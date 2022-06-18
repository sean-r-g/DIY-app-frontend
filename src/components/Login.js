import {Modal, Button} from 'react-bootstrap'
import { useRef, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = (props) => {

  const userRef = useRef();
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [loggedIn, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    axios
      .post(`http://localhost:8000/register/`, {
        username: user,
        email: email,
        password: pwd,
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        setSignedUp(true);
      });
  };

  // const updateToke = async () => {
  //   let response = await fetch("http://localhost:8000/token/refresh/", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({'refresh': authTokens.refresh})
  //   });
  //   let data = await response.json()

  //   if (response.stats === 200) {

  //   }
  // }

  const handleSignIn = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/token/";
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
      });
  };

  const getUserInfo = () => {
    console.log(userInfo.username);
    console.log(token);

    console.log(userInfo);
  };

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

  return (
    <>
    <button id='loginmodal' variant="primary" onClick={handleShow}>
      Login
    </button>

    <Modal id='login-modal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id='modaltitle'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body id='modalbody'>
      {!signedUp ? (
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
          </form>
        </section>
      ) : (
        <>
          {!loggedIn ? (
            <section>
              <form onSubmit={handleSignIn}>
                <label htmlFor="Username">Username:</label>
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
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  value={pwd}
                  required
                />
                <button>Sign in</button>
              </form>
            </section>
          ) : (
            <>
              <h1> You're Logged in as {user}!</h1>
              <button onClick={getUserInfo}>My Info</button>
              <button onClick={handleSignOut}>Sign Out</button>
              <button value="strawberries" onClick={addToList}>
                strawberries
              </button>
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