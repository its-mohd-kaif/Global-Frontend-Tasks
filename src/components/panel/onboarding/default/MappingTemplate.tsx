import { Button, Card, FlexChild, FlexLayout, Switcher, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import { callApi } from '../../../../core/ApiMethods'
import AttributeSelect from '../../utility/commonComponent/AttributeSelect'
import { FileText, ArrowRight } from "react-feather"
import { useSelector } from 'react-redux'
import CommonListingComponent from '../../utility/commonComponent/CommonListingComponent'

function MappingTemplate() {
    let reduxState = useSelector((redux: any) => redux.redux.attributes_mapping)
    const reduxChooseCategory = useSelector((redux: any) => redux.redux)
    const SaveHandler = () => {
        const product_attributes: any = {};
        const variation_attributes: any = {};
        for (const key in reduxState) {
            if (reduxState.hasOwnProperty(key)) {
                if ('customSelectValuesLength' in reduxState[key]) {
                    product_attributes[key] = reduxState[key];
                } else {
                    variation_attributes[key] = reduxState[key];
                }
            }
        }
        let obj = {
            data: [{
                group_code: "default_profile",
                data: {
                    default_profile: {
                        attributes_mapping: reduxState,
                        category_id: {
                            label: reduxChooseCategory.chooseCategory.selectValue,
                            value: reduxChooseCategory.chooseCategory.selectCategory_id,
                        },
                        data: [{
                            data: {
                                product_attributes: product_attributes,
                                variation_attributes: variation_attributes
                            }
                        }],
                        name: "Default",
                        query: "default",
                    }
                }
            }]
        }
        callApi("POST", "connector/config/saveConfig", obj, "extraHeadears")
            .then((res: any) => {
                if (res.success === true) {
                    callApi("POST", "tiktokhome/frontend/getStepCompleted")
                        .then((res: any) => {
                            if (res.success === true) {
                                let payload = {
                                    step: res.data + 1
                                }
                                callApi("POST", "tiktokhome/frontend/stepCompleted", payload)
                                    .then((res: any) => {
                                        if (res.success === true) {
                                            window.location.reload();
                                        }
                                    })
                            }
                        })
                }
            })
    }
    return (
        <Card primaryAction={{
            content: 'Save and Next',
            type: 'Primary',
            icon: <ArrowRight size={"18"} />,
            iconAlign: "right",
            onClick: SaveHandler,
            disable: reduxChooseCategory.chooseCategory.selectValue === "" ? true : false
        }} title={" "} action={<Button type='Outlined' icon={<FileText size={18} />}>Help</Button>}>
            <FlexLayout halign='center' direction='vertical'>
                <FlexLayout spacing='loose' direction='vertical'>
                    {/* Common Listing Component that used in here and new template also */}
                    <CommonListingComponent where={"mapping"} />

                    <FlexLayout spacing='extraLoose' halign='fill'>
                        <FlexChild desktopWidth='33' tabWidth='33' mobileWidth='100'>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Shipping Dimensions</TextStyles>
                                <TextStyles textcolor='light'>Through ‘Attribute Mapping’ you can enhance your listing catalog with additional listing information.</TextStyles>
                            </FlexLayout>
                        </FlexChild>
                        <FlexChild desktopWidth='66' tabWidth='66' mobileWidth='100'>
                            <Card cardType='Subdued'>
                                <FlexChild>
                                    <FlexLayout>
                                        <FlexChild desktopWidth='25' tabWidth='25'>
                                            <>
                                                <TextStyles>Michaels</TextStyles>
                                                <TextStyles>Attributes</TextStyles>
                                            </>
                                        </FlexChild>
                                        <FlexChild desktopWidth='75' tabWidth='75'>
                                            <TextStyles>Shopify Attributes</TextStyles>
                                        </FlexChild>
                                    </FlexLayout>
                                </FlexChild>
                                <AttributeSelect />
                            </Card>
                        </FlexChild>
                    </FlexLayout>
                    <FlexLayout spacing='extraLoose' halign='fill'>
                        <FlexChild desktopWidth='33' tabWidth='33'>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Shipping & Return
                                    Details</TextStyles>
                                <TextStyles textcolor='light'>Enable the options that best define your listing(s) shipping
                                    and return settings.
                                    This helps the app to reflect the selected details on Michaels.</TextStyles>
                            </FlexLayout>
                        </FlexChild>
                        <FlexChild desktopWidth='66' tabWidth='66'>
                            <FlexLayout spacing='loose' direction='vertical'>
                                <Switcher
                                    checked
                                    name="Is the items ground shipping only?"
                                    onChange={function noRefCheck() { }}
                                    textAligh="right"
                                />
                                <Switcher
                                    checked={false}
                                    name="Is this item restricted from shipping to AK and/or HI?"
                                    onChange={function noRefCheck() { }}
                                    textAligh="right"
                                />
                                <Switcher
                                    checked={false}
                                    name="Does the listing contain flammable materials?"
                                    onChange={function noRefCheck() { }}
                                    textAligh="right"
                                />
                                <Switcher
                                    checked={false}
                                    name="Are you required to display a California Proposition 65 warning on this items?"
                                    onChange={function noRefCheck() { }}
                                    textAligh="right"
                                />
                                <Switcher
                                    checked={false}
                                    name="Does this listing contain hazardous materials?"
                                    onChange={function noRefCheck() { }}
                                    textAligh="right"
                                />
                                <TextStyles textcolor='light'>
                                    Note: Based on the selected category you will further map Shopify attribute with Michaels attributes.
                                </TextStyles>
                                <br></br>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </FlexLayout>
            </FlexLayout>
        </Card >
    )
}

export default MappingTemplate