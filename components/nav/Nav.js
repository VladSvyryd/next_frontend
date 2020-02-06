import "./nav.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
export const Nav = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setToken(localStorage.getItem("jwt"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:1337/auth/local",
      data: {
        identifier: input.email,
        password: input.password
      }
    })
      .then(response => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        setToken(response.data.jwt);
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
      })
      .catch((error, message) => {
        // Handle error.
        console.log("An error occurred:", error);
        console.log(error.response.data.message[0].messages[0]);
      });
  };
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };
  return (
    <>
      <div>This is my Nav</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          height: "80px",
          background: "aquamarine",
          alignItems: "center"
        }}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        {!user ? (
          <Link href="/register">
            <a>Register</a>
          </Link>
        ) : (
          <button onClick={() => handleLogout()}> Logout</button>
        )}
        {!token ? (
          <div>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={e => handleChange(e)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={e => handleChange(e)}
              />
            </label>
            <button onClick={() => handleSubmit()}>Login</button>
          </div>
        ) : (
          <div>{user && user.username}</div>
        )}
      </div>
    </>
  );
};
