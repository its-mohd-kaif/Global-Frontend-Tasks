import { AdvanceFilter, AutoComplete, Button, Card, FlexChild, FlexLayout, FormElement, Grid, PageHeader, Pagination, Radio, Select, Tabs, TextField, TextLink } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, Filter } from "react-feather"
import { OrderData } from './OrderData';
import moment from "moment"
import { OrdersStatus } from './OrderUtility';
interface paginationObj {
    activePage: number
    countPerPage: number
    start: number
    end: number
}
function Order() {
    const columns = [
        {
            align: 'left',
            dataIndex: 'target_order_id',
            key: 'target_order_id',
            title: 'Target Order ID',
            width: 140
        },
        {
            align: 'left',
            dataIndex: 'source_order_id',
            key: 'source_order_id',
            title: 'Source Order Id',
            width: 140
        },
        {
            align: 'left',
            dataIndex: 'full_name',
            key: 'full_name',
            title: "Full Name",
            width: 140
        },
        {
            align: 'left',
            dataIndex: 'date',
            key: 'date',
            title: 'Date',
            width: 140
        },
        {
            align: 'left',
            dataIndex: 'order_status',
            key: 'order_status',
            title: 'Order Status',
            width: 140
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: 'Price',
            width: 140
        },
        {
            align: 'center',
            dataIndex: 'inventory',
            key: 'inventory',
            title: 'Inventory',
            width: 140
        }
    ]
    const [allData, setAllData] = useState<any>([]);
    const [orders, setOrders] = useState<any>([]);
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
        start: 0,
        end: 5,
    })
    const { activePage, countPerPage, start, end } = pagination;
    useEffect(() => {
        const resData = OrderData.data.rows
        console.log(resData)
        let tempArr: any = []
        resData.forEach((element: any) => {
            console.log(element.targets[0].shop_id)
            let obj = {
                target_order_id: <TextLink label={element.targets[0].shop_id} />,
                source_order_id: <TextLink label={element.shop_id} />,
                full_name: element.customer.name,
                date: moment(element.created_at).format("YYYY-MM-DD"),
                order_status: <OrdersStatus status={element.status} />,
                price: `$${element.sub_total.price}`,
                inventory: 25
            }
            tempArr.push(obj)
            setAllData(tempArr)
            setOrders(tempArr.slice(start, end))
        })
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
        setOrders(newGrid)
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
            <PageHeader title="Order Listing"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <Button onClick={() => {
                        }} type="Primary">Fetch Order</Button>
                    </FlexLayout>
                }
            />
            <Card>
                <FlexLayout desktopWidth='100' tabWidth='100' mobileWidth='100' spacing='loose' direction='vertical'>
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
                                content: 'Completed',
                                id: 'completed',
                                badge: true,
                                badgeContent: '30',
                                badgeTextColor: 'light',
                                customBgColors: '#269E6C',
                            },
                            {
                                content: 'Fulfilled',
                                id: 'fulfilled',
                                badge: true,
                                badgeContent: '20',
                                customBgColors: '#AEE9D1',
                            },
                            {
                                content: 'Refunded',
                                id: 'refunded',
                                badge: true,
                                badgeContent: '10',
                                customBgColors: '#FEE6AE',
                            },
                            {
                                content: 'Pending',
                                id: 'pending',
                                badge: true,
                                badgeContent: '25',
                                customBgColors: '#FEC84B',
                            },
                            {
                                content: 'Ready To Ship',
                                id: 'ready-to-ship',
                                badge: true,
                                badgeContent: '0',
                                customBgColors: '#B9BBC1',
                            },
                            {
                                content: 'Cancelled',
                                id: 'cancelled',
                                badge: true,
                                badgeContent: '15',
                                badgeTextColor: 'light',
                                customBgColors: '#FF0000',
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
                                            placeHolder="Enter Order ID"
                                            popoverContainer="body"
                                            popoverPosition="right"
                                            setHiglighted
                                            thickness="thin"
                                            value=""
                                        />
                                        <AdvanceFilter
                                            button="Filters"
                                            disableApply
                                            filters={[
                                                {
                                                    children: <>
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
                                                    </>,
                                                    name: "Date"
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
                                            ]}
                                            heading="Filters"
                                            icon={<Filter color="#2a2a2a" size={16} />}
                                            onApply={function noRefCheck() { }}
                                            onClose={function noRefCheck() { }}
                                            type="Outlined"
                                        />
                                    </FlexLayout>
                                </FlexChild>
                                <Grid
                                    columns={columns}
                                    dataSource={orders}
                                />
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
                            </FlexLayout>
                        </Card>
                    </Tabs>
                </FlexLayout>
            </Card>
        </>
    )
}

export default Order