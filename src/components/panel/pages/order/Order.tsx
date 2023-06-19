import { Filter, AutoComplete, Button, Card, FlexChild, FlexLayout, Grid, Loader, PageHeader, Pagination, Select, Tabs, TextField, TextLink, Datepicker, Tag } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import moment from "moment"
import { makebadgeBgColorsForOrder, makeElement, makeIndividualQueryParamsOrder, makeTitleForOrderTag, makeTTSOrderID, makeURLForTabChangeForOrder, OrdersStatus } from './OrderUtility';
import { callApi } from '../../../../core/ApiMethods';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../../redux/ReduxSlice';
interface paginationObj {
    activePage: number
    countPerPage: number
}
function Order() {
    const columns = [
        {
            align: 'left',
            dataIndex: 'tts_order_id',
            key: 'tts_order_id',
            title: 'TTS Order ID',
            width: 240
        },
        {
            align: 'left',
            dataIndex: 'bigCommerce_order_id',
            key: 'bigCommerce_order_id',
            title: 'BigCommerce Order ID',
            width: 240
        },
        {
            align: 'left',
            dataIndex: 'customer_name',
            key: 'customer_name',
            title: "Customer Name",
            width: 240
        },
        {
            align: 'left',
            dataIndex: 'created_at',
            key: 'created_at',
            title: 'Created At',
            width: 200
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: 'Price',
            width: 200
        },
        {
            align: 'left',
            dataIndex: 'order_status',
            key: 'order_status',
            title: 'Order Status',
            width: 240
        },
    ]
    const [tab, setTab] = useState<string>("all")
    const [orders, setOrders] = useState<any>([]);
    const [orderTabsData, setOrderTabsData] = useState<any>([])
    const [totalOrder, setTotalOrder] = useState<number>(0)
    const [loader, setLoader] = useState<boolean>(true)
    const regex = /^\d*$/; // Regular expression to match only digits
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
    })
    const dispatch = useDispatch()
    const [filterState, setFilterState] = useState({
        fulfilledBy: '',
        createdAt: '',
        logisticMode: '',
        customerName: '',
        productName: '',
        tikTokProductId: '',
    });
    const [tag, setTag] = useState<any>([])
    const { activePage, countPerPage } = pagination;

    const { customerName, fulfilledBy, logisticMode, productName, tikTokProductId } = filterState


    useEffect(() => {
        getOrderStatus()
    }, [])

    useEffect(() => {
        makeOrderGrid(tab)
    }, [pagination, tab, tag])

    const handleFormChange = (value: string, name: string) => {
        setFilterState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const getOrderStatus = () => {
        callApi("GET", "tiktokhome/frontend/orderStatus", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    makeOrderStatusTabs(res.data)
                }
            })
    }

    const makeOrderStatusTabs = (data: any) => {
        const tabs = [
            { status: "All", id: "total" },
            { status: "Awaiting Shipment", id: "AWAITING_SHIPMENT" },
            { status: "Awaiting Collection", id: "AWAITING_COLLECTION" },
            { status: "In Transit", id: "IN_TRANSIT" },
            { status: "Delivered", id: "DELIVERED" },
            { status: "Completed", id: "COMPLETED" },
            { status: "Cancelled", id: "CANCELLED" },
        ];
        const customizedResponse = tabs.map((tab) => {
            if (tab.id === "total") {
                return { status: tab.status, count: data.total, id: "all" };
            }
            const matchingStatus = data.status.find((status: any) => status._id === tab.id);
            return { status: tab.status, count: matchingStatus ? matchingStatus.count : 0, id: tab.id };
        });
        const objectArray = customizedResponse.map((item: any) => {
            let badgeContent = item.count.toString();
            let customBgColors = makebadgeBgColorsForOrder(item.id);
            return {
                content: item.status,
                id: item.id,
                badge: true,
                badgeContent,
                customBgColors
            };
        });
        setOrderTabsData(objectArray)
    }

    const makeOrderGrid = (value: string) => {
        setLoader(true)
        const url = makeURLForTabChangeForOrder(value);
        function generateQueryString(data: any) {
            const strKeys = data.filter((obj: any) => typeof obj.title === 'string')
                .map((obj: any) => obj.str);

            return strKeys.join('');
        }
        const filterUrl = tag.length === 0 ? "" : generateQueryString(tag)
        callApi("GET", `connector/order/getAll?activePage=${activePage}&count=${countPerPage}&filter[object_type][1]=source_order${url}${filterUrl}`, {}, "extraHeader")
            .then((res: any) => {
                setLoader(false)
                if (res.success === true) {
                    const resData = res.data.rows
                    setTotalOrder(res.data.count)
                    let tempArr: any = []
                    resData.forEach((element: any) => {
                        let obj = {
                            tts_order_id: makeTTSOrderID(element.attributes, element.marketplace_reference_id),
                            bigCommerce_order_id: element.targets[0].marketplace === "bigcommerce" ?
                                element.cif_order_id : "N/A",
                            customer_name: element.customer.name,
                            created_at: moment(element.created_at).local().format("YYYY-MM-DD"),
                            order_status: <OrdersStatus marketplace_status={element.marketplace_status} status={element.targets[0]} />,
                            price: `${element.marketplace_currency} ${element.total.marketplace_price}`,
                            key: Math.random() * 91919191
                        }
                        tempArr.push(obj)
                        setOrders(tempArr)
                    })
                }
            })
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

    const FetchOrdersHandler = () => {
        callApi("POST", 'tiktokhome/order/Syncorder', {}, "extraHeader")
            .then((res: any) => {
                if (res.success === true) {
                    dispatch(showToast({
                        type: "success",
                        message: res.message
                    }))
                    getOrderStatus();
                    makeOrderGrid(tab)
                } else {
                    dispatch(showToast({
                        type: "error",
                        message: res.message
                    }))
                }
            })
    }


    const applyFilterHandler = () => {
        let tempArr: any = [];
        function getKeyByValue(object: any, value: any) {
            return Object.keys(object).find(key => object[key] === value);
        }
        Object.values(filterState)
            .forEach(element => {
                if (element !== '') {
                    const key: any = getKeyByValue(filterState, element);
                    let obj = {
                        title: makeTitleForOrderTag(key),
                        value: makeElement(element),
                        id: Math.floor(Math.random() * 9191919191),
                        str: makeIndividualQueryParamsOrder(key, filterState[key as keyof typeof filterState]),
                        key: key
                    }
                    tempArr.push(obj)
                }
            });
        setTag(tempArr)
    }
    const removeFilerHandler = (id: number, key: string) => {
        function removeItemById(arr: any, id: number) {
            return arr.filter((item: any) => item.id !== id);
        }
        console.log("Remove Filter", id, key)
        const updatedData = removeItemById(tag, id);
        setFilterState((prevState) => ({
            ...prevState,
            [key]: "",
        }));
        setTag(updatedData)
    }

    const resetAllfilter = () => {
        setTag([])
        setFilterState({
            createdAt: "",
            customerName: "",
            fulfilledBy: "",
            logisticMode: "",
            productName: "",
            tikTokProductId: ""
        })
    }
    return (
        <>
            <PageHeader title="Orders"
                description="Order List enables you to fetch orders from TikTok Shop instantly and create them on your store."
                action={
                    <Button onClick={FetchOrdersHandler} type="Primary">Fetch Orders</Button>
                }
            />
            <Card>
                <FlexLayout desktopWidth='100' tabWidth='100' mobileWidth='100' spacing='loose' direction='vertical'>
                    <Tabs
                        alignment="horizontal"
                        onChange={(e) => {
                            setTab(e)
                        }}
                        selected={tab}
                        value={orderTabsData}
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
                                            placeHolder="Enter Order ID"
                                            popoverContainer="body"
                                            popoverPosition="right"
                                            setHiglighted
                                            thickness="thin"
                                            value=""
                                        />
                                        <Filter
                                            button="Filters"
                                            disableApply={false}
                                            filters={[
                                                {
                                                    children: <>
                                                        <FlexLayout spacing='loose' direction='vertical'>
                                                            <Select
                                                                onChange={(e) => {
                                                                    handleFormChange(e, "fulfilledBy")
                                                                }}
                                                                onblur={function noRefCheck() { }}
                                                                options={[
                                                                    {
                                                                        label: "Managed by Merchant",
                                                                        value: "0"
                                                                    },
                                                                    {
                                                                        label: "Managed by TikTok Shop",
                                                                        value: "1"
                                                                    }
                                                                ]}
                                                                value={fulfilledBy}
                                                                placeholder='Select'
                                                                thickness='thin'
                                                                popoverContainer='element'
                                                            />
                                                            <Button
                                                                onClick={() => {
                                                                    setFilterState({
                                                                        ...filterState,
                                                                        fulfilledBy: ""
                                                                    })
                                                                }}
                                                                disable={fulfilledBy === "" ? true : false}
                                                                thickness="extraThin" type='Danger'>
                                                                Clear
                                                            </Button>
                                                        </FlexLayout>
                                                    </>,
                                                    name: "Fulfilled By"
                                                },
                                                {
                                                    children: <>
                                                        <Datepicker
                                                            format="YYYY-MM-DD"
                                                            onChange={(e: any) => {
                                                                setFilterState({
                                                                    ...filterState,
                                                                    createdAt: moment(e).format("YYYY-MM-DD")
                                                                })
                                                            }}
                                                            picker="date"
                                                            placeholder="Select Date"
                                                            placement="bottomLeft"
                                                            showToday
                                                            thickness="thick"
                                                        />
                                                    </>,
                                                    name: "Created At"
                                                },
                                                {
                                                    children: <>
                                                        <FlexLayout spacing='loose' direction='vertical'>
                                                            <Select
                                                                onChange={(e) => {
                                                                    handleFormChange(e, "logisticMode")
                                                                }}
                                                                onblur={function noRefCheck() { }}
                                                                options={[
                                                                    {
                                                                        label: "Standard Shipping",
                                                                        value: "STANDARD"
                                                                    },
                                                                    {
                                                                        label: "Shipped By Seller",
                                                                        value: "SEND_BY_SELLER"
                                                                    }
                                                                ]}
                                                                value={logisticMode}
                                                                placeholder='Select'
                                                                thickness='thin'
                                                                popoverContainer='element'
                                                            />
                                                            <Button
                                                                onClick={() => {
                                                                    setFilterState({
                                                                        ...filterState,
                                                                        logisticMode: ""
                                                                    })
                                                                }}
                                                                disable={logisticMode === "" ? true : false}
                                                                thickness="extraThin" type='Danger'>
                                                                Clear
                                                            </Button>
                                                        </FlexLayout>
                                                    </>,
                                                    name: "Logistic Mode"
                                                },
                                                {
                                                    children: <>
                                                        <TextField
                                                            autocomplete="off"
                                                            onChange={(e) => {
                                                                handleFormChange(e, "customerName")
                                                            }}
                                                            placeHolder="Enter Customer Name"
                                                            type="text"
                                                            value={customerName}
                                                        />
                                                    </>,
                                                    name: "Customer Name"
                                                },
                                                {
                                                    children: <>
                                                        <TextField
                                                            autocomplete="off"
                                                            onChange={(e) => {
                                                                handleFormChange(e, "productName")
                                                            }}
                                                            placeHolder="Enter Product Name"
                                                            type="text"
                                                            value={productName}
                                                        />
                                                    </>,
                                                    name: "Product Name"
                                                },
                                                {
                                                    children: <>
                                                        <TextField
                                                            autocomplete="off"
                                                            onChange={(e) => {
                                                                if (regex.test(e) || e === '') {
                                                                    handleFormChange(e, "tikTokProductId")
                                                                }
                                                            }}
                                                            placeHolder="Enter Product Id"
                                                            type="text"
                                                            value={tikTokProductId}
                                                        />
                                                    </>,
                                                    name: "TikTok Product Id"
                                                },
                                            ]}
                                            heading="Filters"
                                            icon={<FileText color="#2a2a2a" size={16} />}
                                            onApply={applyFilterHandler}
                                            resetFilter={() => {
                                                resetAllfilter()
                                            }}
                                            disableReset={false}
                                            type="Outlined"
                                        />
                                    </FlexLayout>
                                </FlexChild>
                                <FlexChild>
                                    <>
                                        <FlexLayout spacing='loose'>
                                            {
                                                tag.length !== 0 ?
                                                    tag.map((val: any, index: number) => (
                                                        <Tag key={index} destroy={() => removeFilerHandler(val.id, val.key)}>
                                                            {val.title} : {val.value}
                                                        </Tag>
                                                    ))

                                                    : null
                                            }
                                            {
                                                tag.length !== 0 ?
                                                    <Button
                                                        onClick={() => {
                                                            resetAllfilter()
                                                        }}
                                                        type='Outlined'
                                                        thickness='extraThin'>
                                                        Clear all filter
                                                    </Button> : null
                                            }

                                        </FlexLayout>

                                    </>
                                </FlexChild>
                                {loader === true ?
                                    <Loader type='Loader1' />
                                    :
                                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                                        <>
                                            <Grid
                                                columns={columns}
                                                dataSource={orders}
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
                                                totalitem={totalOrder}
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
                                }

                            </FlexLayout>
                        </Card>
                    </Tabs>
                </FlexLayout>
            </Card>
        </>
    )
}

export default Order