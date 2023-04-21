import Auth from "./Auth";
import Pages from "./Pages";

const Navbar = () => {

    return (
        <div style={{border: "solid", margin: "5px", padding: "5px"}}>
            <h1 style={{border: "solid", margin: "5px", padding: "5px"}}> Mockify E-Commerce Application </h1>
            <Auth/>
            <Pages/>
        </div>
    )
}

export default Navbar