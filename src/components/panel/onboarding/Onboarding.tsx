import { Card, StepWizard } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import ConnectionTitle from '../utility/commonComponent/ConnectionTitle'
import { ArrowRight } from "react-feather"
import TargetConnection from './connection/TargetConnection'
import MappingTemplate from './default/MappingTemplate'
import DefaultSetting from './default/DefaultSetting'
function Onboarding() {
    const [stepper, setStepper] = useState<number>(0)
    return (
        <div className='connection'>
            <ConnectionTitle />
            <StepWizard
                className='stepper-custom'
                current={stepper}
                items={[
                    {
                        title: 'Create Your Account'
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
                            setStepper((val) => ++val)
                        } else {
                            setStepper(0)
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
                                <DefaultSetting /> : null
                }
            </Card>
        </div>
    )
}

export default Onboarding