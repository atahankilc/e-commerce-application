import {useState} from "react";
import Auth from "../components/Auth";
import ItemList from "../components/ItemList";
import AddItem from "../components/AddItem";
import User from "../components/User";

const Index = () => {

    const [authConfig, setAuthConfig] = useState({isLogin: false, isAdmin: false})
    const [requestItemFlag, setRequestItemFlag] = useState(true)

    return (
        <div>
            <h1 style={{border: "solid", margin: "5px", padding: "5px"}}> Mockify E-Commerce Application </h1>
            <Auth authConfig={authConfig} setAuthConfig={setAuthConfig}/>
            {authConfig.isAdmin && <AddItem setRequestItemFlag={setRequestItemFlag}/>}
            {authConfig.isAdmin && <User setRequestItemFlag={setRequestItemFlag}/>}
            <ItemList authConfig={authConfig} requestItemFlag={requestItemFlag} setRequestItemFlag={setRequestItemFlag}/>
        </div>
    )
}
export default Index;
