import { Alert, Button, Card, FormElement, List, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useLocation } from 'react-router-dom';
import { PasswordStrenght } from '../../functions';
import CustomHelpPoints from '../CustomHelpPoints';
import jwt_decode from "jwt-decode";

interface stateObj {
    newPassword: string;
    confirmPassword: string;
    eyeoff: boolean;
    loading: boolean;
}
interface errorMessObj {
    newPassError: boolean;
    conPassError: boolean;
    message: string;
    saveBtn: boolean;
}
function ResetPassword() {
    /**
     * make a state object for input fields and loader
     */
    const [state, setState] = useState<stateObj>({
        newPassword: '',
        confirmPassword: '',
        eyeoff: false,
        loading: false
    });
    /**
     * make a object state for storing token data
     */
    const [token, setToken] = useState<any>({
        base64: "",
        jwtToken: {
            email: ""
        }
    })
    const location = useLocation();

    // Accessing query parameters
    const queryParams = new URLSearchParams(location.search);

    /**
     * make a state for show or hide alert box
     */
    const [alert, setAlert] = useState<boolean>(true)
    /**
     * make a state object for error messages
     */
    const [errorMess, setErrorMess] = useState<errorMessObj>({
        newPassError: false,
        conPassError: false,
        message: "",
        saveBtn: true
    })
    /**
     * when page load we fetch url path
     * and decode our jwt token
     * and through jwt token we get user information
     */
    useEffect(() => {
        const base64: any = queryParams.get('token');
        const jwt = atob(base64)
        console.log("Token", atob(base64))
        const decoded: any = jwt_decode(jwt);
        console.log("JWT", decoded)
        setToken({
            base64: base64,
            jwtToken: {
                email: decoded.email
            }
        })
    }, [])
    /**
     * destructure all values 
     */
    const { base64, jwtToken: {
        email
    } } = token
    const { newPassword, loading, confirmPassword, eyeoff } = state;
    const { newPassError, conPassError, message, saveBtn } = errorMess;
    /**
     * in this function
     * we make a post request 
     * after sucessfull response we navigate to password crete alert page 
     */
    const saveBtnHandler = () => {

    }
    return (
        <Card title={"Reset Password"}>
            <FormElement>
                {alert === true ? <Alert
                    desciption={`You are resetting password for ${email}`}
                    destroy
                    onClose={() => setAlert(false)}
                    type="info"
                >
                    You're all set!
                </Alert> : null}

                <TextField
                    name={'New Password'}
                    required={true}
                    error={newPassError}
                    placeHolder={'Enter New Password'}
                    value={newPassword}
                    onChange={(e) => {
                        let strenght = PasswordStrenght(e);
                        /**
                         * store a value into state
                         */
                        setState({
                            ...state,
                            newPassword: e
                        })
                        /**
                         * password validation check
                         */
                        if (strenght === 100 && confirmPassword === e) {
                            setErrorMess({
                                ...errorMess,
                                newPassError: false,
                                conPassError: false,
                                saveBtn: false,
                                message: ""
                            })
                        } else if (confirmPassword !== "") {
                            if (confirmPassword !== e) {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: false,
                                    conPassError: true,
                                    saveBtn: true,
                                    message: "Passwords do not match!"
                                })
                            }
                        } else {
                            setErrorMess({
                                ...errorMess,
                                newPassError: false
                            })
                        }
                    }}
                    onblur={() => {
                        if (newPassword === "") {
                            setErrorMess({
                                ...errorMess,
                                newPassError: true
                            })
                        }
                    }}
                    strength={true}
                    show={eyeoff}
                    type="password"
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
                <CustomHelpPoints />
                <TextField
                    error={conPassError}
                    showHelp={message}
                    name={'Confirm Password'}
                    required={true}
                    placeHolder="Re-enter New Password"
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => {
                        /**
                         * store a value into state
                         */
                        setState({
                            ...state,
                            confirmPassword: e
                        })
                        /**
                         * match password validation
                         */
                        if (newPassword !== e) {
                            setErrorMess({
                                ...errorMess,
                                conPassError: true,
                                saveBtn: true,
                                message: "Passwords do not match!"
                            })
                        } else {
                            setErrorMess({
                                ...errorMess,
                                conPassError: false,
                                saveBtn: false,
                                message: ""
                            })
                        }
                    }}
                />
                <hr></hr>
                <Button
                    content="Save"
                    length="fullBtn"
                    thickness='large'
                    disable={saveBtn}
                    onClick={saveBtnHandler}
                    loading={loading}
                />
            </FormElement>
        </Card>
    )
}

export default ResetPassword