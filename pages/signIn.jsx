import { Layout, SignInComponent } from "../components";
import Link from "next/link";

const SignIn = () => {

    return (
        <Layout>
            <div className="mt-4 mb-4">
                <h2 className="text-center mb-4">SignIn page</h2>
                <div className="">
                    <div className="col-md-6 offset-md-3">
                        <SignInComponent />
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default SignIn;