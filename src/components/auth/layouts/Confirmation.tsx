import { Alert, Button, Card, FlexLayout } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "react-feather"
import { useLocation, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
function Confirmation() {
    const navigate = useNavigate()
    const location = useLocation();
    const [alert, setAlert] = useState<boolean>(false)
    const isJWTToken = (token: any) => {
        console.log("MY TOKEN",token)
        const parts = token.split('.');
        if (parts.length !== 3) {
            return false;
        }

        try {
            const payload = JSON.parse(atob(parts[1]));
            return payload && typeof payload === 'object';
        } catch (error) {
            return false;
        }
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paramValue = queryParams.get('token');
        const isValidToken = isJWTToken(paramValue);
        if (isValidToken) {
            console.log("Valid JWT token");
            fetch(`${process.env.REACT_APP_END_POINT}user/verifyuser?token=${paramValue}`)
                .then((response) => response.json())
                .then((data) => {
                    // Handle the response data
                })
                .catch((error) => {
                    // Handle any errors that occurred during the request
                });
        } else {
            console.log("Not a valid JWT token");
            setAlert(true)
        }

    }, [])
    return (
        <Card>
            <FlexLayout spacing='loose' direction='vertical'>
                <Alert
                    desciption={alert === false ? "Your account is now confirmed" : "Your account is not confirmed"}
                    type={alert === false ? "success" : "warning"}
                    destroy={false}
                >
                    {alert === false ? "Account Confirmed" : "AccountNot Confirmed"}

                </Alert>
                <Button onClick={() => {
                    navigate("/auth/login")
                }} icon={<ArrowLeft size={20} />} type='Plain'>
                    Back to Login
                </Button>
            </FlexLayout>
        </Card>
    )
}

export default Confirmation