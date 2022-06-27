import Header from "../Components/Header";
import "./User.css";
import { useParams } from "react-router-dom";
import { getUser } from "../services/user.service";
import { useEffect, useState } from "react";

export default function User({ currentUser }) {
  const { user_email } = useParams();
  const [seen_user, setSeen_user] = useState(null);

  useEffect(() => {
    const seen_user = async (e) => {
      const user = await getUser(user_email);
      setSeen_user(user);
    };
    seen_user();
  }, []);

  return (
    <>
      {seen_user && (
        <center>
          <Header currentUser={currentUser} />
          <table className="main_user">
            <tbody className="main_user">
              <tr>
                <td style={{ width: "10px" }}>user: </td>
                <td style={{ color: "black" }}>{seen_user.nickname}</td>
              </tr>
              <tr>
                <td>created: </td>
                <td style={{ color: "black" }}>
                  {new Date(seen_user.created_at.seconds * 1000).toGMTString()}
                </td>
              </tr>
              <tr>
                <td>karma: </td>
                <td style={{ color: "black" }}>{seen_user.points}</td>
              </tr>
              <tr>
                <td>about: </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a
                    style={{ color: "black" }}
                    href={`/submited/${user_email}`}
                  >
                    submissions
                  </a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a
                    style={{ color: "black" }}
                    href={`/comments/${user_email}`}
                  >
                    comments
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      )}
    </>
  );
}
