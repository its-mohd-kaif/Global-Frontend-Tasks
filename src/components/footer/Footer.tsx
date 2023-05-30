import { FlexChild, FlexLayout, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'

function Footer() {
    return (
        <div className="app-footer pb-20">
            <FlexLayout valign='center' spacing='tight' halign='center'>
                <TextStyles textcolor='light'>
                    A CedCommerce Inc Product @2022.
                </TextStyles>
                <FlexChild>
                    <FlexLayout valign='center' spacing='extraTight'>
                        <TextStyles textcolor='light'>
                            Need Help?
                        </TextStyles>
                        <TextLink label="Get Support" />
                    </FlexLayout>
                </FlexChild>

            </FlexLayout>
        </div>
    )
}

export default Footer