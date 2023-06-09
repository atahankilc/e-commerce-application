import React, {useMemo, useState} from "react";

const AuthContext = React.createContext({
})

export const AuthContextProvider = ({children}) => {

    const [authConfig, setAuthConfig] = useState({isLogin: false, isAdmin: false})
    const [isLoading, setIsLoading] = useState(false)

    const loginHandler = (username, password) => {
        setIsLoading(true)
        const reqBody = {
            username: username,
            password: password
        }

        fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            if (!data.isLogin && !data.isAdmin) {
                alert("Login Failed! No Such User Found.")
            } else {
                setAuthConfig({
                    isLogin: data.isLogin,
                    isAdmin: data.isAdmin,
                    username: data.username,
                    userId: data.userId
                })
            }
            setIsLoading(false)
        })
    }

    const logoutHandler = () => {
        setAuthConfig({isLogin: false, isAdmin: false})
    }

    const value = useMemo(() => {
        return {authConfig, isLoading, loginHandler, logoutHandler}
    }, [authConfig, isLoading])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext