import { db } from "../server/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");
/**
 * Gets all the users.
 * @return {[Array]}   [Returns an Array of users]
 */
const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return d;
};

/**
 * Gets an specific user.
 * @param  {[String]} id [The ID of the user to get]
 * @return {[Object]} [Returns an user]
 */
const getUser = async (email) => {
  let dataUser = [];
  const data = await getDocs(usersCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  d.forEach((user) => {
    if (user.email === email) {
      dataUser = user;
    }
  });
  return dataUser;
};

/**
 * Creates the DB entry for an user with the parameter values.
 * @param  {[String]} newNickname [Nickname of the new User]
 * @param  {[String]} newPassword [Password of the new User]
 * @param  {[String]} newEmail [Email of the new User]
 * @return  {[Null - Exception]}    [Returns an Exception if the User exists or null if the User has been created succesfully]
 */
const createUser = async (newNickname, newPassword, newEmail) => {
  try {
    if (newNickname === undefined || newNickname.match(/^ *$/) !== null) {
      alert("Username no introducido");
      return false;
    } else if (
      newPassword === undefined ||
      newPassword.match(/^ *$/) !== null
    ) {
      alert("Password no introducido");
      return false;
    } else if (
      newEmail === undefined ||
      !newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      alert("Email no introducido o incorrecto");
      return false;
    }
    await addDoc(usersCollectionRef, {
      nickname: newNickname,
      password: newPassword,
      email: newEmail,
      points: 0,
      created_at: new Date(),
    });
    return true;
  } catch (error) {}
};

export { getUsers, getUser, createUser };
