import "./Panel.css"
import { Route, Routes, useNavigate } from 'react-router-dom'
import TopbarPanel from './topbar/TopbarPanel'
import Sidebar from './topbar/Sidebar'
import { BodyLayout } from '@cedcommerce/ounce-ui'
import Dashboard from './pages/dashboard/Dashboard'
import Product from './pages/product/Product'
import Order from './pages/order/Order'
import Category from './pages/category/Category'
import Template from './pages/category/Template'
import Footer from '../footer/Footer'
import Activity from './pages/activity/Activity'
import { useEffect, useState } from "react"
import { callApi } from "../../core/ApiMethods"
import Onboarding from "./onboarding/Onboarding"
import { useDispatch, useSelector } from "react-redux"
import LoaderComponent from "./utility/commonComponent/LoaderComponent"
import { connectorGetMethod, stepCompleted, userId } from "../../redux/ReduxSlice"

function Panel() {
    const navigate = useNavigate()
    const reduxState = useSelector((redux: any) => redux.redux)
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const urlParams = window.location.pathname;
        const user_id = urlParams.split("/")[2];
        async function getAsyncCall() {
            await getStepCompleted();
            await connectorGetAll();
            setFlag(true);
        };
        // You need to restrict it at some point
        if (!flag) {
            getAsyncCall();
        }

        dispatch(userId(user_id))
    }, [])
    const getStepCompleted = () => {
        callApi("POST", "tiktokhome/frontend/getStepCompleted")
            .then((res: any) => {
                if (res.success === true) {
                    dispatch(stepCompleted(res))
                }
            })
    }
    const connectorGetAll = () => {
        callApi("POST", "connector/get/all")
            .then((res: any) => {
                if (res.success === true) {
                    dispatch(connectorGetMethod(res))
                }
            })
    }
    useEffect(() => {
        if (reduxState.stepCompletedState.data !== undefined) {
            if (reduxState.stepCompletedState.data < 3) {
                navigate(`/panel/${reduxState.user_id}/onboarding`)
            }
        }
    }, [reduxState])
    if (reduxState.stepCompletedState.data !== undefined) {
        if (reduxState.stepCompletedState.data < 3) {
            return (
                <>
                    <Routes>
                        <Route path='onboarding' element={<Onboarding />} />
                    </Routes>
                </>
            )
        } else if (reduxState.stepCompletedState.data >= 3) {
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
                            <Route path='activity' element={<Activity />} />
                        </Routes>
                        <Footer />
                    </BodyLayout>
                </>
            )
        } else {
            return <>Fallback</>
        }
    }
    else {
        return (<LoaderComponent />)
    }

}

export default Panel