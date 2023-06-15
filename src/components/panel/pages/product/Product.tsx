import { ActionList, AdvanceFilter, Alert, AutoComplete, Button, Card, CheckBox, FlexChild, FlexLayout, FormElement, Grid, Image, Modal, PageHeader, Pagination, Popover, Radio, Select, Tabs, TextField, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, ChevronDown, Filter } from "react-feather"
import productFallbackImg from "../../../../assets/images/png/productFallBack.png"
import { ExpandableGrid, GetRange, ProductGridTitle, ProductsActions, ProductsStatus, ProductsTitle } from './ProductUtility';
import { callApi } from '../../../../core/ApiMethods';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../../redux/ReduxSlice';
interface paginationObj {
    activePage: number
    countPerPage: number
}
interface bulkStateObj {
    chooseCategoryTemplate: string;
    chooseTikTokWarehouse: string;
    profile_id: string;
    warehouse_id: string;
}
function Product() {
    const [products, setProducts] = useState<any>([])
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
    })
    const [bulkModal, setBulkModal] = useState<boolean>(false)
    const [openExtraColumn, setOpenExtraColumn] = useState<boolean>(false);
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [expandedRows, setExpandedRows] = useState<any>([]);
    const [bulkState, setBulkState] = useState<bulkStateObj>({
        chooseCategoryTemplate: "",
        profile_id: "",
        chooseTikTokWarehouse: "",
        warehouse_id: ""
    })
    const redux = useSelector((redux: any) => redux.redux.connectorGetAllState.data?.tiktok.installed[0].warehouses)
    const dispatch = useDispatch()
    const [categoryOptions, setCategoryOptions] = useState<any>([]);
    const [warehouse, setWarehouse] = useState<any>([]);
    const columns = [
        {
            align: 'left',
            dataIndex: 'image',
            key: 'image',
            title: 'Image',
            width: 60
        },
        {
            align: 'left',
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
            fixed: 'right',
            dataIndex: 'actions',
            key: 'actions',
            title: 'Actions',
            width: 50
        }
    ]
    const childColumns = [
        {
            align: 'left',
            dataIndex: 'image',
            key: 'image',
            title: 'Image',
            width: 60
        },
        {
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            title: "Title",
            width: 224
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: "Price",
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'quantity',
            key: 'quantity',
            title: "Quantity",
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            title: 'Status',
            width: 60
        }
    ]
    const { activePage, countPerPage, } = pagination;
    const { chooseCategoryTemplate, profile_id, chooseTikTokWarehouse, warehouse_id } = bulkState;

    useEffect(() => {
        callApi("GET", "connector/product/getRefineProductCount?activePage=1&count=10", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    setTotalProducts(res.data.count)

                }
            })
        callApi("GET", "connector/profile/getProfileData?count=100", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    makeCategoryOptions(res.data.rows)
                }
            })
    }, [])


    useEffect(() => {
        getRefineProduct()
    }, [pagination])

    const makeTiktokWarehouseOptions = (data: any) => {
        let tempArr: any = []
        data.forEach((element: any) => {
            let obj = {
                label: element.warehouse_name,
                value: element.warehouse_name,
                id: element.warehouse_id,
            }
            tempArr.push(obj)
        });
        setWarehouse(tempArr)
    }

    const makeCategoryOptions = (data: any) => {
        console.log("data", data)
        let tempArr: any = []
        data.forEach((element: any) => {
            let count = 0
            if (element?.product_count[0]?.count !== undefined) {
                count = element.product_count[0].count
            } else if (element?.total_count !== undefined) {
                count = element.total_count
            }
            let obj = {
                label: element.name,
                value: count,
                id: element._id.$oid
            }
            tempArr.push(obj)
        });
        setCategoryOptions(tempArr)
    }

    const getRefineProduct = () => {
        callApi("GET", `connector/product/getRefineProducts?activePage=${activePage}&count=${countPerPage}`, {}, "extraHeaders")
            .then((res: any) => {
                const dataRes = res.data.rows
                let tempArr: any = []
                dataRes.forEach((element: any) => {
                    let obj = {
                        id: element._id,
                        title: ProductsTitle(element.items),
                        image: < Image
                            fit="cover"
                            height={60}
                            radius="corner-radius"
                            src={element.main_image !== "" ? element.main_image : productFallbackImg}
                            width={60}
                        />,
                        price: element.items.length === 1 && element.items[0].hasOwnProperty("price") === false ? "N/A"
                            : GetRange(element.items, "price"),
                        quantity: element.items.length === 1 && element.items[0].hasOwnProperty("quantity") === false ? "N/A"
                            : GetRange(element.items, "quantity"),
                        status: <ProductsStatus status={element.items[0]} />,
                        actions: <ProductsActions id={element._id} />,
                        key: Math.random() * 91919191,
                        childrenRow: element.items.length > 1 ? makeChildrenData(element.items) : undefined
                    }
                    tempArr.push(obj)
                })
                setProducts(tempArr)
            })
    }

    const makeChildrenData = (data: any) => {
        let tempArr: any = []
        data.slice(1).forEach((element: any) => {
            let obj = {
                title: element.title,
                image: < Image
                    fit="cover"
                    height={60}
                    radius="corner-radius"
                    src={element.main_image !== "" ? element.main_image : productFallbackImg}
                    width={60}
                />,
                price: `INR ${element.price}`,
                quantity: element.quantity,
                status: <ProductsStatus status={element} />,
                key: Math.random() * 91919191,
            }
            tempArr.push(obj)
        })
        return tempArr
    }
    /**
    * on count change pagination handler
    * @param val user select from grid 
    */
    const countChangeHandler = (val: any) => {
        setPagination({
            ...pagination,
            countPerPage: val
        })
    }
    /**
    * next page handler
    */
    const nextPageHandler = () => {
        setPagination({
            ...pagination,
            activePage: activePage + 1,
        })
    }
    /**
    * prev page handler function
     */
    const prevPageHandler = () => {
        setPagination({
            ...pagination,
            activePage: activePage - 1,
        })
    }
    /**
   * on enter change handler
   * @param val user press on grid
   */
    const onEnterChange = (val: number) => {
        setPagination({
            ...pagination,
            activePage: val,
        })
    }

    const bulkUploadHandler = () => {
        console.log("state", bulkState);
        let obj = {}
        if (profile_id === "") {
            obj = {
                "source": "bigcommerce",
                "target": "tiktok",
                "warehouse_id": warehouse_id,
                "create_notification": false,
                "marketplace": "tiktok",
                "filter": {
                    "profile.profile_id": {
                        "12": "0"
                    }
                }
            }
        } else {
            obj = {
                "source": "bigcommerce",
                "target": "tiktok",
                "warehouse_id": warehouse_id,
                "create_notification": false,
                "marketplace": "tiktok",
                "profile_id": profile_id
            }
        }
        callApi("POST", "connector/product/upload", obj, "extraHeaders")
            .then((res: any) => {
                console.log("upload", res)
                if (res.success === true) {
                    dispatch(showToast({
                        type: "success",
                        message: res.message
                    }))
                } else {
                    dispatch(showToast({
                        type: "error",
                        message: res.message
                    }))
                }
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
                            makeTiktokWarehouseOptions(redux)
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
                    heading="Select a category template to upload product(s) to TikTok Shop."
                    modalSize="large"
                    primaryAction={{
                        content: 'Upload',
                        loading: false,
                        onClick: bulkUploadHandler,
                        disable: chooseTikTokWarehouse !== "" ? false : true
                    }}
                    open={bulkModal}>
                    <FlexLayout direction='vertical' spacing='extraLoose'>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <FlexLayout spacing='extraTight'>
                                    <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Category Template</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                {categoryOptions.length === 0 ?
                                    <TextStyles>
                                        No Category Template(s) Found
                                    </TextStyles>
                                    :
                                    <Select
                                        onChange={(e, event: any) => {
                                            setBulkState({
                                                ...bulkState,
                                                chooseCategoryTemplate: e,
                                                profile_id: event.id
                                            })
                                        }}
                                        onblur={function noRefCheck() { }}
                                        options={categoryOptions}
                                        value={chooseCategoryTemplate}
                                        placeholder='Select'
                                        searchEable
                                        popoverContainer='element'
                                    />
                                }

                            </FlexChild>
                        </FlexLayout>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <FlexLayout spacing='extraTight'>
                                    <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>TikTok Shop Warehouse</TextStyles>
                                    <TextStyles textcolor="negative">*</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                <Select
                                    onChange={(e, event: any) => {
                                        setBulkState({
                                            ...bulkState,
                                            chooseTikTokWarehouse: e,
                                            warehouse_id: event.id
                                        })
                                    }}
                                    onblur={function noRefCheck() { }}
                                    options={warehouse}
                                    value={chooseTikTokWarehouse}
                                    placeholder='Select'
                                    searchEable
                                    popoverContainer='element'
                                />
                            </FlexChild>
                        </FlexLayout>
                        <FlexChild>
                            <TextStyles content={`Are you sure you want to upload  ${chooseCategoryTemplate} Product(s) ?`} />
                        </FlexChild>
                    </FlexLayout>
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
                                                expandable={{
                                                    showExpandColumn: true,
                                                    rowExpandable: (record: any) => {
                                                        return record['childrenRow'];
                                                    },
                                                    expandedRowKeys: [...expandedRows],
                                                    expandedRowRender: (record: any) => {
                                                        return (
                                                            <Grid
                                                                tableLayout="auto"
                                                                size="middle"
                                                                scrollX={1400}
                                                                columns={childColumns}
                                                                dataSource={record['childrenRow']}
                                                            />
                                                        );
                                                    },
                                                    onExpand: (expanded: any, record: any) => {
                                                        if (expanded) {
                                                            setExpandedRows([...expandedRows, record.key]);
                                                        } else {
                                                            const tempRows = [...expandedRows];
                                                            tempRows.forEach((item, index) => {
                                                                if (item === record.key) {
                                                                    tempRows.splice(index, 1);
                                                                }
                                                            });
                                                            setExpandedRows(tempRows);
                                                        }
                                                    },
                                                }}
                                                scrollX={1400}
                                            />
                                            <br></br>
                                            <Pagination
                                                countPerPage={countPerPage}
                                                currentPage={activePage}
                                                onCountChange={(e: any) => countChangeHandler(e)}
                                                onEnter={(e: any) => onEnterChange(e)}
                                                onNext={nextPageHandler}
                                                onPrevious={prevPageHandler}
                                                totalitem={totalProducts}
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