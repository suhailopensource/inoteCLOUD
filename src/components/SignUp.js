import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const { name, email, password } = credentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://mern-stack-api-backend.onrender.com/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success")
        } else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <h2>Sign Up with Inotes and enjoy!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={onChange} required aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" minLength={5} onChange={onChange} required id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" minLength={5} name="cpassword" onChange={onChange} required id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to="/login">Already Have an account?</Link>
        </div>
    )
}

export default SignUp
