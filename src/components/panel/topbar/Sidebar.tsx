import { NewSidebar } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import CompanyLogoSvg from '../../../assets/images/svg/CompanyLogoSvg'
import OnlyLogoSvg from '../../../assets/images/svg/OnlyLogoSvg'
import { Box, HelpCircle, Home, LifeBuoy, Settings, FileText, ShoppingBag, DollarSign, CornerDownLeft } from 'react-feather'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const allMenu = [
        {
            content: "Dashboard",
            icon: <Home />,
            id: "dashboard",
            path: "dashboard",
        },
        {
            content: "Category Template",
            icon: <Box />,
            id: "dashboard",
            path: "category",
        },
        {
            content: "Manage Products",
            icon: <FileText />,
            id: "dashboard",
            path: "product",
        },
        {
            content: "Orders",
            icon: <ShoppingBag />,
            id: "dashboard",
            path: "order",
        },
        {
            content: "Return Orders",
            icon: <CornerDownLeft color='#3B424F' />,
            id: "dashboard",
            path: "return",
        },
        {
            content: "Configuration",
            icon: <Settings color='#3B424F' />,
            id: "dashboard",
            path: "config",
        },
        {
            content: "Pricing",
            icon: <DollarSign color='#3B424F' />,
            id: "dashboard",
            path: "price",
        },
        {
            content: "FAQ",
            icon: <HelpCircle color='#3B424F' />,
            id: "dashboard",
            path: "faq",
        },
        {
            content: "Help",
            icon: <LifeBuoy color='#3B424F' />,
            id: "dashboard",
            path: "help",
        },

    ]
    return (
        <>
            <NewSidebar
                logo={<CompanyLogoSvg />}
                // onChange={(e: any) => navigate(e.path)}
                mobileLogo={<OnlyLogoSvg />}
                menu={allMenu}
                // path={path}
            />
        </>
    )
}

export default Sidebar