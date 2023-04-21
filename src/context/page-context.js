import React, {useMemo, useState} from "react";

const PageContext = React.createContext({
})

export const PageContextProvider = ({children}) => {

    const [reloadFlag, setReloadFlag] = useState(true)

    const requestReload = () => {
        setReloadFlag(prevState => {return !prevState})
    }

    const value = useMemo(() => {
        return {reloadFlag, requestReload}
    }, [reloadFlag])

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export default PageContext