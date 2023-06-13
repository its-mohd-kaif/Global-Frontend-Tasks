import { Button, Card, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { callApi } from '../../../core/ApiMethods';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { showToast, userId } from '../../../redux/ReduxSlice';

interface loginStateObj {
    email: string;
    password: string;
    eyeoff: boolean;
    reCAPTCHA: string | null;
    loader: boolean
}
interface loginErrorObj {
    emailError: boolean;
    passwordError: boolean;
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
        loader: false
    });

    /**
     * State object for handling errors
     */
    const [error, setError] = useState<loginErrorObj>({
        emailError: false,
        passwordError: false,
        reCAPTCHAMess: ""
    })
    const { email, password, eyeoff, reCAPTCHA, loader } = state;
    const { emailError, passwordError, reCAPTCHAMess } = error
    const MySiteKey = process.env.REACT_APP_reCAPTCHA_SITE_KEY;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const user_token: any = searchParams.get('user_token');
        console.log("Login Param", user_token);
        if (user_token !== null) {
            const userDetails: any = jwtDecode(`${user_token}`);
            console.log("details", userDetails)
            // Save User Token In Session 
            sessionStorage.setItem(`${userDetails.user_id}_auth_token`, user_token)
            // Save User Id in redux
            dispatch(userId(userDetails.user_id))
            // Save User Id in Session
            sessionStorage.setItem('user_id', userDetails.user_id)
            callApi("POST", "connector/get/all")
                .then((res: any) => {
                    if (res.success === true) {
                        console.log("connector/get/all", res)
                        if (res.data.shopify?.installed.length > 0) {
                            callApi("POST", "tiktokhome/frontend/getStepCompleted")
                                .then((res: any) => {
                                    if (res.success === true) {
                                        console.log("getStepCompleted", res)
                                        setStepCompleted(res.data, userDetails.user_id)
                                    }
                                })
                        }
                    }
                })
        }
    }, [])

    const setStepCompleted = (data: number, user_id: number) => {
        // For Now Pass Static 1
        // But In Real Case Pass data+1
        let payload = {
            step: data + 1
        }
        callApi("POST", "tiktokhome/frontend/stepCompleted", payload)
            .then((res: any) => {
                console.log("stepCompleted", res)
                if (res.success === true) {
                    navigate(`/panel/${user_id}/dashboard`)
                }
            })
    }
    const loginHandler = () => {
        // Check Validation
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
        }
        // else if (reCAPTCHA === null) {
        //     setError({
        //         ...error,
        //         reCAPTCHAMess: "Please Click On ReCAPTCHA"
        //     })
        // } 
        else {
            setState({
                ...state,
                loader: true
            })
            // Make a payload for api
            const payload = {
                email: email,
                password: password
            }
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
                    loading={loader}
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