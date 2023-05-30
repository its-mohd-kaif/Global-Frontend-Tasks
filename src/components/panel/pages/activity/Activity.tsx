import { Button, Card, FlexChild, FlexLayout, PageHeader, Progressbar, TextStyles, Notification, Pagination, Modal } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import { NotificationData } from './ActivityUtility';
interface paginationObj {
    activePage: number
    countPerPage: number
    start: number
    end: number
}
function Activity() {
    const [notification, setNotification] = useState<any>([]);
    const [allData, setAllData] = useState<any>([])
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
        start: 0,
        end: 5,
    })
    const { activePage, countPerPage, start, end } = pagination;
    const [openModal, setOpenModal] = useState<boolean>(false)
    useEffect(() => {
        setAllData(NotificationData)
        setNotification(NotificationData.slice(start, end))
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
        setNotification(newGrid)
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
                title="Activitie(s)"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText
                            size={"18"} />} type="Outlined">Guide</Button>
                        <Button onClick={() => {
                            setOpenModal(!openModal)
                        }} type="Primary">Clear Activities</Button>
                    </FlexLayout>
                }
            />
            <FlexLayout spacing='loose' direction='vertical'>
                <Card title={"Ongoing Activities"}>
                    <FlexLayout spacing='loose' direction='vertical'>
                        <FlexChild>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold'>Select and upload initiated</TextStyles>
                                <TextStyles textcolor='light'>Mon, 13 Feb 2023 10:21:53 GMT</TextStyles>
                                <Progressbar
                                    percentage={10}
                                    progessThickness="thin"
                                />
                            </FlexLayout>
                        </FlexChild>
                        <FlexChild>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold'>Select and upload initiated</TextStyles>
                                <TextStyles textcolor='light'>Mon, 13 Feb 2023 10:21:53 GMT</TextStyles>
                                <Progressbar
                                    percentage={70}
                                    progessThickness="thin"
                                />
                            </FlexLayout>
                        </FlexChild>
                        <FlexChild>
                            <FlexLayout spacing='tight' direction='vertical'>
                                <TextStyles fontweight='bold'>Select and upload initiated</TextStyles>
                                <TextStyles textcolor='light'>Mon, 13 Feb 2023 10:21:53 GMT</TextStyles>
                                <Progressbar
                                    percentage={0}
                                    progessThickness="thin"
                                />
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </Card>
                <Card title={"Completed Activities"}>
                    <FlexLayout spacing='loose' direction='vertical'>
                        <FlexChild>
                            {
                                notification.map((val: any, index: number) => (
                                    <Notification
                                        key={index}
                                        destroy={false}
                                        onClose={function noRefCheck() { }}
                                        subdesciption={val.time}
                                        type="success"
                                    >
                                        {val.name}
                                    </Notification>
                                ))
                            }
                        </FlexChild>
                        <FlexChild>
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
                        </FlexChild>
                    </FlexLayout>


                </Card>
            </FlexLayout>
            <Modal
                close={() => { setOpenModal(!openModal) }}
                heading="Clear all notifications"
                modalSize="small"
                primaryAction={{
                    content: 'Clear',
                    type:"Danger",
                    loading: false,
                    onClick: () => { setOpenModal(!openModal) }
                }}
                secondaryAction={{
                    content: 'Cancel',
                    loading: false,
                    onClick: () => { setOpenModal(!openModal) }
                }} open={openModal}>
                Are you sure you want to abort the process?
            </Modal>
        </>
    )
}

export default Activity