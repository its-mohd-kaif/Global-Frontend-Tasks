import { Alert, Button, Card, CheckBox, FlexChild, FlexLayout, FormElement, List, PageHeader, Radio, Select, Switcher, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, Trash2, Percent } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../../../../core/ApiMethods';
import { showToast } from '../../../../redux/ReduxSlice';
import CommonListingComponent from '../../utility/commonComponent/CommonListingComponent';
import { RuleGroup } from './CategoryUtility'
function Template() {
    const [ruleComponent, setRuleComponent] = useState<any>([]);
    const [state, setState] = useState({
        templateName: "",
        price_template: "0",
        price_template_value: "",
        price_template_value_error: false,
        saveBtnLoader: false
    })
    const [queryString, setQueryString] = useState<string>("");
    const [overRide, setOverRide] = useState<boolean>(false)
    const [error, setError] = useState({
        errorTemplateName: false,
        errorTemplateNameMess: ""
    })
    const [condition, setCondition] = useState<any>("||")
    const [ruleGroup, setRuleGroup] = useState<any>([])
    const [count, setCount] = useState<number | null>(null)
    // Regular expression pattern
    const regex = /^\d{0,4}$/;
    const { templateName, price_template, price_template_value, price_template_value_error,
        saveBtnLoader } = state
    const { errorTemplateName, errorTemplateNameMess } = error
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        callApi("GET", "tiktokhome/category/getRuleGroup?marketplace=tiktok", {}, "extraHeaders")
            .then((res: any) => {
                let randomId = Math.floor(Math.random() * 21212121);
                if (res.success === true) {
                    let obj = {
                        id: randomId,
                        str: {
                            type: "",
                            condition: "",
                            value: ""
                        }
                    }
                    setRuleComponent([...ruleComponent, obj])
                    setRuleGroup(res.data)
                }
            })
    }, [])

    useEffect(() => {
        let myString = objectArrayToString(ruleComponent, condition)
        setQueryString(myString)
    }, [ruleComponent, condition])

    function objectArrayToString(objArray: any, optr: any) {
        const strArray = objArray.map((obj: any) => {
            const { type, condition, value } = obj.str;
            if (optr === "||") {
                return ` ( ${type} ${condition} ${value} ) `;
            } else {
                return ` ${type} ${condition} ${value} `;
            }
        });

        if (optr === "&&") {
            return strArray.length > 1 ? `(${strArray.join(` ${optr} `)})` : strArray[0];
        } else if (optr === "||") {
            return strArray.length > 1 ? `${strArray.join(` ${optr} `)}` : strArray[0];
        } else {
            return "";
        }
    }

    const handleFormChange = (value: string, name: string) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (value === "") {
            setError({
                errorTemplateName: true,
                errorTemplateNameMess: "Category Template Name cannot be empty *"
            })
        } else if (value.length > 80) {
            setError({
                errorTemplateName: true,
                errorTemplateNameMess: "Category Template name must be unique and should not exceed 80 characters."
            })
        } else if (value.includes('  ')) {
            setError({
                errorTemplateName: true,
                errorTemplateNameMess: "Category Template Name can not contain multiple spaces or special characters"
            })
        }
        else {
            setError({
                errorTemplateName: false,
                errorTemplateNameMess: ""
            })
        }
    };

    const addMoreHandler = () => {
        let randomId = Math.floor(Math.random() * 21212121);
        let obj = {
            id: randomId,
            str: {
                type: "",
                condition: "",
                value: ""
            }
        }
        setRuleComponent([...ruleComponent, obj])
        setCount(null)
    }
    const deleteRuleHandler = (id: number) => {
        const updatedComponent = ruleComponent.filter((element: any) => element.id !== id);
        setRuleComponent(updatedComponent);
    };
    const runQueryHandler = () => {

        let payloadForGetQueryProduct = {
            "source": {
                "shopId": "241",
                "marketplace": "bigcommerce"
            },
            "target": {
                "shopId": "313",
                "marketplace": "tiktok"
            },
            "query": queryString,
            "activePage": 1,
            "limit": 10,
            "overWriteExistingProducts": overRide,
            "useRefinProduct": true,
            "useForcedRefineProductTable": true
        }
        let payloadForGetQueryProductCount = {
            "source": {
                "shopId": "241",
                "marketplace": "bigcommerce"
            },
            "target": {
                "shopId": "313",
                "marketplace": "tiktok"
            },
            "query": queryString,
            "overWriteExistingProducts": overRide,
            "useForceQueryUpdate": true
        }
        callApi("POST", "connector/profile/getQueryProducts", payloadForGetQueryProduct, "extraHeader")
            .then((res: any) => {
                if (res.success === true) {
                    callApi("POST", "connector/profile/getQueryProductsCount", payloadForGetQueryProductCount, "extraHeader")
                        .then((res: any) => {
                            if (res.success === true) {
                                setCount(res.data.count)
                            }
                        })
                }
            })


    }

    let reduxState = useSelector((redux: any) => redux.redux.attributes_mapping)
    const reduxChooseCategory = useSelector((redux: any) => redux.redux)
    const SaveHandler = () => {
        setState({
            ...state,
            saveBtnLoader: true
        })
        const product_attributes: any = {};
        const variation_attributes: any = {};
        for (const key in reduxState) {
            if (reduxState.hasOwnProperty(key)) {
                if ('customSelectValuesLength' in reduxState[key]) {
                    product_attributes[key] = reduxState[key];
                } else {
                    variation_attributes[key] = reduxState[key];
                }
            }
        }
        let obj = {
            data: {
                attributes_mapping: reduxState,
                category_id: {
                    label: reduxChooseCategory.chooseCategory.selectValue,
                    value: reduxChooseCategory.chooseCategory.selectCategory_id,
                },
                data: [
                    {
                        data: {
                            product_attributes: product_attributes,
                            variation_attributes: variation_attributes
                        },
                        data_type: "attribute_data",
                        id: 1
                    },
                    {
                        data: {
                            price_template: price_template,
                            price_template_value: price_template_value
                        },
                        data_type: "price_optimize",
                        id: 2
                    }
                ],
                name: templateName,
                overWriteExistingProducts: overRide,
                query: queryString,
                targets: [
                    {
                        target_marketplace: "tiktok",
                        attributes_mapping: reduxState,
                        shops: [
                            {
                                shop_id: "313",
                                active: "1",
                                warehouses: [
                                    {
                                        warehouse_id: "1111",
                                        active: "1",
                                        attributes_mapping: reduxState,
                                        sources: [
                                            {
                                                source_marketplace: "bigcommerce",
                                                attributes_mapping: reduxState,
                                                shops: [
                                                    {
                                                        shop_id: "241",
                                                        active: "1",
                                                        warehouses: [
                                                            {
                                                                active: "1",
                                                                attributes_mapping: reduxState
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            useRefinProduct: true
        }
        let payload1 = {
            "name": templateName
        }
        callApi("POST", "connector/profile/validateProfieName", payload1, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    callApi("POST", "connector/profile/saveProfile", obj, "extraHeadears")
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
                                navigate(`/panel/${sessionStorage.getItem("user_id")}/category`)
                            } else {
                                dispatch(showToast({
                                    type: "error",
                                    message: res.message
                                }))
                            }
                        })
                }
            })

    }
    return (
        <>
            <PageHeader title="Category Template"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <Button loading={saveBtnLoader} onClick={SaveHandler} type="Primary">Save</Button>
                    </FlexLayout>
                }
            />
            <hr></hr>
            <br></br>
            <Card>
                <FlexLayout spacing='loose' direction='vertical'>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <FlexLayout spacing='extraTight'>
                                    <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Category Template Name</TextStyles>
                                    <TextStyles textcolor="negative">*</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                <TextField
                                    autocomplete="off"
                                    onChange={(e) => {
                                        handleFormChange(e, "templateName")
                                    }}
                                    error={errorTemplateName}
                                    placeHolder="Enter the Cateogry Template Name"
                                    type="text"
                                    showHelp={errorTemplateNameMess}
                                />
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                    <hr></hr>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <FlexLayout direction='vertical' spacing='extraTight'>
                                    <FlexLayout spacing='extraTight'>
                                        <TextStyles fontweight='bold' type="SubHeading" subheadingTypes='XS-1.6'>Assign Product to the Template</TextStyles>
                                        <TextStyles textcolor="negative">*</TextStyles>
                                    </FlexLayout>
                                    <TextStyles textcolor='light'>
                                        Create Rule Group(s) (query) to fetch a particular set of the product(s) in the current profile.
                                    </TextStyles>
                                    <List
                                        type="disc"
                                    >
                                        <TextStyles textcolor="light">
                                            Select <span className='list-highlight'>Any Condition</span> to fetch the product(s) fulfilling any of the conditions created.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            Select <span className='list-highlight'>All Condition</span> to fetch the product(s) fulfilling all the conditions created.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            Click on <span className='list-highlight'>Add More</span> to add multiple conditions in the Rule Group.
                                        </TextStyles>
                                        <TextStyles textcolor="light">
                                            Click on <span className='list-highlight'>Run Query</span> to fetch the number of the product(s) on the basis of the Rule Group(s) created.
                                        </TextStyles>
                                    </List>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                <Card title={"Rule Group"}
                                    primaryAction={{
                                        content: 'Run Query',
                                        type: 'Primary',
                                        onClick: runQueryHandler
                                    }}
                                    secondaryAction={{
                                        content: 'Add More',
                                        type: 'Outlined',
                                        onClick: addMoreHandler
                                    }}
                                >
                                    <FlexLayout desktopWidth='100' tabWidth='100' mobileWidth='100' spacing='loose' direction='vertical'>
                                        <FlexChild>
                                            <CheckBox
                                                id="two"
                                                labelVal="Override Existing Products"
                                                onClick={() => {
                                                    setOverRide(!overRide)
                                                }}
                                                checked={overRide}
                                            />
                                        </FlexChild>
                                        <FlexChild>
                                            <FormElement>
                                                <FlexLayout spacing='loose'>
                                                    <TextStyles>Product Must Match</TextStyles>
                                                    <Radio
                                                        checked={condition === "||" ? true : false}
                                                        id="||"
                                                        labelVal="Any Condition"
                                                        name="2"
                                                        onClick={() => {
                                                            setCondition("||")
                                                        }}
                                                        value={condition}
                                                    />
                                                    <Radio
                                                        checked={condition === "&&" ? true : false}
                                                        id="&&"
                                                        labelVal="All Conditions"
                                                        name="2"
                                                        onClick={() => {
                                                            setCondition("&&")
                                                        }}
                                                        value={condition}
                                                    />
                                                </FlexLayout>
                                            </FormElement>
                                        </FlexChild>
                                        <FlexLayout desktopWidth='100' tabWidth='100' mobileWidth='100' spacing='loose' direction='vertical'>
                                            {
                                                ruleComponent.map((val: any) =>
                                                (
                                                    <FlexLayout spacing='loose' key={val.id}>
                                                        <FlexChild desktopWidth='80' tabWidth='80' mobileWidth='80'>
                                                            {/* {val.comp} */}
                                                            <RuleGroup
                                                                data={ruleGroup}
                                                                setRuleComponent={setRuleComponent}
                                                                id={val.id}
                                                                parentType={val.str.type}
                                                                parentCondition={val.str.condition}
                                                                parentValue={val.str.value}
                                                            />
                                                        </FlexChild>
                                                        {ruleComponent.length > 1 ?
                                                            <FlexChild desktopWidth='20' tabWidth='20' mobileWidth='20'>
                                                                <Button
                                                                    onClick={() => deleteRuleHandler(val.id)}
                                                                    icon={<Trash2 color="#D92D20" size={20} />}
                                                                    type="DangerOutlined"
                                                                />
                                                            </FlexChild>
                                                            : null}
                                                    </FlexLayout>
                                                )
                                                )
                                            }
                                        </FlexLayout>
                                        <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                            <>
                                                {count === 0 ?
                                                    <Alert
                                                        destroy={false}
                                                        icon
                                                        onClose={function noRefCheck() { }}
                                                        type="warning"
                                                    >
                                                        No Product(s) found.
                                                    </Alert> : null}
                                            </>
                                        </FlexChild>
                                    </FlexLayout>
                                </Card>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>

                    <hr></hr>
                    {/* Call Componet that used here and also used in onboarding category template */}
                    <CommonListingComponent where={"template"} />
                    <hr></hr>
                    <FlexChild>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Profile Custom Pricing (Fixed or Percentage)</TextStyles>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                {/* <FlexLayout spacing='extraTight' direction='vertical'>
                                    <FlexChild>
                                        <FlexLayout halign='fill' spacing='loose'>
                                            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                <Select
                                                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                                    onChange={function noRefCheck() { }}
                                                    onblur={function noRefCheck() { }}
                                                    options={[
                                                        {
                                                            label: 'Percentage Increment',
                                                            value: '0'
                                                        },
                                                    ]}
                                                    searchEable
                                                    value="0"
                                                />
                                            </FlexChild>
                                            <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                                                <TextField
                                                    innerSufIcon={<Percent color='#70747E' size={18} />}
                                                    onChange={function noRefCheck() { }}
                                                    placeHolder="Enter Value"
                                                    type="text"
                                                    value=""
                                                />
                                            </FlexChild>
                                        </FlexLayout>
                                    </FlexChild>
                                    <FlexChild>
                                        <TextStyles textcolor='light'>The filtered product(s) will be uploaded on setup Shop with the updated price rule.</TextStyles>
                                    </FlexChild>
                                </FlexLayout> */}
                                <FlexLayout halign='center' direction='vertical'>
                                    <FlexLayout spacing='loose' direction='vertical' >
                                        <FlexChild>
                                            <FlexLayout desktopWidth={price_template === "0" ? "100" : "50"}
                                                tabWidth={price_template === "0" ? "100" : "50"}
                                                mobileWidth="100"
                                                spacing='loose' valign='center'>
                                                <Select
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
                                        {/* <FlexLayout valign='start' spacing='mediumTight'>
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
                                        </FlexLayout> */}
                                    </FlexLayout>
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                </FlexLayout>
            </Card>
        </>
    )
}

export default Template