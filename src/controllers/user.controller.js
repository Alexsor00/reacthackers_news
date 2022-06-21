import { useState } from "react";
import { createUser, getUser, getUsers } from "../services/user.service";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

function ExceptionUser(msg) {
  this.body = msg;
  this.nombre = "ExceptionUser";
  this.status = 0;
}

const singUpUser = async (nickname_signup, password_signup, email_signup) => {
  const users = await getUsers();
  users.forEach((user) => {
    if (user.email === email_signup) {
      throw new ExceptionUser("El usuario ya existe");
    }
  });
  await createUser(nickname_signup, password_signup, email_signup);
};

const loginUser = async (email_login, password_login, setCurrentUser) => {
  const user = await getUser(email_login);
  if (user.length === 0) {
    throw new ExceptionUser("Ususario no encontrado");
  } else if (user.password !== password_login) {
    throw new ExceptionUser("Contraseña Incorrecta");
  } else {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
};

const logoutUser = async (setCurrentUser) => {
  setCurrentUser(null);
  localStorage.setItem("currentUser", null);
};

export { singUpUser, loginUser, logoutUser };
