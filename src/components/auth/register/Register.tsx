import { Button, Card, CheckBox, FlexChild, FlexLayout, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regexValidation } from '../../../Constant';
import { callApi } from '../../../core/ApiMethods';
import { showToast } from '../../../redux/ReduxSlice';
import { PasswordStrenght } from '../../functions';
import CustomHelpPoints from '../CustomHelpPoints';

interface registerStateObj {
  first_name: string;
  last_name: string;
  username: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  check: boolean;
  eyeoff: boolean;
  btnLoader: boolean;
}
interface registerErrorObj {
  firstNameError: boolean;
  lastNameError: boolean;
  usernameError: boolean;
  usernameMess: string;
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
    first_name: "",
    last_name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    check: true,
    eyeoff: false,
    btnLoader: false
  });

  const [error, setError] = useState<registerErrorObj>({
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    usernameMess: "",
    mobileError: false,
    mobileMess: "",
    emailError: false,
    emailMess: "",
    passwordError: false,
    confirmPasswordError: false,
    confirmPasswordMess: "",
    createBtn: true
  })
  const { first_name, last_name, username, check, confirmPassword, email, eyeoff, mobile, password, btnLoader } = state;
  const { firstNameError, lastNameError, usernameError, usernameMess, confirmPasswordError,
    confirmPasswordMess, createBtn, emailError,
    emailMess, mobileError, mobileMess, passwordError } = error;


  const apiEndPoint = process.env.REACT_APP_END_POINT

  let { emailFormat
  } = regexValidation;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createAccountHandler = () => {
    setState({
      ...state,
      btnLoader: true
    })
    const payload = {
      email: email,
      mobile_number: mobile,
      username: username,
      first_name: first_name,
      last_name: last_name,
      password: password,
      confirmation_link: `${window.location.origin}/auth/confirmation`,
      autoConfirm: false,
    }

    callApi("POST", "user/create", payload)
      .then((res: any) => {
        setState({
          ...state,
          btnLoader: false
        })
        if (res.success === true) {
          dispatch(showToast({
            type: "success",
            message: res.message
          }))
        } else if (res.success === false) {
          dispatch(showToast({
            type: "error",
            message: res.message
          }))
        }
      })
  }

  const commonValidation = (
    confirmPasswordProp: string,
    passwordProp: string
  ) => {
    if (passwordProp !== confirmPasswordProp && passwordProp !== "" && confirmPasswordProp !== "") {
      setError({
        ...error,
        confirmPasswordError: true,
        createBtn: true,
        confirmPasswordMess: "Passwords do not match!",
      })
    }
    else {
      setError({
        firstNameError: false,
        lastNameError: false,
        usernameError: false,
        usernameMess: "",
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

  const checkValidation = (first_nameProp: string, last_nameProp: string, usernameProp: string, checkProp: boolean,
    confirmPasswordProp: string, emailProp: string, mobileProp: string, passwordProp: string) => {
    let strenght = PasswordStrenght(passwordProp);
    if (strenght === 100) {
      if (first_nameProp !== "" && last_nameProp !== "" && usernameProp !== "" && usernameProp.length >= 6 &&
        mobileProp !== "" && /^\d{10}$/.test(mobileProp) === true && emailProp !== "" &&
        emailFormat.test(emailProp) === true && passwordProp === confirmPasswordProp &&
        confirmPasswordProp !== "" && checkProp === true) {
        setError({
          firstNameError: false,
          lastNameError: false,
          usernameError: false,
          usernameMess: "",
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
        <FlexLayout spacing='loose' halign='fill'>
          <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
            <TextField
              autocomplete="off"
              name="First Name"
              required
              onChange={(e) => {
                setState({
                  ...state,
                  first_name: e
                })
                if (e === "") {
                  setError({
                    ...error,
                    createBtn: true,
                    firstNameError: true
                  })
                }
                else {
                  checkValidation(e, last_name, username, check, confirmPassword, email, mobile, password)
                }
              }}
              placeHolder="Enter First Name"
              type="text"
              strength
              error={firstNameError}
              value={first_name}
              onblur={() => {
                if (first_name === "") {
                  setError({
                    ...error,
                    firstNameError: true
                  })
                }
              }}
            />
          </FlexChild>
          <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
            <TextField
              autocomplete="off"
              name="Last Name"
              required
              onChange={(e) => {
                setState({
                  ...state,
                  last_name: e
                })
                if (e === "") {
                  setError({
                    ...error,
                    createBtn: true,
                    lastNameError: true
                  })
                }
                else {
                  checkValidation(first_name, e, username, check, confirmPassword, email, mobile, password)
                }
              }}
              placeHolder="Enter Last Name"
              type="text"
              error={lastNameError}
              value={last_name}
              onblur={() => {
                if (last_name === "") {
                  setError({
                    ...error,
                    lastNameError: true
                  })
                }
              }}
            />
          </FlexChild>
        </FlexLayout>
        <TextField
          autocomplete="off"
          name="Username"
          required
          onChange={(e) => {
            setState({
              ...state,
              username: e
            })
            if (e === "") {
              setError({
                ...error,
                createBtn: true,
                usernameError: true
              })
            }
            else {
              checkValidation(first_name, last_name, e, check, confirmPassword, email, mobile, password)
            }
          }}
          placeHolder="Enter Username"
          type="text"
          error={usernameError}
          showHelp={usernameMess}
          value={username}
          onblur={() => {
            if (username === "") {
              setError({
                ...error,
                usernameError: true
              })
            } else if (username !== "" && username.length < 6) {
              setError({
                ...error,
                usernameError: true,
                usernameMess: "Username must be at least 6 characters"
              })
            }
          }}
        />
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
              checkValidation(first_name, last_name, username, check, confirmPassword, email, e, password)
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
              checkValidation(first_name, last_name, username, check, confirmPassword, e, mobile, password)
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
                    checkValidation(first_name, last_name, username, check, confirmPassword, email, mobile, e)
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
                    checkValidation(first_name, last_name, username, check, e, email, mobile, password)
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
              checkValidation(first_name, last_name, username, !check, confirmPassword, email, mobile, password)
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
          loading={btnLoader}
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