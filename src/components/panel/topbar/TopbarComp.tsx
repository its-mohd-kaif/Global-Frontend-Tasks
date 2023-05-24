import { ActionList, Button, FlexLayout, Topbar } from '@cedcommerce/ounce-ui'
import React from 'react'
import CompanyLogoSvg from '../../../assets/images/svg/CompanyLogoSvg'
import { ChevronDown } from "react-feather"
import USFlagSvg from '../../../assets/images/svg/USFlagSvg'
function TopbarComp() {
    return (
        <>
            <Topbar
                connectLeft={<CompanyLogoSvg />}
                connectRight={
                    <FlexLayout spacing="tight">
                        <ActionList
                            activator={<Button icon={<ChevronDown />}
                                iconAlign="right" onClick={function noRefCheck() { }}
                                type="Outlined">
                                <FlexLayout halign='center' valign='center' spacing='extraTight'>
                                    <USFlagSvg />
                                    English
                                </FlexLayout>
                            </Button>}
                            onClose={function noRefCheck() { }}
                            options={[
                                {
                                    items: [
                                        {
                                            content: 'Action 1',
                                            id: 'ActionOne',
                                            onClick: function noRefCheck() { }
                                        },
                                        {
                                            content: 'Action 1',
                                            id: 'ActionTwo',
                                            onClick: function noRefCheck() { }
                                        },
                                        {
                                            content: 'Action 1',
                                            id: 'ActionThree',
                                            onClick: function noRefCheck() { }
                                        }
                                    ]
                                }
                            ]}
                        />
                        <Button customClass='logoutButton' content='Log out' type="Outlined" />
                    </FlexLayout>}
            />
        </>
    )
}

export default TopbarComp