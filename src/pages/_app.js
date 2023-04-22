import Layout from "../components/Layout";
import {AuthContextProvider} from "../context/auth-context";
import {ItemContextProvider} from "../context/item-context";
import {PageContextProvider} from "../context/page-context";

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