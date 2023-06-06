import { Button, Card, FallBack, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import CrossAnimated from '../../../../assets/images/svg/CrossAnimated'
import { useLocation, useNavigate } from 'react-router-dom';
import { callApi } from '../../../../core/ApiMethods';
import { useDispatch, useSelector } from 'react-redux';
import { stepCompleted } from '../../../../redux/ReduxSlice';
function Response() {
    const location = useLocation();
    const [success, setSuccess] = useState<string | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reduxState = useSelector((redux: any) => redux.redux)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchParamValue: any = searchParams.get('success');
        console.log("SEARCH Params", searchParamValue)
        setSuccess(searchParamValue)
        // if (searchParamValue === "true") {
        //     navigate(`/panel/${reduxState.user_id}/onboarding`)
        // }
    }, []);
    return (
        <div style={{ marginTop: "11rem" }}>
            <Card cardType="Subdued">
                <FallBack
                    action={<Button onAction={function noRefCheck() { }} thickness="large" type="Primary">Retry</Button>}
                    illustration={<CrossAnimated />}
                    subTitle={
                        <FlexLayout spacing='extraLoose' direction="vertical" halign="center">
                            <TextStyles alignment="center" fontweight="normal"
                                paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">
                                Incorrect Shopify store credentials!
                            </TextStyles>
                            <TextStyles alignment="center" fontweight="normal"
                                paragraphTypes="MD-1.4" type="Paragraph" utility="none">
                                Please wait we will be re-directing you soon
                            </TextStyles>
                        </FlexLayout>}
                    title="Error Occured"
                />
            </Card>
        </div>
    )
}

export default Response