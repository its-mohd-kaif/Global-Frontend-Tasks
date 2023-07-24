import { Button, Card, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { callApi } from '../../../core/ApiMethods';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { showToast, userId } from '../../../redux/ReduxSlice';
import { regexValidation } from '../../../Constant';

interface loginStateObj {
    email: string;
    password: string;
    eyeoff: boolean;
    reCAPTCHA: string | null;
    btnDisabled: boolean
    loader: boolean
}
interface loginErrorObj {
    emailError: boolean;
    emailErrorMessage: string;
    passwordError: boolean;
    passwordErrorMessage: string;
    reCAPTCHAMess: string;
}


function Login() {
    /**
  * State object for form input details
  */
    const [state, setState] = useState<loginStateObj>({
        email: "",
        password: "",
        eyeoff: false,
        reCAPTCHA: null,
        btnDisabled: true,
        loader: false
    });

    /**
     * State object for handling errors
     */
    const [error, setError] = useState<loginErrorObj>({
        emailError: false,
        emailErrorMessage: "",
        passwordError: false,
        passwordErrorMessage: "",
        reCAPTCHAMess: ""
    })
    const { email, password, eyeoff, reCAPTCHA, loader, btnDisabled } = state;
    const { emailError, emailErrorMessage, passwordError, passwordErrorMessage, reCAPTCHAMess } = error
    const MySiteKey = process.env.REACT_APP_reCAPTCHA_SITE_KEY;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    let { emailFormat
    } = regexValidation;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const user_token: any = searchParams.get('user_token');
        if (user_token !== null) {
            const userDetails: any = jwtDecode(`${user_token}`);
            // Save User Token In Session 
            sessionStorage.setItem(`${userDetails.user_id}_auth_token`, user_token)
            // Save User Id in redux
            dispatch(userId(userDetails.user_id))
            // Save User Id in Session
            sessionStorage.setItem('user_id', userDetails.user_id)
            callApi("POST", "connector/get/all")
                .then((res: any) => {
                    if (res.success === true) {
                        if (res.data.shopify?.installed.length > 0) {
                            callApi("POST", "tiktokhome/frontend/getStepCompleted")
                                .then((res: any) => {
                                    if (res.success === true) {
                                        setStepCompleted(res.data, userDetails.user_id)
                                    }
                                })
                        }
                    }
                })
        }
    }, [])

    const setStepCompleted = (data: number, user_id: number) => {
        let payload = {
            step: data + 1
        }
        callApi("POST", "tiktokhome/frontend/stepCompleted", payload)
            .then((res: any) => {
                if (res.success === true) {
                    navigate(`/panel/${user_id}/dashboard`)
                }
            })
    }
    const loginHandler = () => {
        setState({
            ...state,
            loader: true
        })
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        const payload = emailFormat.test(trimmedEmail)
            ? { email: trimmedEmail, password: trimmedPassword }
            : { username: trimmedEmail, password: trimmedPassword };

        callApi("POST", "user/login", payload)
            .then((res: any) => {
                setState({
                    ...state,
                    loader: false
                })
                if (res.success === true) {
                    dispatch(showToast({
                        type: "success",
                        message: res.message
                    }))
                    const userDetails: any = jwtDecode(`${res.data.token}`);
                    // Save User Token In Session 
                    sessionStorage.setItem(`${userDetails.user_id}_auth_token`, res.data.token)
                    // Save User Id in redux
                    dispatch(userId(userDetails.user_id))
                    // Save User Id in Session
                    sessionStorage.setItem('user_id', userDetails.user_id)
                    // For Now Redirect To Onboarding Page
                    navigate(`/panel/${userDetails.user_id}/dashboard`)
                } else if (res.success === false) {
                    dispatch(showToast({
                        type: "error",
                        message: res.message
                    }))
                }
            })
        // }
    }

    useEffect(() => {
        btnDisableHandler()
    }, [email, password, reCAPTCHA, btnDisabled])

    const btnDisableHandler = () => {
        if (email !== "" && password !== "" && reCAPTCHA !== "") {
            setState({
                ...state,
                btnDisabled: false
            })
        } else {
             setState({
                ...state,
                btnDisabled: true
            })
        }
    }
    return (
        <Card title={"Log In to your account"}>
            <FlexLayout spacing='loose' direction='vertical'>
                <TextField
                    autocomplete="off"
                    name="Email or Username"
                    required
                    onChange={(e) => {
                        setState({
                            ...state,
                            email: e
                        })
                        setError({
                            ...error,
                            emailError: false,
                            emailErrorMessage: ""
                        })
                    }}
                    placeHolder="Enter Email or Username"
                    type="text"
                    value={email}
                    error={emailError}
                    showHelp={emailErrorMessage}
                    onblur={() => {
                        if (email === "") {
                            setError({
                                ...error,
                                emailError: true,
                                emailErrorMessage: "This field cannot be blank. Please enter a valid email address or username."
                            })
                        }
                    }}
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
                                passwordError: false,
                                passwordErrorMessage: ""
                            })
                        }}
                        placeHolder="Enter Password"
                        type="password"
                        show={eyeoff}
                        value={password}
                        error={passwordError}
                        showHelp={passwordErrorMessage}
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
                        onblur={() => {
                            if (password === "") {
                                setError({
                                    ...error,
                                    passwordError: true,
                                    passwordErrorMessage: "Password feild cannot be blank"
                                })
                            }
                        }}
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
                    loading={loader}
                    disable={btnDisabled}
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