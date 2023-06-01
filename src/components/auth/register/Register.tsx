import { Button, Card, CheckBox, FlexChild, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { regexValidation } from '../../../Constant';
import { PasswordStrenght } from '../../functions';
import CustomHelpPoints from '../CustomHelpPoints';

interface registerStateObj {
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  check: boolean;
  eyeoff: boolean;
}
interface registerErrorObj {
  mobileError: boolean;
  mobileMess: string;
  emailError: boolean;
  emailMess: string;
  passwordError: boolean;
  confirmPasswordError: boolean;
  confirmPasswordMess: string;
  createBtn: boolean;
}
function Register() {
  /**
   * State object for form input details
   */
  const [state, setState] = useState<registerStateObj>({
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    check: true,
    eyeoff: false,
  });

  const [error, setError] = useState<registerErrorObj>({
    mobileError: false,
    mobileMess: "",
    emailError: false,
    emailMess: "",
    passwordError: false,
    confirmPasswordError: false,
    confirmPasswordMess: "",
    createBtn: true
  })
  const { check, confirmPassword, email, eyeoff, mobile, password } = state;
  const { confirmPasswordError, confirmPasswordMess, createBtn, emailError,
    emailMess, mobileError, mobileMess, passwordError } = error;

  const regexForDigit = /[0-9]/g;

  let { emailFormat
  } = regexValidation;

  const navigate = useNavigate()

  const createAccountHandler = () => {
    // navigate("/onboarding")
  }

  const commonValidation = (
    confirmPasswordProp: string,
    passwordProp: string
  ) => {
    if (passwordProp !== confirmPasswordProp && passwordProp !== "" && confirmPasswordProp !== "") {
      console.log("a")
      setError({
        ...error,
        confirmPasswordError: true,
        createBtn: true,
        confirmPasswordMess: "Passwords do not match!",
      })
    }
    else {
      console.log("b")
      setError({
        mobileError: false,
        mobileMess: "",
        emailError: false,
        emailMess: "",
        passwordError: false,
        confirmPasswordError: false,
        confirmPasswordMess: "",
        createBtn: true
      })
    }
  }

  const checkValidation = (checkProp: boolean, confirmPasswordProp: string,
    emailProp: string, mobileProp: string, passwordProp: string) => {
    let strenght = PasswordStrenght(passwordProp);
    if (strenght === 100) {
      if (mobileProp !== "" && /^\d{10}$/.test(mobileProp) === true && emailProp !== "" && emailFormat.test(emailProp) === true && passwordProp === confirmPasswordProp && confirmPasswordProp !== "" && checkProp === true) {
        setError({
          confirmPasswordError: false,
          confirmPasswordMess: "",
          createBtn: false,
          emailError: false,
          emailMess: "",
          mobileError: false,
          mobileMess: "",
          passwordError: false
        })
      } else {
        commonValidation(confirmPasswordProp,
          passwordProp)
      }
    } else {
      commonValidation(confirmPasswordProp,
        passwordProp)
    }
  }

  return (
    <Card title={"Create an account"}>
      <FlexLayout spacing='loose' direction='vertical'>
        <TextField
          autocomplete="off"
          name="Mobile Number"
          required
          onChange={(e) => {
            setState({
              ...state,
              mobile: e
            })

            if (e === "") {
              setError({
                ...error,
                createBtn: true,
                mobileError: true
              })
            }
            else {
              checkValidation(check, confirmPassword, email, e, password)
            }
          }}
          placeHolder="Enter Mobile Number"
          type="text"
          error={mobileError}
          showHelp={mobileMess}
          value={mobile}
          onblur={() => {
            if (mobile === "") {
              setError({
                ...error,
                mobileError: true,
                createBtn: true
              })
            } else if (/^\d{10}$/.test(mobile) === false) {
              setError({
                ...error,
                mobileError: true,
                mobileMess: "Not a valid Phone Number"
              })
            }
          }}
        />
        <TextField
          autocomplete="off"
          name="Email"
          required
          onChange={(e) => {
            setState({
              ...state,
              email: e
            })
            if (e === "") {
              setError({
                ...error,
                createBtn: true,
                emailError: true
              })
            }
            else {
              checkValidation(check, confirmPassword, e, mobile, password)
            }
          }}
          placeHolder="Enter Email Address"
          type="email"
          error={emailError}
          showHelp={emailMess}
          value={email}
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
                createBtn: true
              })
            }
          }}
        />
        <FlexChild>
          <FlexLayout spacing='loose' halign='fill'>
            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
              <TextField
                autocomplete="off"
                name="Password"
                required
                onChange={(e) => {
                  setState({
                    ...state,
                    password: e
                  })
                  if (e === "") {
                    setError({
                      ...error,
                      passwordError: true,
                      createBtn: true
                    })
                  } else {
                    checkValidation(check, confirmPassword, email, mobile, e)
                  }
                }}
                placeHolder="Enter Password"
                type="password"
                show={eyeoff}
                strength
                error={passwordError}
                value={password}
                onblur={() => {
                  if (password === "") {
                    setError({
                      ...error,
                      passwordError: true
                    })
                  }
                }}
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
                onChange={(e) => {
                  setState({
                    ...state,
                    confirmPassword: e
                  })
                  if (e === "") {
                    setError({
                      ...error,
                      confirmPasswordError: true,
                      createBtn: true
                    })
                  } else {
                    checkValidation(check, e, email, mobile, password)
                  }
                }}
                placeHolder="Enter Password"
                type="password"
                error={confirmPasswordError}
                showHelp={confirmPasswordMess}
                value={confirmPassword}
                onblur={() => {
                  if (confirmPassword === "") {
                    setError({
                      ...error,
                      confirmPasswordError: true
                    })
                  }
                }}
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
            onClick={() => {
              setState({
                ...state,
                check: !check
              })
              checkValidation(!check, confirmPassword, email, mobile, password)
            }}
            checked={check}
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
          disable={createBtn}
          onClick={createAccountHandler}
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