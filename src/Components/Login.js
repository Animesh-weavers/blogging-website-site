import React, { useState, useRef, useContext } from 'react'
import useForm from '../Validation/UseForm';
import validate from '../Validation/FormValidationRules';
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { values, errors, handleChange, handleSubmit } = useForm(
        signin,
        validate
    );
    const [isShowLoader, setIsShowLoader] = useState(false);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    let emailRef = useRef();
    let passwordRef = useRef();
    let showPassRef = useRef();

    //Password Show Handler
    const passwordShowHandler = () => {
        setPasswordShown(!passwordShown);
    };
    // //Form Submit Handler
    function signin() {
        setIsShowLoader(true);
        //reset input fields
        emailRef.current.value = "";
        passwordRef.current.value = "";
        showPassRef.current.value = "";

        //call api
        let headersList = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        let bodyContent = {
            email: values.email,
            password: values.password,
            returnSecureToken: "true",
        };

        let reqOptions = {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwyt07hfH9qGwKKA-0Q2VFBlPUNYy07pY",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        axios(reqOptions)
            .then((response) => {
                setIsShowLoader(false);
                authCtx.login(response.data.idToken);
                navigate({ pathname: "/" }, { replace: true });
            })
            .catch((error) => {
                setIsShowLoader(false);
                alert(error.response.data.error.message);
                navigate({ pathname: "/login" }, { replace: true });
            });
    }
    return (
        <div
            style={{
                width: "100%",
                height: "90vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="container"
                style={{
                    width: "100%",
                    height: "90vh",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="image">
                    <img
                        src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?size=626&ext=jpg&ga=GA1.2.1921613389.1649405774"
                        alt="sigin_image"
                        width="80%"
                    />
                </div>
                <div style={{ width: "40%" }}>
                    <h1>Signin</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleChange}
                                value={values.email || ""}
                                ref={emailRef}
                                required
                            />
                            {/* {errors.email && <p style={{ color: "red" }}>{errors.email}</p>} */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                ref={passwordRef}
                                required
                                onChange={handleChange}
                                name="password"
                                value={values.password || ""}
                            />
                            {/* {errors.password && <p style={{ color: "red" }}>{errors.password}</p>} */}
                            <Form.Check
                                aria-label="option 1"
                                label="Show Password"
                                id="show-pass"
                                style={{ userSelect: "none" }}
                                ref={showPassRef}
                                onClick={passwordShowHandler}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Link
                                to="/forgetpassword"
                                className="mb-3"
                                style={{
                                    color: "black",
                                    float: "right",
                                    textDecoration: "none",
                                }}
                            >
                                Forget Password?
                            </Link>
                        </Form.Group>
                        <Button
                            id="btn-form-submit"
                            type="submit"
                            style={{
                                backgroundColor: "#29A080",
                                border: "none",
                                width: "100%",
                            }}
                        >
                            Signin
                        </Button>
                        <Form.Group style={{ textAlign: "center" }}>
                            <Link to="/signup" style={{ color: "black" }}>
                                Do not have an account?
                            </Link>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login