import { Alert, Button, Card, FormElement } from '@cedcommerce/ounce-ui'
import React from 'react'
import { ArrowLeft } from "react-feather"
import { useNavigate } from 'react-router-dom'
function ResetMail() {
  const navigate = useNavigate()
  return (
    <Card>
      <FormElement>
        <Alert
          type="success"
          desciption="Check your email to reset password."
          destroy={false}>
          Reset password link generated!
        </Alert>
        <hr></hr>
        <Button
          icon={<ArrowLeft size={20} />}
          type="Plain"
          onClick={() => navigate("/auth/login")}>
          Back to Login
        </Button>
      </FormElement>
    </Card>
  )
}

export default ResetMail