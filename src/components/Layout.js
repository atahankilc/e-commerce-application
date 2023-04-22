import Navbar from "./navbar/Navbar";

const Layout = ({children}) => {

    return (
        <div className={"relative m-0 p-0"}>
            <Navbar/>
            <div className={"p-2"}>
                {children}
            </div>
        </div>
    )
}

export default Layout