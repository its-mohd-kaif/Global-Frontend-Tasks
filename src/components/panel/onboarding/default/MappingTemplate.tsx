import { Accordion, Button, Card, FlexChild, FlexLayout, Select, Switcher, Tag, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { callApi } from '../../../../core/ApiMethods'
import { CategoryListData, StaticAttributes } from '../../../../core/Constant'
import AttributeSelect from '../../utility/commonComponent/AttributeSelect'
import { FileText, ArrowRight } from "react-feather"
import AttributeMappingMethod from './DefaultUtility'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
interface accordionsObj {
    product: boolean;
    variation: boolean;
}

function MappingTemplate() {
    let reduxState = useSelector((redux: any) => redux.redux.attributes_mapping)
    const [listingCategroy, setListingCategroy] = useState<any>([])
    const [chooseCategory, setChooseCategory] = useState<any>({
        selectValue: "",
        selectCategory_id: "",
    })
    const [selectAttribute, setSelectAttribute] = useState<any>([]);
    const [accordions, setAccordions] = useState<accordionsObj>({
        product: false,
        variation: false
    })
    const [getAttributeOptions, setGetAttributeOptions] = useState<any>({
        attr: [],
        variant_attr: []
    })
    const navigate = useNavigate()
    const user_id = useSelector((redux: any) => redux.redux.user_id)
    const { attr, variant_attr } = getAttributeOptions
    const { selectValue, selectCategory_id } = chooseCategory;
    const { product, variation } = accordions

    useEffect(() => {
        callApi("POST", "tiktokhome/frontend/getStepCompleted")
            .then((res: any) => {
                if (res.success === true) {
                    let extraHeaders = {
                        "Ced-Source-Id": res.shops["Ced-Source-Id"],
                        "Ced-Source-Name": res.shops["Ced-Source-Name"],
                        "Ced-Target-Id": res.shops["Ced-Target-Id"],
                        "Ced-Target-Name": res.shops["Ced-Target-Name"]
                    }
                    callApi("GET", "tiktokhome/category/getAttributeOptions?marketplace=bigcommerce", {}, extraHeaders)
                        .then((res: any) => {
                            if (res.success === true) {
                                setGetAttributeOptions({
                                    attr: res.data.attr,
                                    variant_attr: res.data.variant_attr
                                })
                            }
                        })
                }
            })
        const resOfCategoryListData = CategoryListData;
        let tempArr: any = []
        resOfCategoryListData.forEach((element: any) => {
            let obj = {
                label: element.category_path,
                value: element.category_path,
                category_id: element.category_id,
                appCode: element.appCode,
                _id: element._id.$oid
            }
            tempArr.push(obj)
        });
        setListingCategroy(tempArr)
    }, [])
    const handleSelectCategory = (value: string, id: any) => {
        setChooseCategory({
            selectValue: value,
            selectCategory_id: id,
        })
        // let payload = {
        //     category_id: `${id}`,
        //     marketplace: "tiktok",
        //     source_marketplace: 'bigcommerce'
        // }
        // callApi("GET", "tiktokhome/category/getAttributes", payload, "extraHeaders").then((res: any) => {
        //     console.log("getAttributes", res)
        // })
        const resOfStaticAttributes = StaticAttributes;
        let tempArr: any = []
        resOfStaticAttributes.forEach((element: any) => {
            if (element.attribute_type === 3) {
                let obj = {
                    productAttributes: <AttributeMappingMethod row={element} baseAttribute={attr}
                    />
                }
                tempArr.push(obj)
            } else if (element.attribute_type === 2) {
                let obj = {
                    variationAttributes: <AttributeMappingMethod row={element} baseAttribute={variant_attr}
                    />
                }
                tempArr.push(obj)
            }
        });
        setSelectAttribute(tempArr)
    }

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
                            label: selectValue,
                            value: selectCategory_id
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
                    console.log("saveConfig", res)
                    callApi("POST", "tiktokhome/frontend/getStepCompleted")
                        .then((res: any) => {
                            if (res.success === true) {
                                console.log("getStepCompleted", res)
                                let payload = {
                                    step: res.data + 1
                                }
                                callApi("POST", "tiktokhome/frontend/stepCompleted", payload)
                                    .then((res: any) => {
                                        console.log("stepCompleted", res)
                                        if (res.success === true) {
                                            // navigate(`/panel/${user_id}/onboarding`)
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
            disable: selectValue === "" ? true : false
        }} title={" "} action={<Button type='Outlined' icon={<FileText size={18} />}>Help</Button>}>
            <FlexLayout halign='center' direction='vertical'>
                <FlexLayout spacing='loose' direction='vertical'>
                    <FlexLayout spacing='extraLoose' halign='fill'>
                        <FlexChild desktopWidth='33' tabWidth='33' mobileWidth='100'>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Select Listing Category</TextStyles>
                                <TextStyles textcolor='light'>Choose the ‘Category’ that best defines your listing(s).</TextStyles>
                                <div style={{ color: "#4E4F52" }}>
                                    <TextStyles>
                                        <span style={{ fontWeight: "bold" }}>Note :</span> Based on the selected category you will further map Shopify attribute with Michaels attributes.
                                    </TextStyles>
                                </div>
                            </FlexLayout>
                        </FlexChild>
                        <FlexChild desktopWidth='66' tabWidth='66' mobileWidth='100'>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <Select
                                    onChange={(event: any, id: any) => handleSelectCategory(event, id.category_id)}
                                    onblur={function noRefCheck() { }}
                                    options={listingCategroy}
                                    value={chooseCategory.value}
                                    searchEable
                                />
                                {
                                    selectValue !== "" ? <Tag destroy={() => {
                                        setChooseCategory({
                                            selectValue: "",
                                            selectCategory_id: ""
                                        })
                                    }}>
                                        {selectValue}
                                    </Tag> : null
                                }
                            </FlexLayout>

                        </FlexChild>
                    </FlexLayout>

                    <FlexLayout spacing='extraLoose' halign='fill'>
                        <FlexChild desktopWidth='33' tabWidth='33' mobileWidth='100'>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Select Attribute Mapping</TextStyles>
                                <TextStyles textcolor='light'>Through ‘Attribute Mapping’ you can enhance your listing catalog with additional
                                    listing information.</TextStyles>
                                <div style={{ color: "#4E4F52" }}>
                                    <TextStyles>
                                        <span style={{ fontWeight: "bold" }}>Product Attributes:</span> These are the compulsory attributes that
                                        must be selected for mapping Shopify attributes with Michaels attributes.
                                    </TextStyles>
                                </div>
                                <div style={{ color: "#4E4F52" }}>
                                    <TextStyles>
                                        <span style={{ fontWeight: "bold" }}>Variation Attributes:</span> These are the mandatory attributes that must
                                        be selected if you have variants for your listings.
                                    </TextStyles>
                                </div>
                            </FlexLayout>
                        </FlexChild>
                        {selectValue !== "" ?
                            < FlexChild desktopWidth='66' tabWidth='66' mobileWidth='100'>
                                <FlexLayout direction='vertical' spacing='mediumLoose'>
                                    <Accordion
                                        boxed
                                        icon
                                        iconAlign="left"
                                        onClick={() => {
                                            setAccordions({
                                                ...accordions,
                                                product: !product
                                            })
                                        }}
                                        title="Product Attributes"
                                        active={product}
                                    >
                                        <FlexLayout direction='vertical'>
                                            <FlexChild>
                                                <FlexLayout halign='fill'>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <>
                                                            <TextStyles fontweight='bold'>TikTok Shop Attributes</TextStyles>
                                                        </>
                                                    </FlexChild>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <TextStyles fontweight='bold'>Mapping Attributes</TextStyles>
                                                    </FlexChild>
                                                </FlexLayout>
                                            </FlexChild>
                                            <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                                                {selectAttribute.map((val: any, index: number) => (
                                                    <>
                                                        {val.productAttributes}
                                                        <br></br>
                                                    </>
                                                ))}
                                            </FlexChild>
                                        </FlexLayout>
                                    </Accordion>
                                    <Accordion
                                        boxed
                                        icon
                                        iconAlign="left"
                                        onClick={() => {
                                            setAccordions({
                                                ...accordions,
                                                variation: !variation
                                            })
                                        }}
                                        title="Variation Attributes"
                                        active={variation}
                                    >
                                        <FlexLayout direction='vertical'>
                                            <FlexChild>
                                                <FlexLayout halign='fill'>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <>
                                                            <TextStyles fontweight='bold'>TikTok Shop Attributes</TextStyles>
                                                        </>
                                                    </FlexChild>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <TextStyles fontweight='bold'>Mapping Attributes</TextStyles>
                                                    </FlexChild>
                                                </FlexLayout>
                                            </FlexChild>
                                            <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                                                <FlexLayout spacing='extraTight' direction='vertical'>
                                                    {selectAttribute.map((val: any, index: number) => (
                                                        <>
                                                            {val.variationAttributes}
                                                        </>
                                                    ))}
                                                </FlexLayout>
                                            </FlexChild>
                                        </FlexLayout>
                                    </Accordion>
                                </FlexLayout>
                            </FlexChild>
                            :
                            null}


                    </FlexLayout>

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