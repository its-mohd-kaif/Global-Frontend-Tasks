import { Button, Card, FallBack, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import CrossAnimated from '../../../../assets/images/svg/CrossAnimated'
import { useLocation, useNavigate } from 'react-router-dom';
import { callApi } from '../../../../core/ApiMethods';
import { useDispatch, useSelector } from 'react-redux';
import { stepCompleted } from '../../../../redux/ReduxSlice';
import LoaderComponent from '../../utility/commonComponent/LoaderComponent';
function Response() {
    const location = useLocation();
    const [success, setSuccess] = useState<string | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reduxState = useSelector((redux: any) => redux.redux)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchParamValue: any = searchParams.get('success');
        setSuccess(searchParamValue)
        // if (searchParamValue === "true") {
        //     callApi("POST", "tiktokhome/frontend/getStepCompleted")
        //         .then((res: any) => {
        //             if (res.success === true) {
        //                 console.log("getStepCompleted", res)
        //                 setStepCompleted(res.data)
        //             }
        //         })

        //     callApi("POST", "connector/get/all")
        //         .then((res: any) => {
        //             if (res.success === true) {
        //                 console.log("connector/get/all", res)
        //                 if (res.data.shopify?.installed.length > 0) {
        //                     navigate(`/panel/${reduxState.user_id}/onbording`)
        //                 }
        //             }
        //         })
        // }
    }, []);

    // const setStepCompleted = (data: number) => {
    //     let payload = {
    //         step: 0
    //     }
    //     callApi("POST", "tiktokhome/frontend/stepCompleted", payload)
    //         .then((res: any) => {
    //             console.log("stepCompleted", res)
    //         })
    // }
    if (success === "false") {
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
    } else {
        return <LoaderComponent />
    }

}

export default Response