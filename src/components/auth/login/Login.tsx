import { Button, Card, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { callApi } from '../../../core/ApiMethods';
interface loginStateObj {
    email: string;
    password: string;
    eyeoff: boolean;
    reCAPTCHA: string | null;
}
interface loginErrorObj {
    emailError: boolean;
    passwordError: boolean;
    reCAPTCHAMess: string;
}


function Login() {
    // console.log("PROPS", _props)
    /**
  * State object for form input details
  */
    const [state, setState] = useState<loginStateObj>({
        email: "",
        password: "",
        eyeoff: false,
        reCAPTCHA: null,
    });

    const [error, setError] = useState<loginErrorObj>({
        emailError: false,
        passwordError: false,
        reCAPTCHAMess: ""
    })
    const { email, password, eyeoff, reCAPTCHA } = state;
    const { emailError, passwordError, reCAPTCHAMess } = error
    const MySiteKey = process.env.REACT_APP_reCAPTCHA_SITE_KEY
    const navigate = useNavigate()

    const loginHandler = () => {
        if (email === "" && password === "") {
            setError({
                emailError: true,
                passwordError: true,
                reCAPTCHAMess: "Please Click On ReCAPTCHA"
            })
        } else if (email === "") {
            setError({
                ...error,
                emailError: true
            })
        } else if (password === "") {
            setError({
                ...error,
                passwordError: true
            })
        } else if (reCAPTCHA === null) {
            setError({
                ...error,
                reCAPTCHAMess: "Please Click On ReCAPTCHA"
            })
        } else {
            const payload = {
                email: email,
                password: password
            }
            callApi("POST","user/login", payload)
                .then((res) => console.log("RES", res))
        }
    }

    return (
        <Card title={"Log In to your account"}>
            <FlexLayout spacing='loose' direction='vertical'>
                <TextField
                    autocomplete="off"
                    name="Email"
                    required
                    onChange={(e) => {
                        setState({
                            ...state,
                            email: e
                        })
                        setError({
                            ...error,
                            emailError: false
                        })
                    }}
                    placeHolder="Enter Email Address or Mobile Number"
                    type="text"
                    value={email}
                    error={emailError}
                />
                <FlexLayout spacing='tight' direction='vertical'>
                    <TextField
                        autocomplete="off"
                        name="Password"
                        required
                        onChange={(e) => {
                            setState({
                                ...state,
                                password: e
                            })
                            setError({
                                ...error,
                                passwordError: false
                            })
                        }}
                        placeHolder="Enter Password"
                        type="password"
                        show={eyeoff}
                        value={password}
                        error={passwordError}
                        innerSufIcon={
                            eyeoff ? (
                                <Eye
                                    color="#3B424F"
                                    size={20}
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            eyeoff: !eyeoff,
                                        })
                                    }
                                />
                            ) : (
                                <EyeOff
                                    color="#3B424F"
                                    size={20}
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            eyeoff: !eyeoff,
                                        })
                                    }
                                />
                            )
                        }
                    />
                    <FlexLayout halign="end">
                        <Button
                            type="TextButton"
                            thickness="thin"
                            onClick={() => { navigate("/auth/forgot") }}>
                            Forgot Password?
                        </Button>
                    </FlexLayout>
                    <ReCAPTCHA
                        sitekey={`${MySiteKey}`}
                        onChange={(e) => setState({
                            ...state,
                            reCAPTCHA: e
                        })}
                    />
                    {reCAPTCHA === null ?
                        <TextStyles textcolor='negative' content={reCAPTCHAMess} />
                        : null}
                </FlexLayout>
                <hr></hr>
                <Button
                    content="Login"
                    length="fullBtn"
                    thickness='large'
                    onClick={loginHandler}
                />
                <TextStyles>
                    New to CedCommerce? {" "}
                    <TextLink
                        onClick={() => { navigate("/auth/register") }}
                        label="Create Account" />
                </TextStyles>
            </FlexLayout>
        </Card>
    )
}

export default Login