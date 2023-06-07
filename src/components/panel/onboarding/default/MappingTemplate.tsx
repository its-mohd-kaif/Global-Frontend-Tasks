import { Accordion, Card, FlexChild, FlexLayout, Select, Switcher, Tag, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { callApi } from '../../../../core/ApiMethods'
import { CategoryListData } from '../../../../core/Constant'
import AttributeSelect from '../../utility/commonComponent/AttributeSelect'
function MappingTemplate() {
    const [listingCategroy, setListingCategroy] = useState<any>([])
    const [chooseCategory, setChooseCategory] = useState<any>({
        value: "",
        category_id: "",
        // appCode: "",
        // _id: 0
    })
    useEffect(() => {
        // callApi("POST", "tiktokhome/request/getCategorydata")
        //     .then((res) => console.log("getCategorydata", res))
        const res = CategoryListData;
        console.log("getCategorydata", res)
        let tempArr: any = []
        res.forEach((element: any) => {
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
            value: value,
            category_id: id,
        })
        let payload = {
            category_id: `${id}`,
            marketplace: "tiktok",
            source_marketplace: 'bigcommerce'
        }
        callApi("POST", "tiktokhome/category/getAttributes", payload).then((res: any) => console.log(res))
    }
    return (
        <div>
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
                            <Select
                                onChange={(event: any, id: any) => handleSelectCategory(event, id.category_id)}
                                onblur={function noRefCheck() { }}
                                options={listingCategroy}
                                value={chooseCategory.value}
                            />
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
                        <FlexChild desktopWidth='66' tabWidth='66' mobileWidth='100'>
                            <FlexLayout direction='vertical' spacing='mediumLoose'>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={function noRefCheck() { }}
                                    title="Product Attributes"
                                    active={true}
                                >
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
                                </Accordion>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={function noRefCheck() { }}
                                    title="Variation Attributes"
                                >
                                    <TextStyles textcolor="light">
                                        1 Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.
                                    </TextStyles>
                                </Accordion>
                            </FlexLayout>
                        </FlexChild>
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
        </div>
    )
}

export default MappingTemplate