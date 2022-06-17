import './Header.css'
export default function Header (){


     return(
        <table className="footer">
                       <tbody>
                <tr>
                    <td className="title"><a><b>Hackers News</b></a></td>
                    <td className="footerText">
                        <a> new</a> |
                        <a> threads</a> |
                        <a> past </a> |
                        <a> comments</a> |
                        <a> ask</a> |
                        <a> show</a> |
                        <a> jobs</a> |
                        <a> submit</a> |
                    </td>
                    <td className="login"><a>Login</a></td>

                </tr>
            </tbody>
        </table>
     )
}