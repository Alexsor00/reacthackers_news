import { useEffect, useState } from 'react'
import { getUser } from '../services/user.service';
import './Comment.css'


export default function Comment ( {comment}){
   
      const [userComment, setUserComment] = useState(null)



    useEffect(() => {
        
        const getUserDB = async () => {
          const user = await getUser(comment.user_id);
          setUserComment(user);
        };
    
        getUserDB();
      }, []);

      console.log(userComment)

  return (
    <>
        {userComment &&   <table className="comment">
        <tbody>
            <tr>
                <td></td>
                <td valign="top" className="votelinks">
      <center><a id="up_31821904" href="vote?id=31821904&amp;how=up&amp;goto=item%3Fid%3D31821269"><div className="votearrow" title="upvote"></div></a></center>    </td>            </tr>
         <td>
            <div>
                <span>
                    <a href={`user/${userComment.email}`}>{userComment.nickname} </a>
                    <span>
                      40 min ago
                    </span>
                </span>
            
            </div>
            <div> 
                <span>{comment.text}</span>
               <div><p>...</p></div>
            </div>
         </td>
        </tbody>
    </table>}

    </>
  
  )

}