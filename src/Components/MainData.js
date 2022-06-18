import Entry from './Entry'
import './MainData.css'
export default function MainData ({currentUser}){
   return(

    <table className="mainTable">
       <tbody>
         <Entry />
         <Entry />
         <Entry />
         <Entry />
         <Entry />
         <Entry />

       </tbody>
    </table>
   )

}