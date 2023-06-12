import { Button, Card, FallBack, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import CrossAnimated from '../../../../assets/images/svg/CrossAnimated'
import { useLocation} from 'react-router-dom';
import LoaderComponent from '../../utility/commonComponent/LoaderComponent';
function Response() {
    const location = useLocation();
    const [success, setSuccess] = useState<string | null>(null)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchParamValue: any = searchParams.get('success');
        setSuccess(searchParamValue)
    }, []);
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