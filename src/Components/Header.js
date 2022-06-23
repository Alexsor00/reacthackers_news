import "./Header.css";
import { logoutUser } from "../controllers/user.controller";

export default function Header({ currentUser, setCurrentUser }) {
  const logout = () => {
    logoutUser(setCurrentUser);
  };

  return (
    <table className="footer">
      <tbody>
        <tr>
          <td className="footerText">
            <a href="/">
              <b>Hackers News</b>
            </a>
          </td>
          <td className="footerText">
            <a href="/newest"> new</a> |<a> threads</a> |<a> past </a> |
            <a href="/comments"> comments</a> |<a> ask</a> |<a> show</a> |<a> jobs</a> |
            <a href="/submit"> submit</a> |
          </td>
          <td className="login">
            {currentUser === null ? (
              <a href="/login">login</a>
            ) : (
              <span className="login">
                {" "}
                <a href={`/user/${currentUser.email}`}> {currentUser.nickname}</a>(<span>{currentUser.points}</span>
                ) | <a onClick={logout}>Logout</a>
              </span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
