import { FlexLayout, Loader, LRLayout, TextStyles } from '@cedcommerce/ounce-ui'
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import "./Auth.css"
import Forgot from './forgot/Forgot';
import ResetPassword from './forgot/ResetPassword';
import Confirmation from './layouts/Confirmation';
import ResetMail from './layouts/ResetMail';
import Login from './login/Login';
import Register from './register/Register';
function Auth() {
    const location = useLocation();
    const [myToken, setMyToken] = useState<any>(null)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const user_token: any = searchParams.get('user_token');
        setMyToken(user_token)
        if (user_token !== null) {
            const userDetails: any = jwtDecode(`${user_token}`);
            console.log("details", userDetails)
        }
    }, [])
    if (myToken === null) {
        return (
            <>
                <div className="init-LoginPage__Wrapper">
                    <div className="init-LoginPage">
                        <div className="inte-auth-custom">
                            <LRLayout
                                title={
                                    <div className="auth_page_title">
                                        <TextStyles
                                            alignment="left"
                                            fontweight="extraBold"
                                            headingTypes="LG-2.8"
                                            paragraphTypes="MD-1.4"
                                            textcolor="light"
                                            type="Heading"
                                            utility="none">
                                            Michael Inventory
                                        </TextStyles>
                                        <TextStyles
                                            alignment="left"
                                            fontweight="extraBold"
                                            headingTypes="LG-2.8"
                                            paragraphTypes="MD-1.4"
                                            textcolor="light"
                                            type="Heading"
                                            utility="none">
                                            Integration by
                                        </TextStyles>
                                        <TextStyles
                                            alignment="left"
                                            fontweight="extraBold"
                                            headingTypes="LG-2.8"
                                            paragraphTypes="MD-1.4"
                                            textcolor="light"
                                            type="Heading"
                                            utility="none">
                                            CedCommerce
                                        </TextStyles>
                                    </div>
                                }
                                lrHelpText={
                                    <>
                                        <FlexLayout
                                            direction="vertical"
                                            spacing="extraLoose">
                                            <TextStyles
                                                alignment="left"
                                                fontweight="normal"
                                                headingTypes="MD-2.7"
                                                lineHeight="LH-2.8"
                                                subheadingTypes="SM-1.8"
                                                textcolor="light"
                                                type="SubHeading"
                                                utility="none">
                                                Automate Inventory & Order syncing across multiple selling platforms.
                                            </TextStyles>
                                        </FlexLayout>
                                    </>
                                }>
                                <Routes>
                                    <Route path='login' element={<Login />} />
                                    <Route path="register" element={<Register />} />
                                    <Route path="forgot" element={<Forgot />} />
                                    <Route path='confirmation' element={<Confirmation />} />
                                    <Route path='resetMail' element={<ResetMail />} />
                                    <Route path='resetPassword' element={<ResetPassword />} />
                                    <Route path="*" element={<Navigate to={'/auth/login'} />} />
                                </Routes>
                            </LRLayout>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Loader type='Loader1' />
            </>
        )
    }
}

export default Auth