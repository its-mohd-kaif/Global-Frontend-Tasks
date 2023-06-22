import { Alert, Button, Card, FlexLayout } from '@cedcommerce/ounce-ui'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "react-feather"
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { userId } from '../../../redux/ReduxSlice'
function Confirmation() {
    const navigate = useNavigate()
    const location = useLocation();
    const [alert, setAlert] = useState<boolean>(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paramValue: any = queryParams.get('token');
        fetch(`${process.env.REACT_APP_END_POINT}user/verifyuser?token=${paramValue}`)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                if (data.success === false) {
                    setAlert(true)
                } else {
                    const userDetails: any = jwtDecode(`${paramValue}`);
                    sessionStorage.setItem(`${userDetails.user_id}_auth_token`, paramValue)
                    dispatch(userId(userDetails.user_id))
                    setAlert(false)
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
            });
    }, [])
    return (
        <Card>
            <FlexLayout spacing='loose' direction='vertical'>
                <Alert
                    desciption={alert === false ? "Your account is now confirmed" : "Your account is not confirmed"}
                    type={alert === false ? "success" : "warning"}
                    destroy={false}
                >
                    {alert === false ? "Account Confirmed" : "Account Not Confirmed"}

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