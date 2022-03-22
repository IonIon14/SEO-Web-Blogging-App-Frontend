import { Layout, SignUpComponent } from "../components";
import Link from "next/link";

const SignUp = () => {
    return (
        <Layout>
            <div className="mt-4 mb-4">
                <h2 className="text-center mb-4">SignUp page</h2>
                <div className="">
                    <div className="col-md-6 offset-md-3">
                        <SignUpComponent />
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default SignUp;