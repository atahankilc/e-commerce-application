import {useContext} from "react";
import Link from "next/link";
import AuthContext from "../../context/auth-context";

const Pages = () => {

    const authContext = useContext(AuthContext)

    return (
        <div className={"flex flex-row mx-3 grow"}>
            <p className={"mx-3 hover:text-blue-500"}><Link href={"/"}> HomePage </Link></p>
            {!!authContext.authConfig.isLogin && <p className={"mx-3 hover:text-blue-500"}><Link href={"/UserPage"}> User Page </Link></p>}
            {!!authContext.authConfig.isAdmin && <p className={"mx-3 hover:text-blue-500"}><Link href={"/AdminPage"}> Admin Page </Link></p>}
        </div>
    )
}

export default Pages