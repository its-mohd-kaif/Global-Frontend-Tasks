import { Card, Loader, StepWizard } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import ConnectionTitle from '../utility/commonComponent/ConnectionTitle'
import { ArrowRight } from "react-feather"
import TargetConnection from './connection/TargetConnection'
import MappingTemplate from './default/MappingTemplate'
import DefaultSetting from './default/DefaultSetting'
import TopbarOnboarding from '../topbar/TopbarOnboarding'
import { Navigate } from 'react-router-dom'
import Footer from '../../footer/Footer'
import { useSelector } from 'react-redux'
import { callApi } from '../../../core/ApiMethods'
function Onboarding() {
    const [stepper, setStepper] = useState<number>(0)
    const [loader, setLoader] = useState<boolean>(true)
    const reduxState: any = useSelector((redux) => redux)

    useEffect(() => {
        callApi("POST", "tiktokhome/frontend/getStepCompleted")
            .then((res: any) => {
                if (res.success === true) {
                    setStepper(res.data)
                    setLoader(false)
                }
            })
    }, [])

    // Connect Source Handler
    const connectSourceHandler = () => {
        const state = {
            app_tag: process.env.REACT_APP_TAG,
            user_id: reduxState.redux.user_id,
            target_shop_id: 313,
            target: "tiktok",
        };
        const url = `${process.env.REACT_APP_END_POINT
            }connector/get/installationForm?code=shopify&appCode=shopify_tiktok&appType=private&bearer=${sessionStorage.getItem(`${reduxState.redux.user_id}_auth_token`)}&state=${JSON.stringify(
                state
            )}`;
        window.location.href = url
    }
    if (loader === true) {
        return (
            <>
                <Loader type='Loader2' />
            </>
        )
    } else {
        return (
            <>
                <TopbarOnboarding />
                <div className='connection'>
                    <ConnectionTitle />
                    <StepWizard
                        className='stepper-custom'
                        current={stepper}
                        items={[
                            {
                                title: 'Connect Your Account'
                            },
                            {
                                title: 'Mapping'
                            },
                            {
                                title: 'Configuration'
                            },
                        ]}
                    />
                    <Card
                        title={stepper === 0 ? "How to get an API key" : stepper === 1 ? " " : stepper === 2 ? "Default Configuration" : ""}
                        primaryAction={{
                            content: stepper === 0 ? "Connect" : stepper === 1 ? "Save and Next" : stepper === 2 ? "Save" : "",
                            type: 'Primary',
                            icon: <ArrowRight size={"18"} />,
                            iconAlign: "right",
                            onClick: () => {
                                if (stepper !== 2) {
                                    if (stepper === 0) {
                                        connectSourceHandler()
                                    }
                                }
                            }
                        }}
                        extraClass='connection-card'>
                        {
                            stepper === 0 ?
                                <TargetConnection />
                                : stepper === 1 ?
                                    <MappingTemplate />
                                    : stepper === 2 ?
                                        <DefaultSetting /> : <Navigate to={"/prepareOnboarding"} />
                        }
                    </Card>
                </div>
                <Footer />
            </>
        )
    }

}

export default Onboarding