import { createUser, getUser, getUsers } from "../services/user.service";

function ExceptionUser(msg) {
  this.body = msg;
  this.nombre = "ExceptionUser";
  this.status = 0;
}


/**
 * Creates the DB entry for an user with the parameter values and login the user created.
 * @param  {[String]} nickname_signup [Nickname of the new User]
 * @param  {[String]} password_signup [Password of the new User]
 * @param  {[String]} email_signup [Email of the new User]
 * @param  {[Function]} setCurrentUser [The function that changes the state of the current User]
* @return  {[Null - Exception]}    [Returns an Exception if the User exists or null if the User has been created succesfully]
 */
const singUpUser = async (
  nickname_signup,
  password_signup,
  email_signup,
  setCurrentUser
) => {
  const users = await getUsers();
  users.forEach((user) => {
    if (user.email === email_signup) {
      throw new ExceptionUser("El usuario ya existe");
    }
  });
  await createUser(nickname_signup, password_signup, email_signup);
  loginUser(email_signup, password_signup, setCurrentUser);
};




/**
 * Loggs the User and it saves it on a LocalStorage variable.
 * @param  {[String]} email_login [Email of the User asking for Logging]
 * @param  {[Number]} password_login [Password of the User asking for Logging]
 * @param  {[Function]} setCurrentUser [The function that changes the state of the current User]
* @return  {[Null - Exception]}    [Returns an Exception --> (1. if the User does not exist 2. the password is Incorrect) or null if the User has been created succesfully]
 */
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
