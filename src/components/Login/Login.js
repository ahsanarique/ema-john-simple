import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    newUser: false,
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleBlur = (e) => {
    let isFieldValid;

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const validPassword = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = validPassword && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const loginStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div style={loginStyle}>
      <div>
        {!user.isSignedIn ? (
          <button onClick={() => googleSignIn()}>Sign in using Google</button>
        ) : (
          <button onClick={() => signOut()}>Sign out</button>
        )}
        <br />
        <button onClick={() => fbSignIn()}>Sign in using Facebook</button>
        {user.isSignedIn && <p>Welcome, {user.name}</p>}
      </div>

      <div>
        <h1>Authentication</h1>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">Registration</label>
        <form onSubmit={handleSubmit} action="">
          {newUser && (
            <input
              type="text"
              name="name"
              onBlur={handleBlur}
              placeholder="Your name"
            />
          )}
          <br />
          <input
            type="text"
            name="email"
            onBlur={handleBlur}
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            placeholder="Password"
            required
          />
          <br />
          <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
        </form>
      </div>
      <div>
        {user.success ? (
          <p style={{ color: "green" }}>
            User {newUser ? "created" : "logged in"} successfully
          </p>
        ) : (
          <p style={{ color: "red" }}>{user.error}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
