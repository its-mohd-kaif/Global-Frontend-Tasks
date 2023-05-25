import { Button,FlexLayout, Popover, Topbar } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Bell, User,Mail,LogOut } from "react-feather"
function TopbarPanel() {
    const [flag, setFlag] = useState<boolean>(false);
    return (
        <>
            <Topbar
                connectRight={
                    <FlexLayout spacing="loose">
                        <Button icon={<Bell size={16} />} type="Outlined" />
                        <Popover
                            open={flag}
                            activator={
                                <Button
                                    onClick={() => setFlag(!flag)}
                                    icon={<User size={16} />}
                                    type="Outlined"
                                />
                            }
                            onClose={() => setFlag(!flag)}
                            popoverContainer="element"
                            popoverWidth={250}
                        >
                            <FlexLayout direction='vertical' spacing="extraTight" >
                                <Button icon={<User size={18}/>} type='Plain'>John Doe</Button>
                                <Button icon={<Mail size={18}/>} type='Plain'>johndoe@email.com</Button>
                                <Button icon={<LogOut size={18}/>} type='DangerPlain'>Logout</Button>
                            </FlexLayout>
                        </Popover>
                    </FlexLayout>
                }
            />
        </>
    )
}

export default TopbarPanel