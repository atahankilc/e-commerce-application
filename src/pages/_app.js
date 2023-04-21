import Layout from "../components/Layout";
import {AuthContextProvider} from "../context/auth-context";
import {ItemContextProvider} from "../context/item-context";

export default function MyApp({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <ItemContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ItemContextProvider>
        </AuthContextProvider>
    )
}