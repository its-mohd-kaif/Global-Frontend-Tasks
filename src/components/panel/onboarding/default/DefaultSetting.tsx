import { Card, FlexChild, FlexLayout, Select, Switcher, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import { ArrowRight } from "react-feather"
function DefaultSetting() {
    return (
        <Card
            title={"Default Configuration"}
            subTitle={"Set default configuration settings to upload product(s) on Michaels Shop"}
            primaryAction={{
                content: 'Save',
                type: 'Primary',
                icon: <ArrowRight size={"18"} />,
                iconAlign: "right",
            }}
        >
            <FlexLayout halign='center' direction='vertical'>
                <FlexLayout spacing='mediumLoose' direction='vertical' >
                    <Select
                        name="Product Custom Pricing (Fixed or Percentage)"
                        selectHelp="Price will be set on Arise according to the above rule."
                        onChange={function noRefCheck() { }}
                        onblur={function noRefCheck() { }}
                        options={[
                            {
                                label: 'None',
                                value: '0'
                            },
                        ]}
                        required
                        value="0"
                    />
                    <FlexLayout valign='start' spacing='mediumTight'>
                        <Switcher
                            checked
                            onChange={function noRefCheck() { }}
                            textAligh="right"
                        />
                        <FlexChild>
                            <FlexLayout direction='vertical'>
                                <TextStyles>Product Auto Import</TextStyles>
                                <TextStyles textcolor='light'>Enable to automatically import product(s) to the app</TextStyles>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                    <FlexLayout valign='start' spacing='mediumTight'>
                        <Switcher
                            checked
                            onChange={function noRefCheck() { }}
                            textAligh="right"
                        />
                        <FlexChild>
                            <FlexLayout direction='vertical'>
                                <TextStyles>Product Auto Delete</TextStyles>
                                <FlexChild>
                                    <>
                                        <TextStyles textcolor='light'>
                                            Enable to automatically delete from Michaels Shop when product(s) is deleted from
                                        </TextStyles>
                                        <TextStyles textcolor='light'>
                                            Magento Store. Individual variants won’t be deleted
                                        </TextStyles>
                                        <br></br>
                                    </>
                                </FlexChild>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </FlexLayout>
            </FlexLayout>
        </Card>
    )
}

export default DefaultSetting