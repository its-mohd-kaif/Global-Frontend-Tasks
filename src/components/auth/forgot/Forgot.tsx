import React from 'react'
import { Button, Card, FlexLayout, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import { ArrowLeft } from "react-feather"
import { useNavigate } from 'react-router-dom'
function Forgot() {
    const navigate = useNavigate()
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
                    onChange={function noRefCheck() { }}
                    placeHolder="Enter Email Address"
                    type="email"
                />
                <hr></hr>
                <Button
                    content="Send reset link"
                    length="fullBtn"
                    thickness='large'
                    onClick={() => { }}
                />
            </FlexLayout>
        </Card>
    )
}

export default Forgot