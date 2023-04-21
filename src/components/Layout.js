import Navbar from "./navbar/Navbar";
import {useContext, useEffect} from "react";
import PageContext from "../context/page-context";

const Layout = ({children}) => {

    const pageContext = useContext(PageContext)

    useEffect(() => {

    }, [pageContext.reloadFlag])

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default Layout