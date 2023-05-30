import { Accordion, Button, Card, FlexChild, FlexLayout, FormElement, List, PageHeader, Radio, Select, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, Trash2 ,Percent} from "react-feather"
import GrayCheckSvg from '../../../../assets/images/svg/GrayCheckSvg';
import GreenCheckSvg from '../../../../assets/images/svg/GreenCheckSvg';
import { RuleGroup } from './CategoryUtility'
function Template() {
    const [ruleComponent, setRuleComponent] = useState<any>([]);
    useEffect(() => {
        // let obj = {
        //     id: Math.floor(Math.random() * 21212121),
        //     comp: <RuleGroup />
        // }
        // setRuleComponent([...ruleComponent, obj])
    }, [])

    const addMoreHandler = () => {
        let obj = {
            id: Math.floor(Math.random() * 21212121),
            comp: <RuleGroup />
        }
        setRuleComponent([...ruleComponent, obj])
    }
    const deleteRuleHandler = (id: number) => {
        ruleComponent.forEach((element: any, index: number) => {
            if (element.id === id) {
                ruleComponent.splice(index, 1)
            }
        });
        setRuleComponent([...ruleComponent])
    }
    return (
        <>
            <PageHeader title="Category Template"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <Button onClick={() => { }} type="Primary">Save</Button>
                    </FlexLayout>
                }
            />
            <hr></hr>
            <br></br>
            <Card>
                <FlexLayout spacing='loose' direction='vertical'>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33'>
                                <FlexLayout spacing='extraTight'>
                                    <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Category Template Name</TextStyles>
                                    <TextStyles textcolor="negative">*</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66'>
                                <TextField
                                    autocomplete="off"
                                    onChange={function noRefCheck() { }}
                                    placeHolder="Enter the Cateogry Template Name"
                                    type="text"
                                    showHelp='Category Template name must be unique and should not exceed 80 characters.'
                                />
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                    <hr></hr>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' >
                                <FlexLayout direction='vertical' spacing='extraTight'>
                                    <FlexLayout spacing='extraTight'>
                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Assign Product to the Template</TextStyles>
                                        <TextStyles textcolor="negative">*</TextStyles>
                                    </FlexLayout>
                                    <TextStyles textcolor='light'>
                                        Create Rule Group(s) (query) to fetch a particular set of the product(s) in the current profile.
                                    </TextStyles>
                                    <List
                                        type="disc"
                                    >
                                        <TextStyles textcolor="light">
                                            Select <span className='list-highlight'>Any Condition</span> to fetch the product(s) fulfilling any of the conditions created.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            Select <span className='list-highlight'>All Condition</span> to fetch the product(s) fulfilling all the conditions created.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            Click on <span className='list-highlight'>Add More</span> to add multiple conditions in the Rule Group.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            Click on <span className='list-highlight'>Run Query</span> to fetch the number of the product(s) on the basis of the Rule Group(s) created.
                                        </TextStyles>
                                    </List>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66'>
                                <Card title={"Rule Group"}
                                    primaryAction={{
                                        content: 'Run Query',
                                        type: 'Primary'
                                    }}
                                    secondaryAction={{
                                        content: 'Add More',
                                        type: 'Outlined',
                                        onClick: addMoreHandler
                                    }}
                                >
                                    <FlexLayout spacing='loose' direction='vertical'>
                                        <FlexChild>
                                            <FormElement>
                                                <FlexLayout spacing='loose'>
                                                    <TextStyles>Product Must Match</TextStyles>
                                                    <Radio
                                                        checked
                                                        id="0"
                                                        labelVal="Any Condition"
                                                        name="2"
                                                        onClick={function noRefCheck() { }}
                                                        value={0}
                                                    />
                                                    <Radio
                                                        id="1"
                                                        labelVal="All Conditions"
                                                        name="2"
                                                        onClick={function noRefCheck() { }}
                                                        value={0}
                                                    />
                                                </FlexLayout>
                                            </FormElement>
                                        </FlexChild>
                                        <FlexLayout spacing='loose' direction='vertical'>
                                            {ruleComponent.map((val: any) =>
                                            (<FlexLayout spacing='loose' key={val.id}>
                                                <FlexChild desktopWidth='80'>
                                                    {val.comp}
                                                </FlexChild>
                                                {ruleComponent.length > 1 ?
                                                    <FlexChild desktopWidth='20'>
                                                        <Button
                                                            onClick={() => deleteRuleHandler(val.id)}
                                                            icon={<Trash2 color="#D92D20" size={20} />}
                                                            type="DangerOutlined"
                                                        />
                                                    </FlexChild>
                                                    : null}
                                            </FlexLayout>
                                            )
                                            )}
                                        </FlexLayout>
                                    </FlexLayout>
                                </Card>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                    <hr></hr>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33'>
                                <FlexLayout spacing='extraTight' direction='vertical'>
                                    <FlexLayout spacing='extraTight'>
                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Select Listing Category</TextStyles>
                                        <TextStyles textcolor="negative">*</TextStyles>
                                    </FlexLayout>
                                    <TextStyles textcolor='light'>Choose the Category that best defines your listing(s).</TextStyles>
                                </FlexLayout>

                            </FlexChild>
                            <FlexChild desktopWidth='66'>
                                <FlexLayout spacing='extraTight' direction='vertical'>
                                    <Select
                                        helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                        onChange={function noRefCheck() { }}
                                        onblur={function noRefCheck() { }}
                                        options={[
                                            {
                                                label: 'Select',
                                                value: '0'
                                            },
                                        ]}
                                        searchEable
                                        value="0"
                                    />
                                    <FlexChild>
                                        <FlexLayout spacing='extraTight'>
                                            <TextStyles textcolor='light' fontweight='extraBold'>Note:</TextStyles>
                                            <TextStyles textcolor='light'>Based on the selected category you will further map Magento attribute with setup attributes.</TextStyles>
                                        </FlexLayout>
                                    </FlexChild>
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                    <hr></hr>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' >
                                <FlexLayout direction='vertical' spacing='extraTight'>
                                    <FlexLayout spacing='extraTight'>
                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Select Attribute Mapping</TextStyles>
                                        <TextStyles textcolor="negative">*</TextStyles>
                                    </FlexLayout>
                                    <TextStyles textcolor='light'>
                                        Through attribute mapping you can enhance your listing catalog with additional listing information.
                                    </TextStyles>
                                    <List
                                        type="disc"
                                    >
                                        <TextStyles textcolor="light">
                                            <span className='list-highlight'>Product Attributes:</span> These are the compulsory attributes that must be selected
                                            for mapping BigCommerce attributes with TikTok shop attributes.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            <span className='list-highlight'>Variation Attribute:</span> These are the mandatory attribute that must be selected if
                                            you have variants for you listings.
                                        </TextStyles>
                                    </List>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66'>
                                <FlexLayout spacing='mediumLoose' direction='vertical'>
                                    <Card cardType='Subdued'>
                                        <Accordion
                                            boxed
                                            icon
                                            iconAlign="left"
                                            onClick={function noRefCheck() { }}
                                            title="Product Attribute"
                                            active={true}
                                        >
                                            <FlexLayout direction='vertical'>
                                                <FlexLayout halign='fill'>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Tiktok Shop Attribute</TextStyles>
                                                    </FlexChild>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>BigCommerce Attribute</TextStyles>
                                                    </FlexChild>
                                                </FlexLayout>
                                                <FlexLayout spacing='mediumTight' direction='vertical'>
                                                    <Card>
                                                        <FlexLayout spacing='mediumTight' direction='vertical'>
                                                            <TextStyles>Required</TextStyles>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GreenCheckSvg />
                                                                                <FlexChild>
                                                                                    <FlexLayout spacing='extraTight'>
                                                                                        <TextStyles subheadingTypes='XS-1.6'>Package Length</TextStyles>
                                                                                        <TextStyles textcolor="negative">*</TextStyles>
                                                                                    </FlexLayout>
                                                                                </FlexChild>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Length',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GreenCheckSvg />
                                                                                <FlexChild>
                                                                                    <FlexLayout spacing='extraTight'>
                                                                                        <TextStyles subheadingTypes='XS-1.6'>Package Width</TextStyles>
                                                                                        <TextStyles textcolor="negative">*</TextStyles>
                                                                                    </FlexLayout>
                                                                                </FlexChild>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Width',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GreenCheckSvg />
                                                                                <FlexChild>
                                                                                    <FlexLayout spacing='extraTight'>
                                                                                        <TextStyles subheadingTypes='XS-1.6'>Package Height</TextStyles>
                                                                                        <TextStyles textcolor="negative">*</TextStyles>
                                                                                    </FlexLayout>
                                                                                </FlexChild>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Height',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GreenCheckSvg />
                                                                                <FlexChild>
                                                                                    <FlexLayout spacing='extraTight'>
                                                                                        <TextStyles subheadingTypes='XS-1.6'>Package Weight</TextStyles>
                                                                                        <TextStyles textcolor="negative">*</TextStyles>
                                                                                    </FlexLayout>
                                                                                </FlexChild>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Weight',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                        </FlexLayout>
                                                    </Card>
                                                    <Card>
                                                        <FlexLayout spacing='mediumLoose' direction='vertical'>
                                                            <TextStyles>Optional</TextStyles>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Speaker Size</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Speaker Size',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Speaker Type</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Speaker Type',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Warrenty Type</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Warrenty Type',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Amplifier Type</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <TextField
                                                                                autocomplete="off"
                                                                                onChange={function noRefCheck() { }}
                                                                                placeHolder="Enter Custom Attribute"
                                                                                type="text"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Position</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Position',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Brand</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Brand',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Warranty Period</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select Warranty Period',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                        </FlexLayout>
                                                    </Card>
                                                </FlexLayout>
                                            </FlexLayout>

                                        </Accordion>
                                    </Card>
                                    <Card cardType='Subdued'>
                                        <Accordion
                                            boxed
                                            icon
                                            iconAlign="left"
                                            onClick={function noRefCheck() { }}
                                            title="Variation Attribute"
                                            active={true}
                                        >
                                            <FlexLayout direction='vertical'>
                                                <FlexLayout halign='fill'>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Tiktok Shop Attribute</TextStyles>
                                                    </FlexChild>
                                                    <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                        <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>BigCommerce Attribute</TextStyles>
                                                    </FlexChild>
                                                </FlexLayout>
                                                <FlexLayout spacing='mediumTight' direction='vertical'>
                                                    <Card>
                                                        <FlexLayout spacing='mediumLoose' direction='vertical'>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GreenCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Color</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <FlexLayout spacing='loose' direction='vertical'>
                                                                    <FlexLayout valign='center' halign='fill'>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <FlexLayout spacing='mediumTight'>
                                                                                <GrayCheckSvg />
                                                                                <TextStyles subheadingTypes='XS-1.6'>Specification</TextStyles>
                                                                            </FlexLayout>
                                                                        </FlexChild>
                                                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                                            <Select
                                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                                onChange={function noRefCheck() { }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: 'Select',
                                                                                        value: '0'
                                                                                    },
                                                                                ]}
                                                                                searchEable
                                                                                value="0"
                                                                            />
                                                                        </FlexChild>
                                                                    </FlexLayout>
                                                                </FlexLayout>
                                                            </FlexChild>
                                                        </FlexLayout>
                                                    </Card>
                                                </FlexLayout>
                                            </FlexLayout>
                                        </Accordion>
                                    </Card>
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                    <hr></hr>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33'>
                                <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Profile Custom Pricing (Fixed or Percentage)</TextStyles>
                            </FlexChild>
                            <FlexChild desktopWidth='66'>
                                <FlexLayout spacing='extraTight' direction='vertical'>
                                    <FlexChild>
                                        <FlexLayout halign='fill' spacing='loose'>
                                            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                <Select
                                                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                    onChange={function noRefCheck() { }}
                                                    onblur={function noRefCheck() { }}
                                                    options={[
                                                        {
                                                            label: 'Percentage Increment',
                                                            value: '0'
                                                        },
                                                    ]}
                                                    searchEable
                                                    value="0"
                                                />
                                            </FlexChild>
                                            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                <TextField
                                                    innerSufIcon={<Percent color='#70747E' size={18} />}
                                                    onChange={function noRefCheck() { }}
                                                    placeHolder="Enter Value"
                                                    type="text"
                                                    value=""
                                                />
                                            </FlexChild>
                                        </FlexLayout>
                                    </FlexChild>
                                    <FlexChild>
                                        <TextStyles textcolor='light'>The filtered product(s) will be uploaded on setup Shop with the updated price rule.</TextStyles>
                                    </FlexChild>
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                </FlexLayout>
            </Card>
        </>
    )
}

export default Template