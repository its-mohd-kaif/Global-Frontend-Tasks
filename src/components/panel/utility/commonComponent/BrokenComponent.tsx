import { Button, FallBack, FlexLayout, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BrokenPageSvg from '../../../../assets/images/svg/BrokenPageSvg'

function BrokenComponent() {
    const navigate = useNavigate()
    return (
        <div style={{ marginTop: "5em" }}>
            <FallBack
                action={<Button onClick={() => {
                    navigate("auth/login")
                    window.location.reload()
                }} thickness="large" type="Primary">Go to Login</Button>}
                illustration={<BrokenPageSvg />}
                subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">Your file have some error. We’re trying to fix it.</TextStyles><p className="Paragraph inte-Align--center inte__text--light none inte__font--normal inte__Paragraph--font--medium  ">Need Help? Read our{' '}<TextLink label="Help Doc" onClick={function noRefCheck() { }} />{' '}for further details.</p></FlexLayout>}
                title="Broken Page"
            />
        </div>

    )
}

export default BrokenComponent