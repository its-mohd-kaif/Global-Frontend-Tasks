import { Button, Card, FlexChild, FlexLayout, FormElement, List, PageHeader, Radio, Select, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, Trash2 } from "react-feather"
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
                </FlexLayout>
            </Card>
        </>
    )
}

export default Template