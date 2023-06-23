import { CheckCircle, Slash, AlertTriangle, Download, Clock, RefreshCcw, Truck } from "react-feather"
export const AccordionData = [
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making itlook like readable English.',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making itlook like readable English.',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making itlook like readable English.',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point ofusing Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making itlook like readable English.',
]

export function makeTitleForProductStatus(string: string) {
    if (string === "not_uploaded") {
        return "Not Uploaded"
    } else if (string === "inactive") {
        return "Inactive"
    } else if (string === "failed") {
        return "Failed"
    } else if (string === "live") {
        return "Live"
    }
}
export function makeTitleForOrderStatus(string: string) {
    if (string === "AWAITING_SHIPMENT") {
        return "Awaiting Shipment"
    } else if (string === "COMPLETED") {
        return "Completed"
    } else if (string === "CANCELLED") {
        return "Cancelled"
    } else if (string === "AWAITING_COLLECTION") {
        return "Awaiting Collection"
    }
}

export function makeBadgeForProductStatus(string: string) {
    if (string === "not_uploaded") {
        return <AlertTriangle size="18" color="#ffc107bf" />
    } else if (string === "inactive") {
        return <Download size="18" color="#7842e8" />
    } else if (string === "failed") {
        return <Slash size="18" color="#ff0000" />
    } else if (string === "live") {
        return <CheckCircle size="18" color="#4caf50c4" />
    }
}
export function makeBadgeForOrderStatus(string: string) {
    if (string === "AWAITING_SHIPMENT") {
        return <Clock size="18" color="#ffc107bf" />
    } else if (string === "COMPLETED") {
        return <CheckCircle size="18" color="#4caf50c4" />
    } else if (string === "CANCELLED") {
        return <RefreshCcw size="18" color="#6692FB" />
    } else if (string === "AWAITING_COLLECTION") {
        return <Truck size="18" color="#FE8B27" />
    }
}