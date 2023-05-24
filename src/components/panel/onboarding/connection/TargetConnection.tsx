import React from 'react'
import ConnectionList from '../../utility/commonComponent/ConnectionList'
function TargetConnection() {
    const targetList = ["Login to your Shopify Admin Store and click on ‘Create App’",
        "Next, click on Configure API Admin Scope to tick permission for the required API scopes.",
        "Now, click on the API credentials button and install the App",
        "After installing the app, take note of the generated Secret API"]
    return (
        <>
            <ConnectionList list={targetList} />
        </>
    )
}

export default TargetConnection