import { NewSidebar } from '@cedcommerce/ounce-ui'
import React from 'react'
import CompanyLogoSvg from '../../../assets/images/svg/CompanyLogoSvg'
import OnlyLogoSvg from '../../../assets/images/svg/OnlyLogoSvg'
import { Box, Grid, HelpCircle, Home, LifeBuoy, Settings, FileText, ShoppingBag, DollarSign, CornerDownLeft } from 'react-feather'
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
            id: "category",
            path: "category",
        },
        {
            content: "Manage Products",
            icon: <FileText />,
            id: "product",
            path: "product",
        },
        {
            content: "Orders",
            icon: <ShoppingBag />,
            id: "order",
            path: "order",
        },
        {
            content: "Return Orders",
            icon: <CornerDownLeft color='#3B424F' />,
            id: "return",
            path: "return",
        },
        {
            content: "Configuration",
            icon: <Settings color='#3B424F' />,
            id: "config",
            path: "config",
        },
        {
            content: "Pricing",
            icon: <DollarSign color='#3B424F' />,
            id: "price",
            path: "price",
        },
        {
            content: "FAQ",
            icon: <HelpCircle color='#3B424F' />,
            id: "faq",
            path: "faq",
        },
        {
            content: "Help",
            icon: <LifeBuoy color='#3B424F' />,
            id: "help",
            path: "help",
        },
        {
            content: "Grid Page",
            icon: <Grid size="24" color="#3B424F" />,
            id: "grid-page",
            path: "grid-page",
        },
    ]
    const navigate = useNavigate()
    return (
        <>
            <NewSidebar
                logo={<CompanyLogoSvg />}
                onChange={(e: any) => {
                    navigate(e.path)
                }}
                mobileLogo={<OnlyLogoSvg />}
                menu={allMenu}
            />
        </>
    )
}

export default Sidebar