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
    console.log("items", items)
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
            return `${formattedMin} - ${formattedMax}`;
        } else if (property === 'quantity') {
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
    const [open, setOpen] = useState<boolean>(false)
    const [accordion, setAccordion] = useState<boolean>(false);
    const { status } = _props
    if (status === "live") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Positive-300"
                customTextColor="white"
            >
                Live
            </Badge>
        )
    } else if (status === "error") {
        return (
            <>
                <Button customClass="error-product-btn" onClick={() => {
                    setOpen(!open)
                }} icon={<AlertTriangle
                    size={15} color='red' />} type="DangerPlain">
                    Errors
                </Button>
                <Modal
                    close={() => {
                        setOpen(!open)
                    }}
                    heading="Errors"
                    modalSize="small"
                    open={open}>
                    <Card cardType="Subdued">
                        <FlexLayout direction="vertical" spacing="tight">
                            <Card>
                                <FlexLayout direction="vertical" spacing="mediumTight">
                                    <FlexChild>
                                        <>
                                            <FlexLayout valign="center" spacing="tight">
                                                <AlertTriangle size={17} color='red' />
                                                <TextStyles fontweight="extraBolder">Product Error</TextStyles>
                                            </FlexLayout>
                                            <div style={{ marginLeft: "28px" }}>
                                                <TextStyles>
                                                    Error description dolor sit amet, consectetur adipiscing elit. Dui placerat
                                                    commodo purus proin cras malesuada amet. Faucibus odio id sit varius eleifend.
                                                </TextStyles>
                                            </div>
                                        </>
                                    </FlexChild>
                                    <FlexChild>
                                        <>
                                            <Accordion
                                                active={accordion}
                                                boxed
                                                icon
                                                iconAlign="left"
                                                onClick={() => setAccordion(!accordion)}
                                                title="Resolutions"
                                            >
                                                <TextStyles textcolor="light">
                                                    Error description dolor sit amet, consectetur adipiscing elit. Dui placerat
                                                    commodo purus proin cras malesuada amet. Faucibus odio id sit varius eleifend.
                                                </TextStyles>
                                            </Accordion>
                                        </>
                                    </FlexChild>
                                </FlexLayout>

                            </Card>

                        </FlexLayout>
                    </Card>

                </Modal>
            </>
        )
    } else if (status === "pending") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Negative-200"
                customTextColor="white"
            >
                Pending
            </Badge>
        )

    } else if (status === "not_upload") {
        return (
            <Badge
                position="bottom"
                size="small"
                type="Warning-100"
                customTextColor="black"
            >
                Not Upload
            </Badge>
        )
    }
    return (
        <></>
    )
}