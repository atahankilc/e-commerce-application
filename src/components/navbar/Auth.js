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

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            {(!authContext.authConfig.isLogin && !authContext.authConfig.isAdmin) && <input ref={usernameRef} placeholder={"username"}/>}
            {(!authContext.authConfig.isLogin && !authContext.authConfig.isAdmin) && <input ref={passwordRef} placeholder={"password"}/>}
            {(!authContext.authConfig.isLogin && !authContext.authConfig.isAdmin) && <button onClick={authLogin}>Login</button>}
            {!!authContext.authConfig.isLogin && <p>Regular User: {authContext.authConfig.username}</p>}
            {!!authContext.authConfig.isAdmin && <p>Admin: {authContext.authConfig.username}</p>}
            {(!!authContext.authConfig.isLogin || !!authContext.authConfig.isAdmin) && <button onClick={authLogout}>Logout</button>}
        </div>
    )
}

export default Auth