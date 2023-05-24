import { Card, FlexChild, FlexLayout, StepWizard, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import OnlyLogoSvg from '../../../assets/images/svg/OnlyLogoSvg'
import { ArrowRight } from "react-feather"
function SourceConnection() {
    const sourceList = ["Login to your Shopify Admin Store and click on ‘Create App’",
        "Next, click on Configure API Admin Scope to tick permission for the required API scopes.",
        "Now, click on the API credentials button and install the App",
        "After installing the app, take note of the generated Secret API"]
    return (
        <div className='source-connection' >
            <FlexLayout halign='center' direction='vertical'>
                <FlexLayout>
                    <FlexChild>
                        <OnlyLogoSvg />
                    </FlexChild>
                    <FlexLayout direction='vertical'>
                        <TextStyles type='Heading' fontweight='bold' headingTypes='LG-2.8'>Welcome to Michaels Integration By</TextStyles>
                        <TextStyles textcolor='light' type='Heading' headingTypes='LG-2.8'>By CedCommerce</TextStyles>
                    </FlexLayout>
                </FlexLayout>
                <StepWizard
                    className='stepper-custom'
                    current={0}
                    items={[
                        {
                            title: 'Source Connection'
                        },
                        {
                            title: 'Create Your Account'
                        },
                        {
                            title: 'Mapping'
                        },
                        {
                            title: 'Configuration'
                        },
                    ]}
                />
                <Card
                    primaryAction={{
                        content: 'Connect',
                        type: 'Primary',
                        icon: <ArrowRight size={"18"} />,
                        iconAlign: "right"
                    }}
                    title={"How to get an API key"} extraClass='source-connection-card'>
                    <FlexLayout direction='vertical' spacing='extraLoose'>
                        {sourceList.map((val: string, index: number) => (
                            <FlexLayout key={index} spacing='mediumLoose'>
                                <div className='list-circle'>{index + 1}</div>
                                <TextStyles type='Paragraph' paragraphTypes='MD-1.4'>
                                    {val}
                                </TextStyles>
                            </FlexLayout>
                        ))}
                    </FlexLayout>
                </Card>
            </FlexLayout>
        </div>
    )
}

export default SourceConnection