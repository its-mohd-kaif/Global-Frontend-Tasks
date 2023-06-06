import {
    Accordion,
    Avatar,
    Badge,
    Button,
    Card,
    Carousel,
    FlexChild,
    FlexLayout,
    Image,
    Notification,
    PageHeader,
    Popover,
    TextLink,
    TextStyles,
} from "@cedcommerce/ounce-ui";
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Download,
    Slash,
    FileText,
    RefreshCcw,
    XCircle,
    Eye, Upload
} from "react-feather";
import menuImg from "../../../../assets/images/png/menu.png"
import React, { useEffect, useState } from 'react'
import carouselImg from "../../../../assets/images/png/carousel.png"
import { useNavigate } from "react-router-dom";
import { AccordionData } from "./DashboardUtility";
function Dashboard() {
    const navigate = useNavigate()
    const productStatus = [
        {
            title: "Finished",
            icon: <CheckCircle size="18" color="#4caf50c4" />,
            value: 567,
            btn: <TextLink label="View Product"></TextLink>,
        },
        {
            title: "Error",
            icon: <Slash size="18" color="#ff0000" />,
            value: 500,
            btn: <TextLink label="View Product"></TextLink>,
        },
        {
            title: "Warning",
            icon: <AlertTriangle size="18" color="#ffc107bf" />,
            value: 6000,
            btn: <TextLink label="View Order"></TextLink>,
        },
        {
            title: "Imported",
            icon: <Download size="18" color="#7842e8" />,
            value: 0,
            btn: <TextLink label="View Product"></TextLink>,
        },
    ];
    const orderStatus = [
        {
            title: "Pending",
            icon: <Clock size="18" color="#000" />,
            value: 600,
            btn: <TextLink label="View Order"></TextLink>,
        },
        {
            title: "Cancelled",
            icon: <XCircle size="18" color="#ff0000" />,
            value: 500,
            btn: <TextLink label="View Product"></TextLink>,
        },
        {
            title: "Warning",
            icon: <AlertTriangle size="18" color="#ffc107bf" />,
            value: 6000,
            btn: <TextLink label="View Order"></TextLink>,
        },
        {
            title: "Refunded",
            icon: <RefreshCcw size="18" color="#6692fb" />,
            value: 567,
            btn: <TextLink label="View Product"></TextLink>,
        },
    ];

    const [accordian, setAccordian] = useState<any>([])
    const [multiaccor, setMultiacor] = useState<any>([]);

    useEffect(() => {
        setAccordian(AccordionData)
        for (let i = 0; i < AccordionData.length; i++) {
            setMultiacor([...multiaccor, false])
        }
        const urlParams = window.location.pathname
        console.log("MY PARAMS", urlParams.split("/")[2])
    }, [])
    const [open, setOpen] = useState<boolean>(false);
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
                            <FlexLayout spacing="extraTight" direction="vertical">
                                <Card
                                    action={<Popover
                                        open={open}
                                        activator={
                                            <Button
                                                customClass="action-button"
                                                onClick={() => setOpen(!open)}
                                                type="Outlined"
                                            ><Image width={20} height={20} src={menuImg} /></Button>
                                        }
                                        onClose={() => setOpen(!open)}
                                        popoverContainer="element"
                                        popoverWidth={250}
                                    >
                                        <FlexLayout direction='vertical' spacing="extraTight" >
                                            <Button icon={<Eye size={18} />} type='Plain'>View All</Button>
                                            <Button icon={<Upload size={18} />} type='Plain'>Bulk Upload</Button>
                                        </FlexLayout>
                                    </Popover>}
                                    cardType="Subdued"
                                    title="Product Status"
                                    extraClass="cardIcon"
                                >
                                    <FlexLayout spacing="loose" halign="fill">
                                        {productStatus.map((val, index) => (
                                            <FlexChild
                                                key={index}
                                                desktopWidth="25"
                                                tabWidth="50"
                                                mobileWidth="100"
                                            >
                                                <Card extraClass="link">
                                                    <FlexLayout halign="fill">
                                                        <TextStyles>{val.title}</TextStyles>
                                                        <div className={`iconBody ${val.title}`}>
                                                            <TextStyles>{val.icon}</TextStyles>
                                                        </div>
                                                    </FlexLayout>
                                                    <FlexLayout spacing="loose" direction="vertical">
                                                        <TextStyles
                                                            fontweight="extraBolder"
                                                            type="SubHeading"
                                                            headingTypes="MD-2.7"
                                                        >
                                                            {val.value}
                                                        </TextStyles>
                                                        <TextLink label={val.btn}></TextLink>
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
                                        {orderStatus.map((val, index) => (
                                            <FlexChild
                                                key={index}
                                                desktopWidth="25"
                                                tabWidth="50"
                                                mobileWidth="100"
                                            >
                                                <Card extraClass="link">
                                                    <FlexLayout valign="center" halign="fill">
                                                        <TextStyles>{val.title}</TextStyles>
                                                        <div className={`iconBody ${val.title}`}>
                                                            <TextStyles>{val.icon}</TextStyles>
                                                        </div>
                                                    </FlexLayout>
                                                    <FlexLayout spacing="loose" direction="vertical">
                                                        <TextStyles
                                                            fontweight="extraBolder"
                                                            type="SubHeading"
                                                            headingTypes="MD-2.7"
                                                        >
                                                            {val.value}
                                                        </TextStyles>
                                                        <TextLink label={val.btn}></TextLink>
                                                    </FlexLayout>
                                                </Card>
                                            </FlexChild>
                                        ))}
                                    </FlexLayout>
                                </Card>
                            </FlexLayout>
                        </Card>
                        <Card
                            title="Frequently Asked Question"
                            action={<Button type="TextButton">View all FAQ articles</Button>}
                        >
                            {
                                accordian.map((val: any, index: number) => (
                                    <Accordion
                                        key={index}
                                        boxed
                                        icon
                                        iconAlign="left"
                                        onClick={() => {
                                            multiaccor[index] = !multiaccor[index]
                                            setMultiacor([...multiaccor])
                                        }}
                                        title="Accordion Title"
                                        active={multiaccor[index]}

                                    >
                                        <TextStyles textcolor="light">
                                            {val}
                                        </TextStyles>
                                    </Accordion>
                                ))
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
                                                text="Michael"
                                                type="circle"
                                            />
                                        </FlexChild>
                                        <FlexChild desktopWidth="75">
                                            <FlexLayout direction="vertical">
                                                <TextStyles fontweight="bold" type="SubHeading">
                                                    Michael
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
                        <Card title={"Activity"} action={<Button onClick={() => navigate("/panel/activity")} type="TextButton">View all</Button>}>
                            <Notification
                                destroy={false}
                                onClose={function noRefCheck() { }}
                                subdesciption="Fri Feb 03 2023 15:04:08"
                                type="success"
                            >
                                887 product(s) imported successfully
                            </Notification>
                        </Card>
                    </FlexLayout>
                </FlexChild>
            </FlexLayout>

        </>
    )
}

export default Dashboard