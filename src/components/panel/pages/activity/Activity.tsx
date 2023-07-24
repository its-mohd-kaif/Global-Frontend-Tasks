import { Button, Card, FlexChild, FlexLayout, PageHeader, Progressbar, TextStyles, Notification, Pagination, Modal, FallBack, Skeleton } from '@cedcommerce/ounce-ui'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import NoNotificationSvg from '../../../../assets/images/svg/NoNotificationSvg';
import { callApi } from '../../../../core/ApiMethods';
import { NotificationData } from './ActivityUtility';
interface paginationObj {
    activePage: number
    countPerPage: number
}
function Activity() {
    const [notification, setNotification] = useState<any>(null);
    const [allData, setAllData] = useState<any>([]);
    const [state, setState] = useState({
        ongoingMessage: "",
        ongoingProgress: 0
    })
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 10,
    })
    const [loader, setLoader] = useState<boolean>(true)
    const { activePage, countPerPage } = pagination;
    const { ongoingMessage, ongoingProgress } = state
    const [openModal, setOpenModal] = useState<boolean>(false)
    useEffect(() => {
        setLoader(true)
        callApi("GET", "connector/get/allQueuedTasks", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    setState({
                        ongoingMessage: res.data.rows[0]?.message,
                        ongoingProgress: res.data.rows[0]?.progress
                    })
                }
            })

        callApi("GET", `connector/get/allNotifications?activePage=${activePage}&count=${countPerPage}`, {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    setLoader(false)
                    makeNotification(res.data.rows)
                }
            })
        setAllData(NotificationData)
    }, [pagination])
    const makeNotification = (data: any) => {
        let tempArr: any = []
        data.forEach((element: any) => {
            let obj = {
                message: element.message,
                severity: element.severity,
                created_at: moment(element.created_at).format('ddd MMM D YYYY h:mm A')
            }
            tempArr.push(obj)
        });
        setNotification(tempArr)
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
                                <TextStyles fontweight='bold' content={ongoingMessage} />
                                <Progressbar
                                    percentage={ongoingProgress}
                                    progessThickness="thin"
                                />
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </Card>
                <Card title={"Completed Activities"}>
                    {loader === true ?
                        <FlexLayout spacing="mediumTight" direction="vertical">
                            <Skeleton height="50px" line={5} type="line" width="50px" />
                        </FlexLayout>
                        :
                        notification.length === 0 ?
                            <FallBack
                                illustration={<NoNotificationSvg />}
                                subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">There is no activities and notification found in this page</TextStyles></FlexLayout>}
                                title="No Notifications Available"
                            /> :
                            <FlexLayout spacing='loose' direction='vertical'>
                                <FlexChild>
                                    {
                                        notification.map((val: any, index: number) => (
                                            <Notification key={index}
                                                destroy={false}
                                                onClose={function noRefCheck() { }}
                                                subdesciption={val.created_at}
                                                type={val.severity === "error" ? "danger" : val.severity}
                                            >
                                                <TextStyles fontweight="bold" content={val.message} />
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
                    }

                </Card>
            </FlexLayout>
            <Modal
                close={() => { setOpenModal(!openModal) }}
                heading="Clear all notifications"
                modalSize="small"
                primaryAction={{
                    content: 'Clear',
                    type: "Danger",
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