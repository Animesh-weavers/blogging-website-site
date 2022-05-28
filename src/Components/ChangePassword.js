import React, { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "../Validation/UseForm";
import validate from "../Validation/FormValidationRules"
import axios from "axios";
import AuthContext from "../Auth/auth-context";
import { useNavigate } from "react-router-dom";

const ChangePassword = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { values, errors, handleChange, handleSubmit } = useForm(
        changePassword,
        validate
    );
    const [isShowLoader, setIsShowLoader] = useState(false);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    let passwordRef = useRef();
    let showPassRef = useRef();

    //Password Show Handler
    const passwordShowHandler = () => {
        setPasswordShown(!passwordShown);
    };
    function changePassword() {
        setIsShowLoader(true);
        //call api
        let headersList = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        let bodyContent = {
            idToken: authCtx.token,
            password: values.password,
            returnSecureToken: "true",
        };

        let reqOptions = {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCwyt07hfH9qGwKKA-0Q2VFBlPUNYy07pY",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        axios(reqOptions)
            .then((response) => {
                setIsShowLoader(false);
                alert("Successfully Changed");
                setTimeout(() => {
                    authCtx.logout();
                }, 3000);
            })
            .catch((error) => {
                setIsShowLoader(false);
                alert(error.response.data.error.message);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            });
    }
    return (
        <>
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
                                src="https://img.freepik.com/free-vector/female-cartoon-designer-drawing-canvas-with-huge-pen_74855-19778.jpg?size=626&ext=jpg&ga=GA1.1.1921613389.1649405774"
                                alt="sigin_image"
                                width="100%"
                            />
                        </div>

                        <div style={{ width: "40%" }}>
                            <h1>Change Password</h1>
                            <Form onSubmit={handleSubmit}>
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
                                    Change
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default ChangePassword;