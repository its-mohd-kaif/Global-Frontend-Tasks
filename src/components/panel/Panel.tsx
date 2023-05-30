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
import Order from './pages/order/Order'
import Category from './pages/category/Category'
import Template from './pages/category/Template'
import Footer from '../footer/Footer'

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
                        <Route path='order' element={<Order />} />
                        <Route path='category' element={<Category />} />
                        <Route path='category_template' element={< Template />} />
                    </Routes>
                    <Footer />
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