import React, { useState } from 'react'
import "./Panel.css"
import { Route, Routes } from 'react-router-dom'
import Onboarding from './onboarding/Onboarding'
import TopbarOnboarding from './topbar/TopbarOnboarding'
import TopbarPanel from './topbar/TopbarPanel'
import Sidebar from './topbar/Sidebar'
import { BodyLayout } from '@cedcommerce/ounce-ui'
import Dashboard from './pages/dashboard/Dashboard'
import Product from './pages/product/Product'

function Panel() {
    const [check, setCheck] = useState<boolean>(true)
    if (check === true) {
        return (
            <>
                <TopbarPanel />
                <Sidebar />
                <BodyLayout>
                    <Routes>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='product' element={<Product />} />
                    </Routes>
                </BodyLayout>
            </>
        )
    } else {
        return (
            <>
                <TopbarOnboarding />
                <Routes>
                    <Route path='onboarding' element={<Onboarding />} />
                </Routes>
            </>
        )
    }

}

export default Panel