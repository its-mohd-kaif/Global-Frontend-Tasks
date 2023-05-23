import { Button, Card, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useNavigate } from 'react-router-dom';
interface loginStateObj {
    eyeoff: boolean;
}
function Login() {
    /**
  * State object for form input details
  */
    const [state, setState] = useState<loginStateObj>({
        eyeoff: false,
    });
    const { eyeoff } = state;

    const navigate = useNavigate()
    return (
        <Card title={"Log In to your account"}>
            <FlexLayout spacing='loose' direction='vertical'>
                <TextField
                    autocomplete="off"
                    name="Email"
                    required
                    onChange={function noRefCheck() { }}
                    placeHolder="Enter Email Address or Mobile Numberumber"
                    type="text"
                />
                <FlexLayout spacing='tight' direction='vertical'>
                    <TextField
                        autocomplete="off"
                        name="Password"
                        required
                        onChange={function noRefCheck() { }}
                        placeHolder="Enter Password"
                        type="password"
                        show={eyeoff}
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
                </FlexLayout>
                <hr></hr>
                <Button
                    content="Login"
                    length="fullBtn"
                    thickness='large'
                    onClick={() => { }}
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