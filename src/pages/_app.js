import Layout from "../components/Layout";
import {AuthContextProvider} from "../context/auth-context";
import {ItemContextProvider} from "../context/item-context";
import {PageContextProvider} from "../context/page-context";
import "../style/global.css"

export default function MyApp({Component, pageProps}) {
    return (
        <PageContextProvider>
            <AuthContextProvider>
                <ItemContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ItemContextProvider>
            </AuthContextProvider>
        </PageContextProvider>
    )
}