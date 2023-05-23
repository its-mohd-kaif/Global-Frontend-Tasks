import { Button, Card, CheckBox, FlexChild, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import CustomHelpPoints from '../CustomHelpPoints';

interface registerStateObj {
  eyeoff: boolean;
}
function Register() {
  /**
   * State object for form input details
   */
  const [state, setState] = useState<registerStateObj>({
    eyeoff: false,
  });
  const { eyeoff } = state;
  const navigate = useNavigate()
  return (
    <Card title={"Create an account"}>
      <FlexLayout spacing='loose' direction='vertical'>
        <TextField
          autocomplete="off"
          name="Mobile Number"
          required
          onChange={function noRefCheck() { }}
          placeHolder="Enter Mobile Number"
          type="text"
        />
        <TextField
          autocomplete="off"
          name="Email"
          required
          onChange={function noRefCheck() { }}
          placeHolder="Enter Email Address"
          type="email"
        />
        <FlexChild>
          <FlexLayout spacing='loose' halign='fill'>
            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
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
            </FlexChild>
            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
              <TextField
                autocomplete="off"
                name="Confirm Password"
                required
                onChange={function noRefCheck() { }}
                placeHolder="Enter Password"
                type="password"
              />
            </FlexChild>
          </FlexLayout>
        </FlexChild>
        {/* call a custom help point component */}
        <CustomHelpPoints />
        <FlexLayout spacing="extraTight" halign="start">
          <CheckBox
            id="two"
            labelVal={"Accept Terms and Conditions."}
            name="Name"
            onClick={() => { }}
            checked={true}
          />
          <Button
            halign="Center"
            iconAlign="left"
            length="none"
            onAction={function noRefCheck() { }}
            onClick={() => { }}
            thickness="thin"
            type="TextButton">
            Read Our Policies
          </Button>
        </FlexLayout>
        <hr></hr>
        <Button
          content="Create Account"
          length="fullBtn"
          thickness='large'
          onClick={() => { }}
        />
        <TextStyles>
          <TextLink
            onClick={() => navigate("/auth/login")} label="Login" /> if you already have an account
        </TextStyles>
      </FlexLayout>
    </Card>
  )
}

export default Register