import { Accordion, Badge, Button, Card, FlexChild, FlexLayout, Image, Modal, Popover, TextLink, TextStyles } from "@cedcommerce/ounce-ui";
import { useState } from "react";
import actions from "../../../../assets/images/png/menu.png"
import { Eye, Edit, AlertTriangle, ChevronUp, ChevronDown } from "react-feather"

export const ProductGridTitle = (_props: any) => {
    const { title } = _props;
    return <>
        <FlexLayout valign="center" spacing="loose">
            <FlexChild>
                <TextStyles fontweight="bold">{title}</TextStyles>
            </FlexChild>
            <FlexChild>
                <FlexLayout spacing="extraTight" direction="vertical">
                    <ChevronUp className="up-arrow" onClick={() => { }} size={16} />
                    <ChevronDown className="down-arrow" onClick={() => { }} size={16} />
                </FlexLayout>
            </FlexChild>
        </FlexLayout>
    </>
}

export const ProductsTitle = (items: any) => {
    return <>
        <FlexLayout direction="vertical">
            <FlexChild>
                <TextLink label={items[0].title} />
            </FlexChild>
            <FlexChild>
                <FlexLayout>
                    <TextStyles fontweight="bold">SKU:&nbsp;</TextStyles>
                    <TextStyles>{items[0].sku}</TextStyles>
                </FlexLayout>
            </FlexChild>
        </FlexLayout>
    </>
}

export const GetRange = (items: any, property: string) => {
    if (items.length === 1) {
        return <>
            {property === "price" ?
                <TextStyles>INR {items[0].price}</TextStyles>
                : <TextStyles>{items[0].quantity}</TextStyles>}

        </>
    } else {
        const validItems = items.filter((item: any) => {
            return typeof item.price === 'number' && typeof item.quantity === 'number';
        });
        const min = Math.min(...validItems.map((item: any) => item[property]));
        const max = Math.max(...validItems.map((item: any) => item[property]));
        if (property === 'price') {
            const formattedMin = `INR ${min.toFixed(2)}`;
            const formattedMax = `INR ${max.toFixed(2)}`;
            if (formattedMin === formattedMax) {
                return formattedMin
            } else
                return `${formattedMin} - ${formattedMax}`;
        } else if (property === 'quantity') {
            if (min === max) {
                return min
            } else
                return `${min} - ${max}`;
        }
    }
}


export const ProductsActions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button customClass="action-button" onClick={() => setOpenActions(!openActions)} type='Outlined'>
                    <Image
                        fit="cover"
                        height={20}
                        radius="corner-radius"
                        src={actions}
                        width={20}
                    />
                </Button>}
                open={openActions}
                onClose={() => setOpenActions(!openActions)}>
                <FlexLayout direction="vertical">
                    <Button icon={<Edit />} type="Plain">Edit Listing</Button>
                    <Button icon={<Eye />} type="Plain">View Listing</Button>
                </FlexLayout>
            </Popover>
        </>
    )
}

export const ProductsStatus = (_props: any) => {
    const { status } = _props
    const [errorModal, setErrorModal] = useState<boolean>(false)
    if (!status) {
        return null; // Return null if status is undefined or null
    } else {
        if (
            (status.target_marketplace === "tiktok" &&
                status.tiktok_status === "live" &&
                status.status === "live") || (
                status.target_marketplace === "tiktok" &&
                status.tiktok_status === "live" &&
                status.status === "failed"
            )
        ) {
            return (
                <>
                    <FlexLayout spacing="extraTight">
                        <TextStyles>
                            TTS :
                        </TextStyles>
                        <Badge
                            position="bottom"
                            size="small"
                            type="Positive-100"
                        >
                            Live
                        </Badge>
                    </FlexLayout>
                </>
            )
        }
        else if (
            status.target_marketplace === "tiktok" &&
            !status.hasOwnProperty("tiktok_status") &&
            status.status === "failed"
        ) {
            return (
                <>
                    <FlexLayout spacing="extraTight" direction="vertical">
                        <FlexChild>
                            <FlexLayout spacing="extraTight">
                                <TextStyles>
                                    TTS :
                                </TextStyles>
                                <Badge
                                    position="bottom"
                                    size="small"
                                    type="Warning-100"
                                >
                                    Not Uploaded
                                </Badge>
                            </FlexLayout>
                        </FlexChild>
                        <FlexChild>
                            <FlexLayout valign="center" spacing="extraTight">
                                <TextStyles>
                                    Error:
                                </TextStyles>
                                <FlexChild>
                                    <Button
                                        onClick={() => {
                                            setErrorModal(!errorModal)
                                        }}
                                        customClass="errorAlertTriangle" icon={<AlertTriangle size={17} color="#D92D20" />} type="DangerPlain">Failed</Button>
                                </FlexChild>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                    <Modal
                        close={() => {
                            setErrorModal(!errorModal)
                        }}
                        heading="Error Type : Failed"
                        modalSize="small"
                        open={errorModal} >
                        <FlexLayout spacing="loose" direction="vertical">
                            {status?.error_data?.messages.map((val: any, index: number) => (
                                <Card cardType="Subdued" key={index}>
                                    <FlexLayout spacing="loose">
                                        <AlertTriangle size={17} color="#D92D20" />
                                        <TextStyles content={val} />
                                    </FlexLayout>
                                </Card>
                            ))}
                        </FlexLayout>

                    </Modal>
                </>
            );
        }
        else if (
            status.target_marketplace === "tiktok" &&
            !status.hasOwnProperty("tiktok_status") &&
            !status.hasOwnProperty("status")
        ) {
            return (<>
                <FlexLayout spacing="extraTight">
                    <TextStyles>
                        TTS :
                    </TextStyles>
                    <Badge
                        position="bottom"
                        size="small"
                        type="Warning-100"
                    >
                        Not Uploaded
                    </Badge>
                </FlexLayout>
            </>)
        }
        else if (
            status.target_marketplace === "tiktok" &&
            status.tiktok_status === "inactive" &&
            status.status === "inactive"
        ) {
            return (<>
                <FlexLayout spacing="extraTight">
                    <TextStyles>
                        TTS :
                    </TextStyles>
                    <Badge
                        position="bottom"
                        size="small"
                        type="Neutral-300"
                    >
                        Inactive
                    </Badge>
                </FlexLayout>
            </>)
        }
    }
    return <>

    </>
}

export const makebadgeBgColors = (status: any) => {
    if (status === "all") {
        return "#C8B6FF"
    } else if (status === "not_uploaded") {
        return "#FCE19F"
    } else if (status === "in_progress") {
        return "#F6A8A1"
    } else if (status === "live") {
        return "#9EF2D4"
    } else if (status === "reviewing") {
        return "#9FDEF6"
    } else if (status === "failed") {
        return "#FFC2C2"
    } else if (status === "inactive") {
        return "#D4D5D9"
    }

}

export const makeURLForTabChange = (status: string) => {
    if (status === "all") {
        return ""
    } else if (status === "not_uploaded") {
        return "&filter[items.0.status][12]=0"
    } else {
        return `&filter[items.0.status][1]=${status}`
    }
}


export const makeIndividualQueryParams = (key: any, value: any) => {
    let queryString = null;
    switch (key) {
        case "categoryChoose":
            queryString = `&filter[profile.profile_name][1]=${value}`;
            break;
        case "productTypeChoose":
            queryString = `&filter[type][1]=${value}`;
            break;
        case "minQuantity":
            queryString = `&filter[items.quantity][7][from]=${value}`;
            break;
        case "maxQuantity":
            queryString = `&filter[items.quantity][7][to]=${value}`;
            break;
        case "minPrice":
            queryString = `&filter[items.price][7][from]=${value}`;
            break;
        case "maxPrice":
            queryString = `&filter[items.price][7][to]=${value}`;
            break;
        case "brand":
            queryString = `&filter[brand][3]=${value}`;
            break;
    }
    return queryString;
}

export const makeTitleForTag = (key: any) => {
    switch (key) {
        case "categoryChoose":
            return "Category Template";
        case "productTypeChoose":
            return "Product Type";
        case "minQuantity":
            return "Minimum Quantity";
        case "maxQuantity":
            return "Maximum Quantity";
        case "minPrice":
            return "Minimum Retail Price";
        case "maxPrice":
            return "Maximum Retail Price";
        case "brand":
            return "Brand";
        default:
            return null;
    }
}