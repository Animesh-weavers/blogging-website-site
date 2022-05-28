import React, { useState, useContext, useRef } from 'react'
import useForm from '../Validation/UseForm';
import validate from '../Validation/FormValidationRules';
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { values, errors, handleChange, handleSubmit } = useForm(
        signup,
        validate
    );
    const [isShowLoader, setIsShowLoader] = useState(false);

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    let emailRef = useRef();
    let passwordRef = useRef();
    let nameRef = useRef();
    let showPassRef = useRef();

    //Password Show Handler
    const passwordShowHandler = () => {
        setPasswordShown(!passwordShown);
    };

    // //Form Submit Handler
    function signup() {

        setIsShowLoader(true);
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
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwyt07hfH9qGwKKA-0Q2VFBlPUNYy07pY",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        axios(reqOptions)
            .then((response) => {
                // console.log(response.data.refreshToken);
                authCtx.login(response.data.idToken);
                setIsShowLoader(false);
                navigate({ pathname: "/" }, { replace: true });
            })
            .catch((error) => {
                setIsShowLoader(false);
                alert(error.response.data.error.message);
                navigate({ pathname: "/login" }, { replace: true });
            });
    }
    // function signup() {

    // }
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
                <div style={{ width: "43%" }}>
                    <h1>Signup</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                name="username"
                                onChange={handleChange}
                                values={values.username || ""}
                                ref={nameRef}

                            />
                        </Form.Group>
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
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={values.password || ""}
                                ref={passwordRef}
                                required
                            />
                            <Form.Check
                                aria-label="option 1"
                                label="Show Password"
                                id="show-pass"
                                style={{ userSelect: "none" }}
                                ref={showPassRef}
                                onClick={passwordShowHandler}
                            />
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
                            Signup
                        </Button>
                        <Link to='/login' style={{ color: 'black' }} >already have an account?</Link>
                    </Form>
                </div>
                <div className="image" style={{ textAlign: "center" }}>
                    <img
                        src="https://img.freepik.com/free-vector/instruction-correct-pose-during-office-work-flat-illustration-cartoon-worker-sitting-desk-with-right-posture-healthy-back-looking-computer_74855-14087.jpg?size=626&ext=jpg&ga=GA1.2.1921613389.1649405774"
                        alt="sigin_image"
                        width="88%"
                    />
                </div>
            </div>
        </div>
    )
}

export default Signup