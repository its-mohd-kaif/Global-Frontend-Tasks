import { Badge, Button, Modal } from "@cedcommerce/ounce-ui";
import { useState } from "react";
import { XCircle } from "react-feather"

export const OrdersStatus = (_props: any) => {
    const [open, setOpen] = useState<boolean>(false)
    const { status } = _props
    if (status === "Completed" || status==="Complete") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Positive-300"
                customTextColor="white"
            >
                {status}
            </Badge>
        )
    } else if (status === "Cancelled") {
        return (
            <>
                <Button customClass="error-product-btn" onClick={() => {
                    setOpen(!open)
                }} icon={<XCircle
                    size={15} color='red' />} type="DangerPlain">
                    Cancelled
                </Button>
                <Modal
                    close={() => {
                        setOpen(!open)
                    }}
                    heading="Cancellation Reason"
                    modalSize="small"
                    open={open}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

                </Modal>
            </>
        )
    } else if (status === "Pending") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Warning-200"
            >
                Pending
            </Badge>
        )

    } else if (status === "Fulfilled") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Positive-100"
                customTextColor="black"
            >
                Fulfilled
            </Badge>
        )
    }
    else if (status === "Refunded") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Warning-100"
                customTextColor="black"
            >
                Refunded
            </Badge>
        )
    }
    return (
        <>{status}</>
    )
}