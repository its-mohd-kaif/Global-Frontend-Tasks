import { Card } from '@cedcommerce/ounce-ui'
import React from 'react'
import ConnectionList from '../../utility/commonComponent/ConnectionList'
import { ArrowRight } from "react-feather"
import { useSelector } from 'react-redux'
function SoucreConnect(props: any) {
    const reduxState: any = useSelector((redux) => redux)
    const targetList = ["Login to your Shopify Admin Store and click on ‘Create App’",
        "Next, click on Configure API Admin Scope to tick permission for the required API scopes.",
        "Now, click on the API credentials button and install the App",
        "After installing the app, take note of the generated Secret API"]

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
    return (
        <>
            <Card
                title={"How to get an API key"}
                primaryAction={{
                    content: 'Connect',
                    type: 'Primary',
                    icon: <ArrowRight size={"18"} />,
                    iconAlign: "right",
                    onClick() {
                        connectSourceHandler()
                    },
                }}
            >
                <ConnectionList list={targetList} />
            </Card>
        </>
    )
}

export default SoucreConnect