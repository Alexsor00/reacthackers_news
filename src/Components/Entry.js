import { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import "./Entry.css";
export default function Entry() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    
    const getDBUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    }
    getDBUsers();
  }, [])  

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
          <a>
            Ten years after the Higgs, physicists face the nightmare of finding
            nothing else
          </a>{" "}
          <span style={{ fontSize: "10.33px", color: "#828282" }}>
            (science.org)
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={2}></td>
        <td className="subtext">
          <span>64 points</span> by
       {/*<a> {users[0].nickname =! null && users[0].nickname}</a>*/}   
          <a> 10 minutes ago</a> | hide |<a> 171 Comments</a>
        </td>
      </tr>
    </>
  );
}