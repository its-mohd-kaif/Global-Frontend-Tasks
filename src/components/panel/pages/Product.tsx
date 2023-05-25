import { ActionList, AdvanceFilter, Alert, AutoComplete, Button, Card, FlexChild, FlexLayout, Grid, PageHeader, Tabs, TextLink } from '@cedcommerce/ounce-ui'
import { type } from 'os'
import React, { useState } from 'react'
import { FileText, ChevronDown, Filter } from "react-feather"
function Product() {
    // const [open, setOpen] = useState<boolean>(false)
    const columns = [
        {
            align: 'left',
            dataIndex: 'image',
            key: 'image',
            title: 'Image',
            width: 100
        },
        {
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            title: 'Title',
            width: 100
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: 'Price',
            width: 100
        },
        {
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            title: 'Status',
            width: 100
        },
        {
            align: 'left',
            dataIndex: 'activity',
            key: 'activity',
            title: 'Activity',
            width: 100
        },
        {
            align: 'left',
            dataIndex: 'actions',
            key: 'actions',
            title: 'Actions',
            width: 100
        }
    ]
    const data = [
        {
            address: '10 Downing Street',
            age: 32,
            key: '1',
            name: 'Mike'
        }
    ]
    return (
        <>
            <PageHeader
                title="Product Listing"
                action={<FlexLayout valign='center' spacing='tight'>
                    <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                    <ActionList
                        // open={open}
                        activator={<Button icon={<ChevronDown />} iconAlign="right"
                            onClick={() => {
                                // setOpen(!open)
                            }}
                            type="Outlined">More Actions</Button>}
                        onClose={() => {
                            // setOpen(!open)
                        }}
                        options={[
                            {
                                items: [
                                    {
                                        content: 'Action 1',
                                        id: 'ActionOne',
                                        onClick: function noRefCheck() { }
                                    },
                                    {
                                        content: 'Action 1',
                                        id: 'ActionTwo',
                                        onClick: function noRefCheck() { }
                                    },
                                    {
                                        content: 'Action 1',
                                        id: 'ActionThree',
                                        onClick: function noRefCheck() { }
                                    }
                                ]
                            }
                        ]}
                    />
                    <Button type="Primary">Bulk Upload</Button>
                </FlexLayout>}
            />
            <Card>
                <FlexLayout spacing='extraLoose' direction='vertical'>
                    <Alert
                        destroy
                        onClose={function noRefCheck() { }}
                        type="info"
                    >
                        Want to upload simple product(s)? <TextLink label="Learn More" />
                    </Alert>
                    <Tabs
                        alignment="horizontal"
                        onChange={function noRefCheck() { }}
                        selected="all"
                        value={[
                            {
                                content: 'All',
                                id: 'all',
                                badge: true,
                                badgeContent: '100',
                                badgeTextColor: 'light',
                                customBgColors: '#9984DB',
                            },
                            {
                                content: 'Not Uploaded',
                                id: 'not-uploaded',
                                badge: true,
                                badgeContent: '10',
                                customBgColors: '#FEE6AE',
                            },
                            {
                                content: 'In Progress',
                                id: 'in-progress',
                                badge: true,
                                badgeContent: '20',
                                badgeTextColor: 'light',
                                customBgColors: '#FF8277',
                            },
                            {
                                content: 'Live',
                                id: 'live',
                                badge: true,
                                badgeContent: '30',
                                badgeTextColor: 'light',
                                customBgColors: '#269E6C',
                            },
                            {
                                content: 'Pending',
                                id: 'pending',
                                badge: true,
                                badgeContent: '25',
                                customBgColors: '#FEC84B',
                            },
                            {
                                content: 'Failed',
                                id: 'failed',
                                badge: true,
                                badgeContent: '15',
                                badgeTextColor: 'light',
                                customBgColors: '#FF0000',
                            },
                            {
                                content: 'Seller Deactivated',
                                id: 'seller-deactivated',
                                badge: true,
                                badgeContent: '0',
                                customBgColors: '#B9BBC1',
                            },

                        ]}
                    >
                        <Card cardType='Bordered'>
                            <FlexLayout spacing='loose' direction='vertical'>
                                <FlexChild >
                                    <FlexLayout spacing='loose'>
                                        <AutoComplete
                                            clearButton
                                            clearFunction={function noRefCheck() { }}
                                            extraClass=""
                                            onChange={function noRefCheck() { }}
                                            onClick={function noRefCheck() { }}
                                            onEnter={function noRefCheck() { }}
                                            options={[]}
                                            placeHolder="Enter Title, ID or SKU"
                                            popoverContainer="body"
                                            popoverPosition="right"
                                            setHiglighted
                                            thickness="thin"
                                            value=""
                                        />
                                        <ActionList
                                            // open={open}
                                            activator={<Button thickness='thin' icon={<ChevronDown />} iconAlign="right"
                                                onClick={() => {
                                                    // setOpen(!open)
                                                }}
                                                type="Outlined">More Actions</Button>}
                                            onClose={() => {
                                                // setOpen(!open)
                                            }}
                                            options={[
                                                {
                                                    items: [
                                                        {
                                                            content: 'Action 1',
                                                            id: 'ActionOne',
                                                            onClick: function noRefCheck() { }
                                                        },
                                                        {
                                                            content: 'Action 1',
                                                            id: 'ActionTwo',
                                                            onClick: function noRefCheck() { }
                                                        },
                                                        {
                                                            content: 'Action 1',
                                                            id: 'ActionThree',
                                                            onClick: function noRefCheck() { }
                                                        }
                                                    ]
                                                }
                                            ]}
                                        />
                                        <AdvanceFilter
                                            button="More Filters"
                                            disableApply
                                            filters={[]}
                                            heading="Filter Heading"
                                            icon={<Filter color="#2a2a2a" size={16} />}
                                            onApply={function noRefCheck() { }}
                                            onClose={function noRefCheck() { }}
                                            type="Outlined"
                                        />
                                    </FlexLayout>
                                </FlexChild>
                                <Grid
                                    columns={columns}
                                    dataSource={data}
                                    rowSelection={{
                                        onChange: function noRefCheck() { }
                                    }}
                                />
                            </FlexLayout>
                        </Card>


                    </Tabs>
                </FlexLayout>

            </Card>
        </>
    )
}

export default Product