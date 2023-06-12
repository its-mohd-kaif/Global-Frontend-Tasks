import { Loader, StepWizard } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import ConnectionTitle from '../utility/commonComponent/ConnectionTitle'
import TargetConnection from './connection/TargetConnection'
import MappingTemplate from './default/MappingTemplate'
import DefaultSetting from './default/DefaultSetting'
import TopbarOnboarding from '../topbar/TopbarOnboarding'
import { Navigate } from 'react-router-dom'
import Footer from '../../footer/Footer'
import { callApi } from '../../../core/ApiMethods'
import SoucreConnect from './connection/SoucreConnect'
function Onboarding() {
    const [stepper, setStepper] = useState<number>(0)
    const [loader, setLoader] = useState<boolean>(true)

    useEffect(() => {
        callApi("POST", "tiktokhome/frontend/getStepCompleted")
            .then((res: any) => {
                if (res.success === true) {
                    console.log("getStepCompleted", res)
                    setStepper(2)
                    setLoader(false)
                }
            })
    }, [])

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
                                title: 'Connect TikTok Shop'
                            },
                            {
                                title: 'Mapping'
                            },
                            {
                                title: 'Configuration'
                            },
                        ]}
                    />
                    <div className='connection-card'>
                        {
                            stepper === 0 ?
                                <SoucreConnect />
                                : stepper === 1 ?
                                    <TargetConnection />
                                    : stepper === 2 ?
                                        <MappingTemplate />
                                        : stepper === 3 ?
                                            <DefaultSetting /> : <Navigate to={"/prepareOnboarding"} />
                        }
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}

export default Onboarding