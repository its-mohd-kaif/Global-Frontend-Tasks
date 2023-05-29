import { Button, FlexChild, FlexLayout, Image, Popover, Select } from "@cedcommerce/ounce-ui"
import { useState } from "react"
import { Edit, Trash2 } from "react-feather"
import actions from "../../../../assets/images/png/menu.png"
export const CategoryActions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button onClick={() => setOpenActions(!openActions)} type='Outlined'>
                    <Image
                        fit="cover"
                        height={20}
                        radius="corner-radius"
                        src={actions}
                        width={20}
                    />
                </Button>}
                open={openActions}
                onClose={() => setOpenActions(!openActions)}>
                <FlexLayout direction="vertical">
                    <Button icon={<Edit />} type="Plain">Edit Listing</Button>
                    <Button icon={<Trash2 />} type="Plain">View Listing</Button>
                </FlexLayout>
            </Popover>
        </>
    )
}

export const RuleGroup = () => {
    return (
        <FlexLayout halign="fill" spacing="loose">
            <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="33">
                <Select
                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                    onChange={function noRefCheck() { }}
                    onblur={function noRefCheck() { }}
                    options={[
                        {
                            label: 'Category',
                            value: '0'
                        },
                        {
                            label: 'Profile First',
                            value: '1'
                        },
                        {
                            label: 'Profile Second',
                            value: '1'
                        },
                    ]}
                    searchEable
                    value="0"
                />
            </FlexChild>
            <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="33">
                <Select
                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                    onChange={function noRefCheck() { }}
                    onblur={function noRefCheck() { }}
                    options={[
                        {
                            label: 'Equal',
                            value: '0'
                        },
                        {
                            label: 'Profile First',
                            value: '1'
                        },
                        {
                            label: 'Profile Second',
                            value: '1'
                        },
                    ]}
                    searchEable
                    value="0"
                />
            </FlexChild>
            <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="33">
                <Select
                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                    onChange={function noRefCheck() { }}
                    onblur={function noRefCheck() { }}
                    options={[
                        {
                            label: 'Select',
                            value: '0'
                        },
                        {
                            label: 'Profile First',
                            value: '1'
                        },
                        {
                            label: 'Profile Second',
                            value: '1'
                        },
                    ]}
                    searchEable
                    value="0"
                />
            </FlexChild>
        </FlexLayout>
    )
}