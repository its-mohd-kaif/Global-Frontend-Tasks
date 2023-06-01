import { ActionList, AdvanceFilter, Alert, AutoComplete, Button, Card, CheckBox, FlexChild, FlexLayout, FormElement, Grid, Image, Modal, PageHeader, Pagination, Popover, Radio, Select, Tabs, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, ChevronDown, Filter } from "react-feather"
import { ProductData } from "./ProductData";
import productFallbackImg from "../../../../assets/images/png/productFallBack.png"
import { ProductGridTitle, ProductsActions, ProductsStatus, ProductsTitle } from './ProductUtility';
interface paginationObj {
    activePage: number
    countPerPage: number
    start: number
    end: number
}
function Product() {
    // const [open, setOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<any>([])
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
        start: 0,
        end: 5,
    })
    const [allData, setAllData] = useState<any>([])
    const [bulkModal, setBulkModal] = useState<boolean>(false)
    const [openExtraColumn, setOpenExtraColumn] = useState<boolean>(false)
    const columns = [
        {
            align: 'left',
            fixed: 'left',
            dataIndex: 'image',
            key: 'image',
            title: 'Image',
            width: 60
        },
        {
            align: 'left',
            fixed: 'left',
            dataIndex: 'title',
            key: 'title',
            title: <ProductGridTitle title="Title" />,
            width: 224
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: <ProductGridTitle title="Price" />,
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'quantity',
            key: 'quantity',
            title: <ProductGridTitle title="Quantity" />,
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            title: 'Status',
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'activity',
            key: 'activity',
            title: 'Activity',
            width: 150
        },
        {
            align: 'left',
            fixed: 'right',
            dataIndex: 'actions',
            key: 'actions',
            title: 'Actions',
            width: 60
        }
    ]
    const { activePage, countPerPage, start, end } = pagination;
    useEffect(() => {
        const dataRes = ProductData.data.rows
        setAllData(dataRes)
        console.log(dataRes)
        let tempArr: any = []
        dataRes.forEach((element: any) => {
            let obj = {
                id: element._id,
                title: ProductsTitle(element.title, element.sku),
                image: < Image
                    fit="cover"
                    height={60}
                    radius="corner-radius"
                    src={element.main_image !== "" ? element.main_image : productFallbackImg}
                    width={60}
                />,
                price: `$${element.price}`,
                quantity: `${element.quantity} in Stock`,
                status: <ProductsStatus status={element.source_status} />,
                activity: <TextStyles utility='product-activity' textcolor='light'>No Ongoing Activity</TextStyles>,
                actions: <ProductsActions id={element._id} />,
                key: Math.random() * 91919191
            }
            tempArr.push(obj)
        })
        setAllData(tempArr)
        setProducts(tempArr.slice(start, end))
    }, [start, end])
    /**
    * on count change pagination handler
    * @param val user select from grid 
    */
    const countChangeHandler = (val: any) => {
        let newGrid = allData.slice(0, val)
        setPagination({
            ...pagination,
            countPerPage: val
        })
        setProducts(newGrid)
    }
    /**
    * next page handler
    */
    const nextPageHandler = () => {

        let start = countPerPage * activePage;
        let end = countPerPage * activePage + countPerPage;
        setPagination({
            ...pagination,
            activePage: activePage + 1,
            start: start,
            end: end
        })
    }
    /**
    * prev page handler function
     */
    const prevPageHandler = () => {
        //for delay active state value we more decrement value by one
        let start = countPerPage * (activePage - 1) - countPerPage;
        let end = countPerPage * (activePage - 1);
        setPagination({
            ...pagination,
            activePage: activePage - 1,
            start: start,
            end: end
        })
    }
    /**
   * on enter change handler
   * @param val user press on grid
   */
    const onEnterChange = (val: number) => {
        let start = countPerPage * val - countPerPage;
        let end = countPerPage * val;
        setPagination({
            ...pagination,
            activePage: val,
            start: start,
            end: end
        })
    }
    return (
        <>
            <PageHeader
                title="Product Listing"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <ActionList
                            activator={<Button icon={<ChevronDown />} iconAlign="right"
                                onClick={() => {
                                }}
                                type="Outlined">More Actions</Button>}
                            onClose={() => {
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
                        <Button onClick={() => {
                            setBulkModal(!bulkModal)
                        }} type="Primary">Bulk Upload</Button>
                    </FlexLayout>
                }
            />
            <Card>
                {/* Bulk Upload Modal */}
                <Modal
                    close={() => {
                        setBulkModal(!bulkModal)
                    }}
                    heading="Upload Products"
                    modalSize="small"
                    primaryAction={{
                        content: 'Upload Products',
                        loading: false,
                        onClick: function noRefCheck() { }
                    }}
                    open={bulkModal}>
                    Are you sure you want to upload selected products?
                </Modal>
                <FlexLayout spacing='extraLoose' direction='vertical'>
                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                        <Alert
                            destroy
                            onClose={function noRefCheck() { }}
                            type="info"
                        >
                            Want to upload simple product(s)? <TextLink label="Learn More" />
                        </Alert>
                    </FlexChild>
                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
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
                                            <Popover
                                                activator={<Button thickness='thin' icon={<ChevronDown />} iconAlign="right"
                                                    onClick={() => {
                                                        setOpenExtraColumn(!openExtraColumn)
                                                    }}
                                                    type="Outlined">Customize Grid</Button>} open={openExtraColumn}                                       >
                                                <FlexLayout spacing='loose' direction='vertical'>
                                                    <CheckBox
                                                        id="two"
                                                        checked={false}
                                                        labelVal="ID"
                                                        name="ID"
                                                        onClick={() => { }}
                                                    />
                                                    <CheckBox
                                                        id="two"
                                                        checked={false}
                                                        labelVal="Price"
                                                        name="Price"
                                                        onClick={() => { }}
                                                    />
                                                    <CheckBox
                                                        id="two"
                                                        checked={false}
                                                        labelVal="Quantity"
                                                        name="Quantity"
                                                        onClick={() => { }}
                                                    />
                                                    <CheckBox
                                                        id="two"
                                                        checked={false}
                                                        labelVal="SKU"
                                                        name="SKU"
                                                        onClick={() => { }}
                                                    />
                                                    <CheckBox
                                                        id="two"
                                                        checked={false}
                                                        labelVal="Category"
                                                        name="Category"
                                                        onClick={() => { }}
                                                    />
                                                    <CheckBox
                                                        id="two"
                                                        checked={false}
                                                        labelVal="Status"
                                                        name="Status"
                                                        onClick={() => { }}
                                                    />
                                                </FlexLayout>
                                            </Popover>
                                            <AdvanceFilter
                                                button="Filters"
                                                disableApply
                                                filters={[
                                                    {
                                                        children: <>
                                                            <FormElement>
                                                                <Radio
                                                                    checked
                                                                    id="0"
                                                                    labelVal="Simple"
                                                                    name="2"
                                                                    onClick={function noRefCheck() { }}
                                                                    value={0}
                                                                />
                                                                <Radio
                                                                    id="1"
                                                                    labelVal="Variant"
                                                                    name="2"
                                                                    onClick={function noRefCheck() { }}
                                                                    value={0}
                                                                />
                                                                <Radio
                                                                    id="2"
                                                                    labelVal="None of the above"
                                                                    name="2"
                                                                    onClick={function noRefCheck() { }}
                                                                    value={0}
                                                                />
                                                            </FormElement>
                                                        </>,
                                                        name: 'Listing Type'
                                                    },
                                                    {
                                                        children: <>
                                                            <Select
                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                onChange={function noRefCheck() { }}
                                                                onblur={function noRefCheck() { }}
                                                                options={[
                                                                    {
                                                                        label: 'Default',
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
                                                                value=""
                                                            />
                                                        </>,
                                                        name: "Template"
                                                    },
                                                    {
                                                        children: <>
                                                            <FlexLayout direction='vertical' spacing='tight'>
                                                                <TextField
                                                                    autocomplete="off"
                                                                    name="Minimum Quantity"
                                                                    onChange={function noRefCheck() { }}
                                                                    placeHolder="Enter Quantity"
                                                                    type="text"
                                                                />
                                                                <TextField
                                                                    autocomplete="off"
                                                                    name="Maximum Quantity"
                                                                    onChange={function noRefCheck() { }}
                                                                    placeHolder="Enter Quantity"
                                                                    type="text"
                                                                />
                                                            </FlexLayout>
                                                        </>,
                                                        name: "Quantity"
                                                    },
                                                    {
                                                        children: <>
                                                            <FlexLayout direction='vertical' spacing='tight'>
                                                                <TextField
                                                                    autocomplete="off"
                                                                    name="Minimum Price"
                                                                    onChange={function noRefCheck() { }}
                                                                    placeHolder="Enter Price"
                                                                    type="text"
                                                                />
                                                                <TextField
                                                                    autocomplete="off"
                                                                    name="Maximum Price"
                                                                    onChange={function noRefCheck() { }}
                                                                    placeHolder="Enter Price"
                                                                    type="text"
                                                                />
                                                            </FlexLayout>
                                                        </>,
                                                        name: "Price"
                                                    },
                                                    {
                                                        children: <>
                                                            <Select
                                                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                                onChange={function noRefCheck() { }}
                                                                onblur={function noRefCheck() { }}
                                                                options={[
                                                                    {
                                                                        label: 'Boots',
                                                                        value: '0'
                                                                    },
                                                                    {
                                                                        label: 'Sandals',
                                                                        value: '1'
                                                                    },
                                                                    {
                                                                        label: 'Sneaker',
                                                                        value: '1'
                                                                    },
                                                                    {
                                                                        label: 'Sports Shoes',
                                                                        value: '1'
                                                                    },
                                                                ]}
                                                                searchEable
                                                                value=""
                                                            />
                                                        </>,
                                                        name: "Category"
                                                    },
                                                    {
                                                        children: <>
                                                            <TextField
                                                                autocomplete="off"
                                                                onChange={function noRefCheck() { }}
                                                                placeHolder="Enter Barcode"
                                                                type="text"
                                                            />

                                                        </>,
                                                        name: "Barcode"
                                                    },
                                                ]}
                                                heading="Filter Heading"
                                                icon={<Filter color="#2a2a2a" size={16} />}
                                                onApply={function noRefCheck() { }}
                                                onClose={function noRefCheck() { }}
                                                type="Outlined"
                                            />
                                        </FlexLayout>
                                    </FlexChild>
                                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                                        <>
                                            <Grid
                                                columns={columns}
                                                dataSource={products}
                                                rowSelection={{
                                                    onChange: function noRefCheck() { }
                                                }}
                                                scrollX={970}
                                            />
                                            <br></br>
                                            <Pagination
                                                countPerPage={countPerPage}
                                                currentPage={activePage}
                                                onCountChange={(e: any) => countChangeHandler(e)}
                                                onEnter={(e: any) => onEnterChange(e)}
                                                onNext={nextPageHandler}
                                                onPrevious={prevPageHandler}
                                                totalitem={allData.length}
                                                optionPerPage={[
                                                    {
                                                        label: '5',
                                                        value: '5'
                                                    },
                                                    {
                                                        label: '10',
                                                        value: '10'
                                                    },
                                                    {
                                                        label: '15',
                                                        value: '15'
                                                    },
                                                ]}
                                            />
                                        </>
                                    </FlexChild>
                                </FlexLayout>
                            </Card>
                        </Tabs>
                    </FlexChild>

                </FlexLayout>

            </Card>
        </>
    )
}

export default Product