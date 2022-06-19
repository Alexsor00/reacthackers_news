import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Entry.css";
export default function Entry({title, url, points, autor, created_at}){
  

    const[user, setUser] = useState(null)

    useEffect(() => {
     const getUserDB = async () => {
        const user = await getUser(autor)
        setUser(user);
      }
   
      getUserDB();
    },[]);
     
  return (
    <>
      <tr>
        <td align="right" valign="top" className="title">
          <span>1</span>
        </td>
        <td valign="top" className="votelinks">
          <center>
            <a
              id="up_31751242"
              href="vote?id=31751242&amp;how=up&amp;goto=news"
            >
              <div className="arrow" title="upvote"></div>
            </a>
          </center>
        </td>
        <td className="title">
          <a href={url}>
            {title}
          </a>{" "}
          <span style={{ fontSize: "10.33px", color: "#828282" }}>
            ({url})
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={2}></td>
        <td className="subtext">
          <span>{points} points</span> by
       {user !== null && <a href={`user/${user.email}`}> {user.nickname}</a>}   
          <a> {created_at}</a> | hide |<a> 171 Comments</a>
        </td>
      </tr>
    </>
  );
}