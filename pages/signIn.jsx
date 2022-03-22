import Layout from "../components/Layout";
import Link from "next/link";

const SignIn = () => {
    return (
        <Layout>
            <h2>SignIn component</h2>
            <Link href="/"><a>Home</a></Link>
        </Layout>
    )
}

export default SignIn;