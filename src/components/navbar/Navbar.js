import Auth from "./Auth";
import Pages from "./Pages";

const Navbar = () => {

    return (
        <div className={"sticky inset-x-0 top-0 flex flex-row p-3 bg-white shadow-xl items-center z-50"}>
            <h1 className={"mx-3 text-xl font-bold italic"}> Mockify E-Commerce Application </h1>
            <Pages/>
            <Auth/>
        </div>
    )
}

export default Navbar