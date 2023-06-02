import { Alert, Button, Card, FlexLayout } from '@cedcommerce/ounce-ui'
import React, { useEffect } from 'react'
import { ArrowLeft } from "react-feather"
import { useLocation, useNavigate } from 'react-router-dom'
function Confirmation() {
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paramValue = queryParams.get('token');
        fetch(`${process.env.REACT_APP_END_POINT}user/verifyuser?token=${paramValue}`)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log("RES", data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error("ERROR", error);
            });
    }, [])
    return (
        <Card>
            <FlexLayout spacing='loose' direction='vertical'>
                <Alert
                    desciption="Your account is now confirmed"
                    type="success"
                    destroy={false}
                >
                    Account Confirmed
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