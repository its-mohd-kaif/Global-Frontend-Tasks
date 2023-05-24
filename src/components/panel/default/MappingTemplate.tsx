import { Accordion, Button, Card, FlexChild, FlexLayout, Select, StepWizard, Switcher, Tag, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import ConnectionTitle from '../utility/commonComponent/ConnectionTitle'
import { ArrowRight, FileText } from "react-feather"
import AttributeSelect from '../utility/commonComponent/AttributeSelect'
function MappingTemplate() {
    return (
        <div className='connection'>
            <FlexLayout halign='center' direction='vertical'>
                <ConnectionTitle />
                <StepWizard
                    className='stepper-custom'
                    current={1}
                    items={[
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
                <Card title={" "} action={<Button icon={<FileText size={"17"} />} type='Outlined'>Help</Button>}
                    primaryAction={{
                        content: 'Save and Next',
                        type: 'Primary',
                        icon: <ArrowRight size={"18"} />,
                        iconAlign: "right"
                    }} extraClass='connection-card'>
                    <FlexLayout spacing='loose' direction='vertical'>

                        <FlexLayout spacing='extraLoose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='33'>
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
                            <FlexChild desktopWidth='66' tabWidth='66'>
                                <Select
                                    onChange={function noRefCheck() { }}
                                    onblur={function noRefCheck() { }}
                                    options={[
                                        {
                                            label: <Tag destroy={() => { }}>
                                                Shop Categories &gt; Apparel Crafts &gt; Fabric Paint
                                            </Tag>,
                                            value: '0'
                                        },
                                    ]}
                                    value="0"
                                />
                            </FlexChild>
                        </FlexLayout>

                        <FlexLayout spacing='extraLoose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='33'>
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
                            <FlexChild desktopWidth='66' tabWidth='66'>
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
                            <FlexChild desktopWidth='33' tabWidth='33'>
                                <FlexLayout spacing='tight' direction='vertical'>
                                    <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Shipping Dimensions</TextStyles>
                                    <TextStyles textcolor='light'>Through ‘Attribute Mapping’ you can enhance your listing catalog with additional listing information.</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='66'>
                                <AttributeSelect />
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
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>

                    </FlexLayout>
                </Card>
            </FlexLayout>
        </div>
    )
}

export default MappingTemplate