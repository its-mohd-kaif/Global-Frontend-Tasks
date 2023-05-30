import { Button, Card, FlexChild, FlexLayout, Image, Modal, Popover, Select, TextLink, TextStyles } from "@cedcommerce/ounce-ui"
import { useState } from "react"
import { Edit, Trash2 } from "react-feather"
import actions from "../../../../assets/images/png/menu.png"


export const CategoryActions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button customClass="action-button" onClick={() => setOpenActions(!openActions)} type='Outlined'>
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
                <FlexLayout halign="start" direction="vertical">
                    <Button icon={<Edit />} type="Plain">Edit</Button>
                    <Button onClick={() => { setOpenModal(!openModal) }} customClass="action-delete-btn" icon={<Trash2 />} type="DangerPlain">Delete</Button>
                </FlexLayout>
            </Popover>
            <Modal
                close={() => { setOpenModal(!openModal) }}
                heading="Permission Required"
                modalSize="small"
                primaryAction={{
                    content: 'Proceed',
                    loading: false,
                    type: "Danger",
                    onClick: () => { setOpenModal(!openModal) }
                }}
                open={openModal}>
                Deleting this category template will unassign the product(s) under the profile and assign them to the Default
                profile. Do you wish to continue with deletion?
            </Modal>
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

export const ViewRules = (_props: any) => {
    const { rule } = _props;
    const [openModal, setOpenModal] = useState<boolean>(false);
    const myRules = [
        {
            string: {
                str1: "Category",
                str2: "Equal",
                str3: "Mobile"
            },
        },
        {
            string: {
                str1: "Name",
                str2: "Contains",
                str3: "Samsung"
            },
            optr: "And"
        },
        {
            string: {
                str1: "Color",
                str2: "Equal",
                str3: "Red"
            },
            optr: "And"
        },
    ]
    return (<>
        <TextLink onClick={() => { setOpenModal(!openModal) }} label={rule} />
        <Modal
            close={() => { setOpenModal(!openModal) }}
            heading="Product Rules"
            modalSize="small"
            open={openModal}>
            <Card cardType="Subdued">
                <FlexLayout halign="fill">
                    <TextStyles>
                        Category
                    </TextStyles>
                    <TextStyles fontweight="bold">
                        Equal
                    </TextStyles>
                    <TextStyles>
                        Category
                    </TextStyles>
                </FlexLayout>
            </Card>
        </Modal>
    </>)
}