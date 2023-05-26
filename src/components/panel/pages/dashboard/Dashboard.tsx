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
import React, { useState } from 'react'
import carouselImg from "../../../../assets/images/png/carousel.png"
function Dashboard() {
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
    // Make State For Toggle Accordian
    const [flag, setFlag] = useState({
        flag1: true,
        flag2: false,
        flag3: false,
        flag4: false,
    });
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
                <FlexChild desktopWidth="66">
                    <FlexLayout spacing="loose" direction="vertical">
                            <Card>
                                <FlexLayout spacing="extraTight" direction="vertical">
                                        <Card
                                            action={<Popover
                                                open={open}
                                                activator={
                                                    <Button
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
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={() => setFlag({ ...flag, flag1: !flag.flag1 })}
                                    title="Accordion Title"
                                    active={flag.flag1}
                                >
                                    <TextStyles textcolor="light">
                                        It is a long established fact that a reader will be distracted by the
                                        readable content of a page when looking at its layout. The point of
                                        using Lorem Ipsum is that it has a more-or-less normal distribution of
                                        letters, as opposed to using 'Content here, content here', making it
                                        look like readable English.
                                    </TextStyles>
                                </Accordion>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    title="Accordion Title"
                                    onClick={() => setFlag({ ...flag, flag2: !flag.flag2 })}
                                    active={flag.flag2}
                                >
                                    <TextStyles textcolor="light">
                                        It is a long established fact that a reader will be distracted by the
                                        readable content of a page when looking at its layout. The point of
                                        using Lorem Ipsum is that it has a more-or-less normal distribution of
                                        letters, as opposed to using 'Content here, content here', making it
                                        look like readable English.
                                    </TextStyles>
                                </Accordion>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={() => setFlag({ ...flag, flag3: !flag.flag3 })}
                                    active={flag.flag3}
                                    title="Accordion Title"
                                >
                                    <TextStyles textcolor="light">
                                        It is a long established fact that a reader will be distracted by the
                                        readable content of a page when looking at its layout. The point of
                                        using Lorem Ipsum is that it has a more-or-less normal distribution of
                                        letters, as opposed to using 'Content here, content here', making it
                                        look like readable English.
                                    </TextStyles>
                                </Accordion>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={() => setFlag({ ...flag, flag4: !flag.flag4 })}
                                    active={flag.flag4}
                                    title="Accordion Title"
                                >
                                    <TextStyles textcolor="light">
                                        It is a long established fact that a reader will be distracted by the
                                        readable content of a page when looking at its layout. The point of
                                        using Lorem Ipsum is that it has a more-or-less normal distribution of
                                        letters, as opposed to using 'Content here, content here', making it
                                        look like readable English.
                                    </TextStyles>
                                </Accordion>
                            </Card>
                    </FlexLayout>
                </FlexChild>
                <FlexChild desktopWidth="33">
                    <FlexLayout spacing="loose" direction="vertical">
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
                            >
                                {/* {carouselData.map((val: any, index: number) => (
                                    <Card key={index}
                                        cardType="Bordered"
                                        media={val.image}
                                    >
                                        <FlexLayout spacing='tight' direction='vertical'>
                                            <TextStyles fontweight='bold'>{val.title}</TextStyles>
                                            <TextStyles>${val.price}</TextStyles>
                                        </FlexLayout>
                                    </Card>
                                ))} */}
                                <Card
                                    cardType="Bordered"
                                    media={carouselImg}
                                >
                                    <FlexLayout spacing='tight' direction='vertical'>
                                        <TextStyles fontweight='bold'>Fingers mouse with areao grip</TextStyles>
                                        <TextStyles fontweight="extraBold">$ 24.94</TextStyles>
                                    </FlexLayout>
                                </Card>
                            </Carousel>
                        </Card>
                        <Card title={"Activity"} action={<Button type="TextButton">View all</Button>}>
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