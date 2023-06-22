import { Accordion, FlexChild, FlexLayout, Loader, Select, Tag, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../../../../core/ApiMethods';
import { CategoryListData, StaticAttributes } from '../../../../core/Constant';
import { addChooseCategory } from '../../../../redux/ReduxSlice';
import AttributeMappingMethod from '../../onboarding/default/DefaultUtility';

function CommonListingComponent(props: any) {
    const { where } = props
    const [accordions, setAccordions] = useState<any>({
        product: false,
        variation: false
    })
    const [listingCategroy, setListingCategroy] = useState<any>([])
    const [selectAttribute, setSelectAttribute] = useState<any>([]);
    const [getAttributeOptions, setGetAttributeOptions] = useState<any>({
        attr: [],
        variant_attr: []
    })
    const reduxState = useSelector((redux: any) => redux.redux)
    const dispatch = useDispatch()
    const { attr, variant_attr } = getAttributeOptions
    const { variation, product } = accordions;
    const [loader, setLoader] = useState<boolean>(false)
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
        setLoader(true)
        dispatch(addChooseCategory({
            value: value,
            id: id
        }))
        let payload = {
            category_id: `${id}`,
            marketplace: "tiktok",
            source_marketplace: 'bigcommerce'
        }
        callApi("GET", "tiktokhome/category/getAttributes", payload, "extraHeaders").then((res: any) => {
            console.log("getAttributes", res)
            setLoader(false)
            // const resOfStaticAttributes = StaticAttributes;
            let tempArr: any = []
            res.data.forEach((element: any) => {
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
        })

    }
    if (loader === true) {
        return (
            <>
                <Loader type='Loader2' />
            </>
        )
    } else {
        return (
            <FlexLayout direction='vertical' spacing='loose'>
                <FlexLayout spacing='extraLoose' halign='fill'>
                    <FlexChild desktopWidth='33' tabWidth='33' mobileWidth='100'>
                        <FlexLayout spacing='tight' direction='vertical'>
                            <FlexLayout spacing='extraTight'>
                                <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Select Product category</TextStyles>
                                <TextStyles textcolor="negative">*</TextStyles>
                            </FlexLayout>
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
                                value={reduxState.chooseCategory.selectValue}
                                searchEable
                            />
                            {
                                reduxState.chooseCategory.selectValue !== "" ? <Tag destroy={() => {
                                    dispatch(addChooseCategory({
                                        value: "",
                                        id: ""
                                    }))
                                }}>
                                    {reduxState.chooseCategory.selectValue}
                                </Tag> : null
                            }
                        </FlexLayout>

                    </FlexChild>
                </FlexLayout>
                <FlexLayout spacing='extraLoose' halign='fill'>
                    {reduxState.chooseCategory.selectValue !== "" && where === "template" ?
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
                        </FlexChild> : null
                    }
                    {reduxState.chooseCategory.selectValue !== "" ?
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
            </FlexLayout>
        )
    }
}

export default CommonListingComponent