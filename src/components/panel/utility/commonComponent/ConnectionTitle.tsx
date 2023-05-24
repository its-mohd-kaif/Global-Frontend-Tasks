import { FlexChild, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import OnlyLogoSvg from '../../../../assets/images/svg/OnlyLogoSvg'

function ConnectionTitle() {
    return (
        <FlexLayout>
            <FlexChild>
                <OnlyLogoSvg />
            </FlexChild>
            <FlexLayout direction='vertical'>
                <TextStyles type='Heading' fontweight='bold' headingTypes='LG-2.8'>Welcome to Michaels Integration By</TextStyles>
                <TextStyles textcolor='light' type='Heading' headingTypes='LG-2.8'>By CedCommerce</TextStyles>
            </FlexLayout>
        </FlexLayout>
    )
}

export default ConnectionTitle