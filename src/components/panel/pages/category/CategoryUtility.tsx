import { Button, FlexLayout, Image, Popover } from "@cedcommerce/ounce-ui"
import { useState } from "react"
import { Edit, Trash2 } from "react-feather"
import actions from "../../../../assets/images/png/menu.png"
export const CategoryActions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button onClick={() => setOpenActions(!openActions)} type='Outlined'>
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
                    <Button icon={<Trash2 />} type="Plain">View Listing</Button>
                </FlexLayout>
            </Popover>
        </>
    )
}