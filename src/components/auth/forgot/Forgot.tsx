import React, { useState } from 'react'
import { Button, Card, FlexLayout, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import { ArrowLeft } from "react-feather"
import { useNavigate } from 'react-router-dom'
import { regexValidation } from '../../../Constant';
import { callApi } from '../../../core/ApiMethods';
interface forgotObj {
    emailError: boolean;
    emailMess: string;
    sendBtn: boolean;
    loader: boolean;
}
function Forgot() {
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<forgotObj>({
        emailError: false,
        emailMess: "",
        sendBtn: true,
        loader: false,
    })
    let { emailFormat
    } = regexValidation;
    const { emailError, emailMess, sendBtn, loader } = error
    const navigate = useNavigate()
    const checkValidation = (emailProp: string) => {
        if (emailProp !== "" &&
            emailFormat.test(emailProp) === true) {
            setError({
                ...error,
                emailError: false,
                emailMess: "",
                sendBtn: false
            })
        } else {
            setError({
                ...error,
                emailError: false,
                emailMess: "",
                sendBtn: true
            })

        }
    }
    const sendResetButtonHandler = () => {
        setError({
            ...error,
            loader: true
        })
        const payload = {
            "reset-link": `${window.location.origin}/auth/resetPassword`,
            email: email,
        }
        callApi("POST", "user/forgot", payload)
            .then((data: any) => {
                setError({
                    ...error,
                    loader: false
                })
                // Handle the response data
                if (data.success === true) {
                    navigate("/auth/resetMail")
                }
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    }
    return (
        <Card>
            <FlexLayout spacing='mediumTight' direction='vertical'>
                <FlexLayout spacing='tight' valign='center'>
                    <Button onClick={() => navigate(-1)} customClass='arrowLeftBtn' type='Outlined'>
                        <ArrowLeft size={17} />
                    </Button>
                    <TextStyles subheadingTypes='XS-1.6' fontweight='extraBolder'>
                        Enter your Email ID to receive a password reset link
                    </TextStyles>
                </FlexLayout>
                <TextField
                    autocomplete="off"
                    required
                    onChange={(e) => {
                        setEmail(e)
                        if (e === "") {
                            setError({
                                ...error,
                                sendBtn: true,
                                emailError: true
                            })
                        } else {
                            checkValidation(e)
                        }
                    }}
                    placeHolder="Enter Email Address"
                    type="email"
                    value={email}
                    error={emailError}
                    showHelp={emailMess}
                    onblur={() => {
                        if (email === "") {
                            setError({
                                ...error,
                                emailError: true
                            })
                        }
                        else if (emailFormat.test(email) === false) {
                            setError({
                                ...error,
                                emailError: true,
                                emailMess: "Please enter a valid email",
                                sendBtn: true
                            })
                        }
                    }}
                />
                <hr></hr>
                <Button
                    content="Send reset link"
                    length="fullBtn"
                    thickness='large'
                    loading={loader}
                    disable={sendBtn}
                    onClick={sendResetButtonHandler}
                />
            </FlexLayout>
        </Card>
    )
}

export default Forgot