import {useContext, useRef} from "react";
import AuthContext from "../../context/auth-context";

const Auth = () => {

    const authContext = useContext(AuthContext)
    const usernameRef = useRef()
    const passwordRef = useRef()

    const authLogin = () => {
        authContext.loginHandler(usernameRef.current.value, passwordRef.current.value)
    }
    const authLogout = () => {
        authContext.logoutHandler()
    }

    if (!!authContext.isLoading) {
        return (
            <div className={"flex flex-row items-center"}>
                <p className={"mx-2 px-2 py-1 text-sm font-semibold"}>Loading...</p>
            </div>
        )
    } else {
        return (
            <div className={"flex flex-row items-center"}>
                {(!authContext.authConfig.isLogin && !authContext.authConfig.isAdmin) &&
                    <input className={"mx-2 px-2 py-1 border border-green-300"} ref={usernameRef}
                           placeholder={"username"}/>}
                {(!authContext.authConfig.isLogin && !authContext.authConfig.isAdmin) &&
                    <input className={"mx-2 px-2 py-1 border border-green-300"} ref={passwordRef}
                           placeholder={"password"}/>}
                {(!authContext.authConfig.isLogin && !authContext.authConfig.isAdmin) &&
                    <button className={"mx-2 px-2 py-1 bg-green-300 hover:bg-green-500 text-white"}
                            onClick={authLogin}>Login</button>}
                {(!!authContext.authConfig.isLogin || !!authContext.authConfig.isAdmin) &&
                    <p className={"mx-2 px-2 py-1 text-sm"}>{authContext.authConfig.username}</p>}
                {(!!authContext.authConfig.isLogin || !!authContext.authConfig.isAdmin) &&
                    <button className={"mx-2 px-2 py-1 bg-red-300 hover:bg-red-500 text-white"}
                            onClick={authLogout}>Logout</button>}
            </div>
        )
    }
}

export default Auth