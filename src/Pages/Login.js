import { useState } from "react";
import { createUser, getUser } from "../services/user.service";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { loginUser, singUpUser } from "../controllers/user.controller";
export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const singUp = async (e) => {
    try {
      e.preventDefault();
      await singUpUser(
        form.nickname_signup,
        form.password_signup,
        form.email_signup
      );
      navigate("/");
    } catch (error) {
      if (error.status === 0) {
        alert(error.body);
        return;
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form.email_login, form.password_login, setCurrentUser);
      navigate("/");
    } catch (error) {
      if (error.status === 0) {
        alert(error.body);
        return;
      }
    }
  };

  return (
    <body>
      <b>Login</b>
      <br />
      <br />
      <form method="post" action="login" />
      <input type="hidden" name="goto" value="news" />
      <table border="0">
        <tbody>
          <tr>
            <td>email:</td>
            <td>
              <input
                onChange={handleChange}
                type="text"
                name="email_login"
                size="20"
                autocorrect="off"
                spellcheck="false"
                autocapitalize="off"
                autofocus="true"
              />
            </td>
          </tr>
          <tr>
            <td>password:</td>
            <td>
              <input
                onChange={handleChange}
                type="password"
                name="password_login"
                size="20"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input onClick={login} type="submit" value="login" />
      <form />
      <a href="forgot">Forgot your password?</a>
      <br />
      <br />
      <b>Create Account</b>
      <br />
      <br />
      <form method="post" action="login" />
      <input type="hidden" name="goto" value="news" />
      <input type="hidden" name="creating" value="t" />
      <table border="0">
        <tbody>
          <tr>
            <td>username:</td>
            <td>
              <input
                onChange={handleChange}
                type="text"
                name="nickname_signup"
                size="20"
                autocorrect="off"
                spellcheck="false"
                autocapitalize="off"
              />
            </td>
          </tr>
          <tr>
            <td>password:</td>
            <td>
              <input
                onChange={handleChange}
                type="text"
                name="password_signup"
                size="20"
              />
            </td>
          </tr>

          <tr>
            <td>email:</td>
            <td>
              <input
                onChange={handleChange}
                type="text"
                name="email_signup"
                size="20"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="create account" onClick={singUp} />
      <form />
    </body>
  );
}
