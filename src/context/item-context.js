import React, {useEffect, useMemo, useState} from "react";

const ItemContext = React.createContext({
})

export const ItemContextProvider = ({children}) => {

    const [array, setArray] = useState([])
    const [filter, setFilter] = useState("All")
    const [reloadFlag, setReloadFlag] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const fetchItemsHandler = () => {
        setIsLoading(true)
        fetch(`/api/item/${filter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            setArray(data.result)
            setIsLoading(false)
        })
    }

    const changeFilter = (filter) => {
        setFilter(filter)
    }

    const requestReload = () => {
        setReloadFlag(prevState => {return !prevState})
    }

    useEffect(() => {
        fetchItemsHandler()
    }, [reloadFlag, filter])

    const value = useMemo(() => {
        return {array, filter, changeFilter, reloadFlag, requestReload, isLoading}
    }, [array, filter, reloadFlag, isLoading])

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
}

export default ItemContext