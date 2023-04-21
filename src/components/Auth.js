import {useRef} from "react";

const Auth = ({authConfig, setAuthConfig}) => {

    const usernameRef = useRef()
    const passwordRef = useRef()

    const loginHandler = () => {
        const reqBody = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (!data.isLogin) {
                alert("Login Failed! No Such User Found.")
            } else {
                setAuthConfig({
                    isLogin: data.isLogin,
                    isAdmin: data.isAdmin,
                    username: data.username,
                    userId: data.userId
                })
            }
        })
    }

    const logoutHandler = () => {
        setAuthConfig({isLogin: false, isAdmin: false})
    }

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            {!authConfig.isLogin && <input ref={usernameRef} placeholder={"username"}/>}
            {!authConfig.isLogin && <input ref={passwordRef} placeholder={"password"}/>}
            {!authConfig.isLogin && <button onClick={loginHandler}>Login</button>}
            {!!authConfig.isLogin && !authConfig.isAdmin && <p>Regular User: {authConfig.username}</p>}
            {!!authConfig.isLogin && !!authConfig.isAdmin && <p>Admin: {authConfig.username}</p>}
            {!!authConfig.isLogin && <button onClick={logoutHandler}>Logout</button>}
        </div>
    )
}

export default Auth