import { FlexLayout, LRLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import "./Auth.css"
import Forgot from './forgot/Forgot';
import Confirmation from './layouts/Confirmation';
import Login from './login/Login';
import Register from './register/Register';
function Auth() {
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

export default Auth