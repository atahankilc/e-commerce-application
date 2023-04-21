import {useContext} from "react";
import Link from "next/link";
import AuthContext from "../../context/auth-context";

const Pages = () => {

    const authContext = useContext(AuthContext)

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <p><Link href={"/"}> HomePage </Link></p>
            {!!authContext.authConfig.isLogin && <p><Link href={"/UserPage"}> User Page </Link></p>}
            {!!authContext.authConfig.isAdmin && <p><Link href={"/AdminPage"}> Admin Page </Link></p>}
        </div>
    )
}

export default Pages