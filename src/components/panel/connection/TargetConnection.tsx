import { Card, FlexLayout, StepWizard } from '@cedcommerce/ounce-ui'
import React from 'react'
import ConnectionTitle from '../utility/commonComponent/ConnectionTitle'
import { ArrowRight } from "react-feather"
import ConnectionList from '../utility/commonComponent/ConnectionList'
function TargetConnection() {
    const targetList = ["Login to your Shopify Admin Store and click on ‘Create App’",
        "Next, click on Configure API Admin Scope to tick permission for the required API scopes.",
        "Now, click on the API credentials button and install the App",
        "After installing the app, take note of the generated Secret API"]
    return (
        <div className='connection'>
            <FlexLayout halign='center' direction='vertical'>
                <ConnectionTitle />
                <StepWizard
                    className='stepper-custom'
                    current={0}
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
                <Card title={"How to get an API key"}
                    primaryAction={{
                        content: 'Connect',
                        type: 'Primary',
                        icon: <ArrowRight size={"18"} />,
                        iconAlign: "right"
                    }} extraClass='connection-card'>
                    <ConnectionList list={targetList} />
                </Card>
            </FlexLayout>
        </div>
    )
}

export default TargetConnection