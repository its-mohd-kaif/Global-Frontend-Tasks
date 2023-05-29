import { FlexChild, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import OnlyLogoSvg from '../../../../assets/images/svg/OnlyLogoSvg'

function ConnectionTitle() {
    return (
        <FlexLayout valign='center' spacing='loose'>
            <FlexChild>
                <OnlyLogoSvg />
            </FlexChild>
            <FlexLayout spacing='extraTight' direction='vertical'>
                <TextStyles type='Heading' fontweight='bold' headingTypes='LG-2.8'>Welcome to Michaels Integration</TextStyles>
                <TextStyles utility='connection-title' textcolor='light' type='Heading' headingTypes='LG-2.8'>By CedCommerce</TextStyles>
            </FlexLayout>
        </FlexLayout>
    )
}

export default ConnectionTitle