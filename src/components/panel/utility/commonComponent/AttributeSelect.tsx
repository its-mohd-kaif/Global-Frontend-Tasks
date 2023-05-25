import { FlexChild, FlexLayout, Select, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import GrayCheckSvg from '../../../../assets/images/svg/GrayCheckSvg'
import GreenCheckSvg from '../../../../assets/images/svg/GreenCheckSvg'

function AttributeSelect() {
    return (
        <FlexLayout desktopWidth='100' tabWidth='100' mobileWidth='100' spacing='extraTight' direction='vertical'>
            <FlexChild>
                <FlexLayout valign='center' >
                    <FlexChild desktopWidth='25' tabWidth='25'>
                        <FlexLayout spacing='tight'>
                            <GreenCheckSvg />
                            <TextStyles>Brand</TextStyles>
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild desktopWidth='75' tabWidth='75'>
                        <Select
                            onChange={function noRefCheck() { }}
                            onblur={function noRefCheck() { }}
                            options={[
                                {
                                    label: 'Select',
                                    value: '0'
                                },
                            ]}
                            value="0"
                        />
                    </FlexChild>
                </FlexLayout>
            </FlexChild>
            <FlexChild>
                <FlexLayout valign='center' >
                    <FlexChild desktopWidth='25' tabWidth='25'>
                        <FlexLayout spacing='tight'>
                            <GrayCheckSvg />
                            <TextStyles>Weight</TextStyles>
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild desktopWidth='75' tabWidth='75'>
                        <Select
                            onChange={function noRefCheck() { }}
                            onblur={function noRefCheck() { }}
                            options={[
                                {
                                    label: 'Select',
                                    value: '0'
                                },
                            ]}
                            value="0"
                        />
                    </FlexChild>
                </FlexLayout>
            </FlexChild>
            <FlexChild>
                <FlexLayout valign='center' >
                    <FlexChild desktopWidth='25' tabWidth='25'>
                        <FlexLayout spacing='tight'>
                            <GrayCheckSvg />
                            <TextStyles>Height</TextStyles>
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild desktopWidth='75' mobileWidth='75'>
                        <FlexLayout spacing='mediumTight'>
                            <FlexChild desktopWidth='75' tabWidth='75'>
                                <Select
                                    onChange={function noRefCheck() { }}
                                    onblur={function noRefCheck() { }}
                                    options={[
                                        {
                                            label: 'Select',
                                            value: '0'
                                        },
                                    ]}
                                    value="0"
                                />
                            </FlexChild>
                            <FlexChild desktopWidth='25' tabWidth='25'>
                                <Select
                                    onChange={function noRefCheck() { }}
                                    onblur={function noRefCheck() { }}
                                    options={[
                                        {
                                            label: 'Inch',
                                            value: '0'
                                        },
                                    ]}
                                    value="0"
                                />
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>

                </FlexLayout>
            </FlexChild>
            <FlexChild>
                <FlexLayout valign='center' >
                    <FlexChild desktopWidth='25' tabWidth='25'>
                        <FlexLayout spacing='tight'>
                            <GrayCheckSvg />
                            <TextStyles>Length</TextStyles>
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild desktopWidth='75' mobileWidth='75'>
                        <FlexLayout spacing='mediumTight'>
                            <FlexChild desktopWidth='75' tabWidth='75'>
                                <Select
                                    onChange={function noRefCheck() { }}
                                    onblur={function noRefCheck() { }}
                                    options={[
                                        {
                                            label: 'Select',
                                            value: '0'
                                        },
                                    ]}
                                    value="0"
                                />
                            </FlexChild>
                            <FlexChild desktopWidth='25' tabWidth='25'>
                                <Select
                                    onChange={function noRefCheck() { }}
                                    onblur={function noRefCheck() { }}
                                    options={[
                                        {
                                            label: 'Inch',
                                            value: '0'
                                        },
                                    ]}
                                    value="0"
                                />
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>

                </FlexLayout>
            </FlexChild>
        </FlexLayout>
    )
}

export default AttributeSelect