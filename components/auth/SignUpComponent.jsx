import { useState } from "react";
import { signup } from "../../actions/auth";
import Wrapper from "../../styles/SignUpComponent.module";
const SignUpComponent = () => {


    const initialState = {
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    }

    const [values, setValues] = useState(initialState);

    const { name, email, password, error, loading, message, showForm } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false })
        const user = { name, email, password };
        signup(user)
            .then(data => {
                console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {
                    setValues({ ...values, name: '', email: '', password: '', error: '', loading: false, message: data.message, showForm: false })
                }
            })

    };

    const showLoading = () => {
        if (loading) {
            return (
                <div className="alert alert-info">Loading...</div>
            );
        }
    }
    const showError = () => {
        if (error) {
            return (
                <div className="alert alert-danger">{error}</div>
            );
        }
    }

    const showMessage = () => {
        if (message) {
            return (
                <div className="alert alert-info">{message}</div>
            );
        }
    }

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const signupForm = () => {
        return (
            <Wrapper>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Type your name" className="form-control mb-4" onChange={handleChange('name')} value={name} />
                        <input type="email" placeholder="Type your email" className="form-control mb-4" onChange={handleChange('email')} value={email} />
                        <input type="password" placeholder="Type your password" className="form-control mb-4" onChange={handleChange('password')} value={password} />
                        <div>
                            <button className="btn btn-primary">Sign Up</button>
                        </div>

                    </div>
                </form>
            </Wrapper>
        )
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </>
    )
}

export default SignUpComponent