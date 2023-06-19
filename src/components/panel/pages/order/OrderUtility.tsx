import { Badge, Button, Card, FlexChild, FlexLayout, Modal, TextLink, TextStyles } from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { AlertTriangle } from "react-feather"

export const OrdersStatus = (_props: any) => {
    const [errorModal, setErrorModal] = useState<boolean>(false)
    const { marketplace_status, status } = _props
    let marketplace_status_badge;
    let status_badge;

    if (marketplace_status === "AWAITING_SHIPMENT") {
        marketplace_status_badge = <Badge
            position="bottom"
            size="small"
            type="Warning-100"
        >
            Awaiting Shipment
        </Badge>
    } else if (marketplace_status === "AWAITING_COLLECTION") {
        marketplace_status_badge = <Badge
            position="bottom"
            size="small"
            type="Info-100"
        >
            Awaiting Collection
        </Badge>
    } else if (marketplace_status === "CANCELLED") {
        marketplace_status_badge = <Badge
            position="bottom"
            size="small"
            type="Negative-100"
        >
            Cancelled
        </Badge>
    } else if (marketplace_status === "COMPLETED") {
        marketplace_status_badge = <Badge
            position="bottom"
            size="small"
            type="Positive-200"
        >
            Completed
        </Badge>
    }

    if (status.status === "failed" && status.errors && status.errors.length > 0) {
        status_badge = <Button
            onClick={() => {
                setErrorModal(!errorModal)
            }}
            customClass="errorAlertTriangle" icon={<AlertTriangle size={17} color="#D92D20" />} type="DangerPlain">Failed</Button>
    } else {
        status_badge = null
    }

    return (
        <>
            <FlexLayout halign="start" direction="vertical">
                {status_badge}
                {marketplace_status_badge}
            </FlexLayout>
            <Modal
                close={() => {
                    setErrorModal(!errorModal)
                }}
                heading="Error"
                modalSize="small"
                open={errorModal} >
                <FlexLayout spacing="loose" direction="vertical">
                    {status.errors && status.errors.length > 0
                        ?
                        status?.errors.map((val: any, index: number) => (
                            <Card cardType="Subdued" key={index}>
                                <FlexLayout spacing="loose">
                                    <AlertTriangle size={17} color="#D92D20" />
                                    <TextStyles content={val} />
                                </FlexLayout>
                            </Card>
                        )) : null
                    }
                </FlexLayout>
            </Modal>
        </>
    )
}

export const makeTTSOrderID = (data: any, reference_id: string) => {
    // Initialize a variable to store the result
    let result;

    // Iterate over the data
    for (const item of data) {
        // Check if the key is 'fulfillment_type' and the value is '0'
        if (item.key === 'fulfillment_type' && item.value === '0') {
            result = 'Merchant';
            break;
        }
        // Check if the key is 'fulfillment_type' and the value is '1'
        else if (item.key === 'fulfillment_type' && item.value === '1') {
            result = 'Shop';
            break;
        }
    }

    return <>
        <FlexLayout direction="vertical">
            <TextLink label={reference_id} />
            <FlexChild>
                <FlexLayout spacing="extraTight">
                    <TextStyles fontweight="bold" content={"Fulfilled by:"} />
                    <TextStyles content={result} />
                </FlexLayout>
            </FlexChild>
        </FlexLayout>
    </>
}

export const makebadgeBgColorsForOrder = (status: any) => {
    if (status === "all") {
        return "#6EB7FF"
    } else if (status === "AWAITING_SHIPMENT") {
        return "#FAF090"
    } else if (status === "AWAITING_COLLECTION") {
        return "#BFABFF"
    } else if (status === "IN_TRANSIT") {
        return "#FF98BE"
    } else if (status === "DELIVERED") {
        return "#A5FFC1"
    } else if (status === "COMPLETED") {
        return "#95F3FF"
    } else if (status === "CANCELLED") {
        return "#FFB39C"
    }
}

export const makeURLForTabChangeForOrder = (status: string) => {
    if (status === "all") {
        return ""
    } else {
        return `&filter[marketplace_status][1]=${status}`
    }
}

export const makeTitleForOrderTag = (key: any) => {
    switch (key) {
        case "fulfilledBy":
            return "Managed By";
        case "createdAt":
            return "Created At";
        case "logisticMode":
            return "Delivery Option";
        case "customerName":
            return "Customer Name";
        case "productName":
            return "Product Name";
        case "tikTokProductId":
            return "Product Id";
        default:
            return null;
    }
}

export const makeIndividualQueryParamsOrder = (key: any, value: any) => {
    let queryString = null;
    switch (key) {
        case "fulfilledBy":
            queryString = `&filter[attributes.0.value][1]=${value}`;
            break;
        case "createdAt":
            queryString = `&filter[created_at][3]=${value}`;
            break;
        case "logisticMode":
            queryString = `&filter[attributes.1.value][1]=${value}`;
            break;
        case "customerName":
            queryString = `&filter[customer.name][3]=${value}`;
            break;
        case "productName":
            queryString = `&filter[items.title][3]=${value}`;
            break;
        case "tikTokProductId":
            queryString = `&filter[items.parent_product_identifier][3]=${value}`;
            break;
    }
    return queryString;
}

export const makeElement = (element: string) => {
    switch (element) {
        case "0":
            return "Managed by Merchant";
        case "1":
            return "Managed by TikTok Shop";
        case "STANDARD":
            return "Standard Shipping";
        case "SEND_BY_SELLER":
            return "Shipped By Seller";
        default:
            return element;
    }
}