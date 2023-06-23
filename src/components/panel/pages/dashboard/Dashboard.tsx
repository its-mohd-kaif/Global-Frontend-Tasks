import {
    Avatar,
    Badge,
    Button,
    Card,
    Carousel,
    FallBack,
    FlexChild,
    FlexLayout,
    Loader,
    Notification,
    PageHeader,
    TextLink,
    TextStyles,
} from "@cedcommerce/ounce-ui";
import {
    FileText,
} from "react-feather";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import carouselImg from "../../../../assets/images/png/carousel.png"
import { useNavigate } from "react-router-dom";
import { makeBadgeForOrderStatus, makeBadgeForProductStatus, makeTitleForOrderStatus, makeTitleForProductStatus } from "./DashboardUtility";
import { callApi } from "../../../../core/ApiMethods";
import { useSelector } from "react-redux";
import NoNotificationSvg from "../../../../assets/images/svg/NoNotificationSvg";
function Dashboard() {
    const navigate = useNavigate()
    // Make State For Store Product Status
    const [products, setProducts] = useState<any>([]);
    // Make State For Store Order Status
    const [orders, setOrders] = useState<any>([]);
    // Make State For Store Notification
    const [notifications, setNotifications] = useState<any>([])
    const user = useSelector((redux: any) => redux.redux?.stepCompletedState?.user)
    const [loader, setLoader] = useState<boolean>(true)
    useEffect(() => {
        callApi("GET", "tiktokhome/product/getproductStatus", {}, "extraHeaders")
            .then((res: any) => {
                setLoader(false)
                if (res.success === true) {
                    makeProductStatus(res.data.status)
                }
            })
        callApi("GET", "tiktokhome/frontend/orderStatus", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    makeOrdertStatus(res.data.status)
                }
            })

        callApi("GET", "connector/get/allNotifications?activePage=1&count=5", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    makeNotification(res.data.rows)
                }
            })

    }, [])
    const makeOrdertStatus = (data: any) => {
        let tempArr: any = []
        data.forEach((element: any) => {
            let obj = {
                title: makeTitleForOrderStatus(element._id),
                icon: makeBadgeForOrderStatus(element._id),
                count: element.count,
                btn: <TextLink label="View Product"></TextLink>,
                id: element._id
            };
            tempArr.push(obj)
        });
        setOrders(tempArr)
    }
    const makeProductStatus = (data: any) => {
        let tempArr: any = []
        data.forEach((element: any) => {
            if (element._id !== "in_progress") {
                let obj = {
                    title: makeTitleForProductStatus(element._id),
                    icon: makeBadgeForProductStatus(element._id),
                    count: element.count,
                    btn: <TextLink label="View Product"></TextLink>,
                    id: element._id
                };
                tempArr.push(obj)
            }

        });
        setProducts(tempArr)
    }
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
        setNotifications(tempArr)
    }
    const carouselData = [
        {
            title: "Fingers mouse with areao grip",
            image: carouselImg,
            price: 24.90
        },
        {
            title: "Fingers mouse with areao grip",
            image: carouselImg,
            price: 24.90
        },
        {
            title: "Fingers mouse with areao grip",
            image: carouselImg,
            price: 24.90
        }
    ]
    if (loader === false) {
        return (
            <>
                <PageHeader
                    title="Dashboard"
                    action={<Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>}
                />
                <FlexLayout spacing="loose">
                    <FlexChild desktopWidth="66" tabWidth="66" mobileWidth="100">
                        <FlexLayout spacing="loose" direction="vertical">
                            <Card>
                                <FlexLayout spacing="loose" direction="vertical">
                                    <Card
                                        action={<Button type="TextButton">View all</Button>}
                                        cardType="Subdued"
                                        title="Product Status"
                                        extraClass="cardIcon"
                                    >
                                        <FlexLayout spacing="loose" halign="fill">
                                            {products.map((val: any, index: number) => (
                                                <FlexChild
                                                    key={val.id}
                                                    desktopWidth="25"
                                                    tabWidth="50"
                                                    mobileWidth="100"
                                                >
                                                    <Card extraClass="link">
                                                        <FlexLayout direction="vertical" wrap="wrap">
                                                            <FlexLayout halign="fill" wrap="noWrap">
                                                                <TextStyles>{val.title}</TextStyles>
                                                                <div className={`iconBody ${val.id}`}>
                                                                    <TextStyles>{val.icon}</TextStyles>
                                                                </div>
                                                            </FlexLayout>
                                                            <FlexLayout spacing="loose" direction="vertical" wrap="noWrap">
                                                                <TextStyles
                                                                    fontweight="extraBolder"
                                                                    type="SubHeading"
                                                                    headingTypes="MD-2.7"
                                                                >
                                                                    {val.count}
                                                                </TextStyles>
                                                                <TextLink label={val.btn}></TextLink>
                                                            </FlexLayout>
                                                        </FlexLayout>

                                                    </Card>
                                                </FlexChild>
                                            ))}
                                        </FlexLayout>
                                    </Card>
                                    <Card
                                        action={<Button type="TextButton">View all</Button>}
                                        cardType="Subdued"
                                        title="Order Status"
                                    >
                                        <FlexLayout spacing="loose" halign="fill">
                                            {orders.map((val: any, index: number) => (
                                                <FlexChild
                                                    key={val.id}
                                                    desktopWidth="25"
                                                    tabWidth="50"
                                                    mobileWidth="100"
                                                >
                                                    <Card extraClass="link">
                                                        <FlexLayout direction="vertical" wrap="wrap">
                                                            <FlexLayout valign="center" halign="fill" wrap="noWrap">
                                                                <TextStyles>{val.title}</TextStyles>
                                                                <div className={`iconBody ${val.id}`}>
                                                                    <TextStyles>{val.icon}</TextStyles>
                                                                </div>
                                                            </FlexLayout>
                                                            <FlexLayout spacing="loose" direction="vertical" wrap="noWrap">
                                                                <TextStyles
                                                                    fontweight="extraBolder"
                                                                    type="SubHeading"
                                                                    headingTypes="MD-2.7"
                                                                >
                                                                    {val.count}
                                                                </TextStyles>
                                                                <TextLink label={val.btn}></TextLink>
                                                            </FlexLayout>
                                                        </FlexLayout>
                                                    </Card>
                                                </FlexChild>
                                            ))}
                                        </FlexLayout>
                                    </Card>
                                </FlexLayout>
                            </Card>
                            <Card title={"Activity"} action={<Button onClick={() => navigate(`/panel/${sessionStorage.getItem("user_id")}/activity`)} type="TextButton">View all</Button>}>

                                {notifications.length === 0 ?
                                    <FallBack
                                        illustration={<NoNotificationSvg />}
                                        subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">There is no activities and notification found in this page</TextStyles></FlexLayout>}
                                        title="No Notification Available"
                                    />
                                    :
                                    <FlexLayout spacing='loose' direction='vertical'>
                                        <FlexChild>
                                            {
                                                notifications.map((val: any, index: number) => (
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
                                    </FlexLayout>
                                }

                            </Card>
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="100">
                        <FlexLayout desktopWidth="100" tabWidth="100" mobileWidth="100" spacing="loose" direction="vertical">
                            <Card cardType="Default" title="Connected Michael Account">
                                <FlexLayout halign="fill" valign="start" spacing="loose">
                                    <FlexChild desktopWidth="66">
                                        <FlexLayout>
                                            <FlexChild desktopWidth="25">
                                                <Avatar
                                                    color="red"
                                                    image=""
                                                    size="medium"
                                                    text={user}
                                                    type="circle"
                                                />
                                            </FlexChild>
                                            <FlexChild desktopWidth="75">
                                                <FlexLayout direction="vertical">
                                                    <TextStyles fontweight="bold" type="SubHeading">
                                                        {user}
                                                    </TextStyles>
                                                    <TextStyles textcolor="light">
                                                        Cedfbe-633582fb9x8dhdbdio834ubububdd89
                                                    </TextStyles>
                                                </FlexLayout>
                                            </FlexChild>
                                        </FlexLayout>
                                    </FlexChild>
                                    <FlexChild desktopWidth="33">
                                        <Badge size="regular" type="Positive-100">
                                            Connected
                                        </Badge>
                                    </FlexChild>
                                </FlexLayout>
                            </Card>
                            <Card title={"Top Three Products"} action={<Button type="TextButton">View all</Button>}>
                                <Carousel
                                    arrowalign="bottomCenter"
                                    autoplay
                                    infinite
                                    slidesToScroll={1}
                                    slidesToShow={1}
                                    autoplaySpeed={1000}
                                    dots
                                >
                                    {carouselData.map((val: any, index: number) => (
                                        <Card key={index}
                                            cardType="Bordered"
                                            media={val.image}
                                        >
                                            <FlexLayout spacing='tight' direction='vertical'>
                                                <TextStyles fontweight='bold'>{val.title}</TextStyles>
                                                <TextStyles fontweight='extraBold' content={`$${val.price}`} />
                                            </FlexLayout>
                                        </Card>
                                    ))}
                                </Carousel>
                            </Card>

                        </FlexLayout>
                    </FlexChild>
                </FlexLayout>
            </>
        )
    } else {
        return (
            <Loader type="Loader2" />
        )
    }

}

export default Dashboard