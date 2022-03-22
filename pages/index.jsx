import { Layout } from "../components";
import Link from "next/link";

const Index = () => {
    return (
        <Layout>
            <h2>Index component</h2>
            <Link href="/signUp"><a>Sign Up</a></Link>
            <Link href="/signIn"><a>Sign In</a></Link>

        </Layout>
    )
}

export default Index;