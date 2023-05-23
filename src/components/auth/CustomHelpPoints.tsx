import {FlexLayout, List, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import { HelpCircle } from "react-feather"
function CustomHelpPoints() {
    return (
        <div className="custom-help-points">
            <FlexLayout spacing='extraTight'>
                <HelpCircle size="18" color="#4E4F52" />
                <FlexLayout
                    spacing="extraTight"
                    wrap="noWrap"
                    valign="start"
                    direction="vertical">
                    <TextStyles textcolor="light">
                        The password must contain atleast:
                    </TextStyles>
                    <List type="disc">
                        <TextStyles textcolor="light">
                            Must contain number, letters and special characters
                        </TextStyles>
                        <TextStyles textcolor="light">
                            Must be a 6-20 characters
                        </TextStyles>
                    </List>
                </FlexLayout>
            </FlexLayout>
        </div>
    )
}

export default CustomHelpPoints