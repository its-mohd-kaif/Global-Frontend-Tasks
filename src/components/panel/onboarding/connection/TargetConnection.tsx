import { Button, Card, FlexLayout, Select, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
function TargetConnection() {
    const reduxState: any = useSelector((redux) => redux)
    const [targetValue, setTargetValue] = useState<string>("")
    // Connect Target Handler
    const TargetSourceHandler = () => {
        const state = {
            app_tag: process.env.REACT_APP_TAG,
            user_id: reduxState.redux.user_id,
            source_shop_id: reduxState.redux.stepCompletedState.shops["Ced-Source-Id"],
            source: reduxState.redux.stepCompletedState.shops["Ced-Source-Name"],
        };
        const url = `${process.env.REACT_APP_END_POINT
            }connector/get/installationForm?code=${'tiktok'}&appCode=${targetValue}&redirect_return_type=message&bearer=${sessionStorage.getItem(`${reduxState.redux.user_id}_auth_token`)}&state=${JSON.stringify(
                state
            )}`;

        let width = 700;
        let height = 600;
        let left = (window.innerWidth - width) / 2;
        let top = (window.innerHeight - height) / 2;
        let options = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",scrollbars=yes";
        window.open(url, "about", options);
    }
    return (
        <>
            <Card
                title={"Connect your TikTok Shop account"}
                subTitle={"The platform provides various function to help you integrate with the platform and improve operational efficiency."}
            >
                <FlexLayout spacing="loose" direction='vertical'>
                    <Select
                        onChange={(e) => {
                            setTargetValue(e)
                        }}
                        onblur={function noRefCheck() { }}
                        options={[
                            {
                                label: 'Inside US',
                                value: 'tiktok_bigcommerce_us'
                            },
                            {
                                label: 'Outside US',
                                value: 'tiktok_bigcommerce_uk'
                            },
                        ]}
                        value={targetValue}
                        placeholder='Select TikTok Shop country'
                    />
                    <hr></hr>
                    <Button onClick={TargetSourceHandler} thickness='large' length={"fullBtn"}>
                        Connect TikTok Shop Account
                    </Button>
                    <FlexLayout spacing='extraTight' valign='center'>
                        <TextStyles textcolor='light'>
                            Don't have a TikTok Shop account?
                        </TextStyles>
                        <TextLink label="Register at TikTok Shop Account" />
                    </FlexLayout>
                </FlexLayout>
            </Card>
        </>
    )
}

export default TargetConnection