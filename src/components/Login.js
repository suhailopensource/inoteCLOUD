import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = (props) => {
    let host = process.env.REACT_URI_FRONTEND;
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://mern-stack-api-backend.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successfully", "success")
            navigate("/");
        } else {
            props.showAlert("Invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-3 position-absolute top-50 start-50 translate-middle'>
            <h2>Login to Continue to Inotes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="ms-2" to="/signup">Don't Have an account?</Link>
            </form>
        </div>
    )
}

export default Login
