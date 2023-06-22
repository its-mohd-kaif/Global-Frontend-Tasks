import { Card, FlexChild, FlexLayout, Select, Switcher, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { ArrowRight } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../../../../core/ApiMethods';
import { showToast } from '../../../../redux/ReduxSlice';

interface DefaultSettingObj {
    price_template: string;
    price_template_value: string;
    price_template_value_error: boolean;
    product_auto_import: boolean;
    product_auto_delete: boolean;
    saveBtnLoader: boolean;
}

function DefaultSetting() {
    const [state, setState] = useState<DefaultSettingObj>({
        price_template: "0",
        price_template_value: "",
        price_template_value_error: false,
        product_auto_import: false,
        product_auto_delete: false,
        saveBtnLoader: false
    })
    // Regular expression pattern
    const regex = /^\d{0,4}$/;
    const { price_template, price_template_value, price_template_value_error,
        product_auto_delete, product_auto_import, saveBtnLoader } = state

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user_id = useSelector((redux: any) => redux.redux.user_id)

    const saveHandler = () => {
        setState({
            ...state,
            saveBtnLoader: true
        })
        let payload = {
            "data": [
                {
                    "data": {
                        "marketplace_sync": {
                            "inventory": true,
                            "price": true,
                            "product_info": true
                        }
                    },
                    "group_code": "marketplace"
                },
                {
                    "data": {
                        "currency_conversion": 1,
                        "exemption_of_identifier_code": "yes",
                        "exemption_of_identifier_value": "1",
                        "price_update": {
                            "price_template": price_template,
                            "price_template_value": price_template_value
                        },
                        "product_auto_create": false,
                        "product_auto_delete": product_auto_delete,
                        "product_auto_import": product_auto_import,
                        "sale_price": true,
                        "threshold_inventory": "1"
                    },
                    "group_code": "listing"
                },
                {
                    "data": {
                        "order_sync": true,
                        "sync_order_cancellation_status": true
                    },
                    "group_code": "order"
                }
            ]
        }
        callApi("POST", "connector/config/saveConfig", payload, "extraHeadears")
            .then((res: any) => {
                setState({
                    ...state,
                    saveBtnLoader: false
                })
                if (res.success === true) {
                    dispatch(showToast({
                        type: "success",
                        message: res.message
                    }))
                    callApi("POST", "tiktokhome/frontend/getStepCompleted")
                        .then((res: any) => {
                            if (res.success === true) {
                                let payload1 = {
                                    step: 4
                                }
                                callApi("POST", "tiktokhome/frontend/stepCompleted", payload1)
                                    .then((res: any) => {
                                        if (res.success === true) {
                                            navigate(`/panel/${user_id}/dashboard`)
                                        }
                                    })
                            }
                        })
                } else {
                    dispatch(showToast({
                        type: "error",
                        message: res.message
                    }))
                }
            })
    }
    return (
        <Card
            title={"Default Configuration"}
            subTitle={"Set default configuration settings to upload product(s) on Michaels Shop"}
            primaryAction={{
                content: 'Save',
                type: 'Primary',
                icon: <ArrowRight size={"18"} />,
                iconAlign: "right",
                onClick: saveHandler,
                loading: saveBtnLoader
            }}
        >
            <FlexLayout halign='center' direction='vertical'>
                <FlexLayout spacing='loose' direction='vertical' >
                    <FlexChild>
                        <FlexLayout desktopWidth={price_template === "0" ? "100" : "50"}
                            tabWidth={price_template === "0" ? "100" : "50"}
                            mobileWidth="100"
                            spacing='loose' valign='center'>
                            <Select
                                name="Product Custom Pricing (Fixed or Percentage)"
                                selectHelp="Price will be set on Arise according to the above rule."
                                onChange={(e) => {
                                    if (e !== "0") {
                                        setState({
                                            ...state,
                                            price_template: e,
                                            price_template_value_error: true
                                        })
                                    } else {
                                        setState({
                                            ...state,
                                            price_template: e,
                                            price_template_value_error: false
                                        })
                                    }

                                }}
                                onblur={function noRefCheck() { }}
                                options={[
                                    {
                                        label: 'None',
                                        value: '0'
                                    },
                                    {
                                        label: 'Fixed Decrement',
                                        value: 'fixed_decrement'
                                    },
                                    {
                                        label: 'Fixed Increment',
                                        value: 'fixed_increment'
                                    },
                                    {
                                        label: 'Percent Decrement',
                                        value: 'percent_decrement'
                                    },
                                    {
                                        label: 'Percent Increment',
                                        value: 'percent_increment'
                                    },
                                ]}
                                required
                                value={price_template}
                            />
                            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='100'>
                                <>
                                    {
                                        price_template !== "0" ?
                                            <TextField
                                                id=""
                                                onChange={(e) => {
                                                    if (regex.test(e) || e === '') {
                                                        if (e === "") {
                                                            setState({
                                                                ...state,
                                                                price_template_value: e,
                                                                price_template_value_error: true
                                                            })
                                                        } else {
                                                            setState({
                                                                ...state,
                                                                price_template_value: e,
                                                                price_template_value_error: false
                                                            })
                                                        }

                                                    }
                                                }}
                                                type="text"
                                                placeHolder='Enter Price'
                                                value={price_template_value}
                                                error={price_template_value_error}
                                            /> : null
                                    }
                                </>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                    <FlexLayout valign='start' spacing='mediumTight'>
                        <Switcher
                            checked={product_auto_import}
                            onChange={() => {
                                setState({
                                    ...state,
                                    product_auto_import: !product_auto_import
                                })
                            }}
                            textAligh="right"
                        />
                        <FlexChild>
                            <FlexLayout direction='vertical'>
                                <TextStyles>Product Auto Import</TextStyles>
                                <TextStyles textcolor='light'>Enable to automatically import product(s) to the app</TextStyles>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                    <FlexLayout valign='start' spacing='mediumTight'>
                        <Switcher
                            checked={product_auto_delete}
                            onChange={() => {
                                setState({
                                    ...state,
                                    product_auto_delete: !product_auto_delete
                                })
                            }}
                            textAligh="right"
                        />
                        <FlexChild>
                            <FlexLayout direction='vertical'>
                                <TextStyles>Product Auto Delete</TextStyles>
                                <FlexChild>
                                    <>
                                        <TextStyles textcolor='light'>
                                            Enable to automatically delete from Michaels Shop when product(s) is deleted from
                                        </TextStyles>
                                        <TextStyles textcolor='light'>
                                            Magento Store. Individual variants won’t be deleted
                                        </TextStyles>
                                        <br></br>
                                    </>
                                </FlexChild>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </FlexLayout>
            </FlexLayout>
        </Card>
    )
}

export default DefaultSetting