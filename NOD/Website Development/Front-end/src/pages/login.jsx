// Note: Uncomment import lines during working with JSX Compiler.
import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import firebase from '../config/firebase'
const appStyle = {
    height: "100vh",
    display: "flex",
    backgroundColor: "#0F2147",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px"
};

const formStyle = {
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const labelStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    padding: '15px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    padding: '17px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const Field = React.forwardRef(({ placeholder, type }, ref) => {
    return (
        <div>
            <input ref={ref} type={type} placeholder={placeholder} style={inputStyle} />
        </div>
    );
});

const Form = ({ onSubmit }) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const [error, setError] = React.useState(false)
    const [errors, setErrors] = React.useState(false)

    let history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        if (usernameRef.current.value === '' || passwordRef.current.value === '') {
            setError(true)
        } else {
            setError(false)
        }
        if (usernameRef.current.value && passwordRef.current.value) {
            let email = usernameRef.current.value;
            let password = passwordRef.current.value;


            localStorage.setItem("museremail", "null");
            localStorage.setItem("museruids", "null");
            localStorage.setItem("hasUser", false);


            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((result) => {

                    localStorage.setItem("museremail", result.user.email)
                    localStorage.setItem("museruids", result.user.uid)
                    localStorage.setItem("muserpassword", password)

                    history.push("/dashboard")



                })
                .catch(function (error) {

                    var errorMessage = error.message;
                    setErrors(true)
                });


        }

        onSubmit(data);
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit} style={{ paddingLeft: 'auto !important' }}>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", flexWrap: "wrap" }}>
                <div className="sidebar__logo">
                    <img src={logo} alt="company logo" />
                </div>
                <div style={{
                    backgroundColor: "white",
                    height: "480px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "20px",
                    padding: "20px",
                    width: "350px",
                }}>
                    <h2>Login Now</h2>
                    <br /><br />
                    <Field ref={usernameRef} type="email" placeholder="Enter Email Address" required />
                    <br />

                    <Field ref={passwordRef} type="password" placeholder="Enter Password" required />
                    <br />
                    {error &&
                        <div style={{ fontSize: 15, color: 'red' }}>Please Fill All Data</div>}
                    {errors &&
                        <div style={{ fontSize: 15, color: 'red' }}>Invalid Email Or Password</div>}
                    <div>
                        <br />

                        <button style={submitStyle} type="submit">Login</button>
                        <Link to={"/forgotpassword"} style={{ color: 'blue', fontSize: '12px' }}>Forgot Password</Link>

                    </div>

                </div>
            </div>

        </form>
    );
};

// Usage example:

const Login = () => {
    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };
    return (
        <div className="layout__content-main" style={{ padding: 0 }}>
            <div style={appStyle}>
                <Form onSubmit={handleSubmit} />
            </div>
        </div>

    );
};
export default Login;
