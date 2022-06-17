import { useState } from "react";
import { createUser } from "../services/user.service";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
          });
            }

            const handleClick = async (e) => {
                e.preventDefault();

               const status =  await createUser(form.nickname_signup, form.password_signup, form.email_signup)
               console.log(status)
              if(status)  navigate('/');

            }

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
              <input onChange={handleChange}
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
              <input onChange={handleChange} type="password" name="password_login" size="20" />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="login" />
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
              <input onChange={handleChange} type="text" name="password_signup" size="20" />
            </td>
          </tr>

          <tr>
            <td>email:</td>
            <td>
              <input onChange={handleChange} type="text" name="email_signup" size="20" />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="submit" value="create account" onClick={handleClick} />
      <form />
    </body>
  );
}
