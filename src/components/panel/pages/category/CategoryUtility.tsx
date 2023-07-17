import { Alert, Button, Card, ChoiceList, FlexChild, FlexLayout, Image, Modal, Popover, Select, TextField, TextLink, TextStyles } from "@cedcommerce/ounce-ui"
import { useEffect, useState } from "react"
import { Trash2 } from "react-feather"
import { useDispatch } from "react-redux"
import actions from "../../../../assets/images/png/menu.png"
import { callApi } from "../../../../core/ApiMethods"
import { showToast } from "../../../../redux/ReduxSlice"


export const CategoryActions = (_props: any) => {
    const { id, setDeleteCheck } = _props
    const [openActions, setOpenActions] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [btnLoader, setBtnLoader] = useState<boolean>(false);
    const dispatch = useDispatch()
    const deleteTemplateHandler = () => {
        setBtnLoader(true)
        callApi("GET", `connector/profile/deleteProfile?id=${id}`, {}, "extraHeaders")
            .then((res: any) => {
                setBtnLoader(false)
                if (res.success === true) {
                    setOpenModal(false)
                    dispatch(showToast({
                        type: "success",
                        message: res.message
                    }))
                    setDeleteCheck(true)
                } else {
                    dispatch(showToast({
                        type: "error",
                        message: res.message
                    }))
                }
            })
    }
    return (
        <>
            <Popover
                activator={<Button customClass="action-button" onClick={() => setOpenActions(!openActions)} type='Outlined'>
                    <Image
                        fit="cover"
                        height={20}
                        radius="corner-radius"
                        src={actions}
                        width={20}
                    />
                </Button>}
                open={openActions}
                onClose={() => setOpenActions(!openActions)}>
                <FlexLayout halign="start" direction="vertical">
                    <Button onClick={() => { setOpenModal(!openModal) }} customClass="action-delete-btn" icon={<Trash2 />} type="DangerPlain">Delete</Button>
                </FlexLayout>
            </Popover>
            <Modal
                close={() => { setOpenModal(!openModal) }}
                heading="Permission Required"
                modalSize="small"
                primaryAction={{
                    content: 'Confirm',
                    loading: btnLoader,
                    type: "Danger",
                    onClick: deleteTemplateHandler
                }}
                open={openModal}>
                Deleting this category template will unassign the product(s) under the profile and assign them to the Default
                profile. Do you wish to continue with deletion?
            </Modal>
        </>
    )
}

export const RuleGroup = (props: any) => {
    const { data, setRuleComponent, id, parentType, parentCondition, parentValue } = props
    const [conditionOptions, setConditionOptions] = useState([])
    const [state, setState] = useState({
        type: parentType !== "" ? parentType : "title",
        condition: parentCondition !== "" ? parentCondition : "=="
    })
    const [selectOptions, setSelectOptions] = useState<any>([])
    const [brandChoiseListOptions, setBrandChoiceListOptions] = useState<any>([])
    const [cateChoiseListOptions, setCateChoiceListOptions] = useState<any>([])
    const [value, setValue] = useState<string>(parentValue !== "" ? parentValue : "")
    const [choiseListArr, setChoiseListArr] = useState<any>(parentValue !== "" && parentValue.includes(",") ? parentValue.split(',') : [])
    const { condition, type } = state
    const allCondition: any = [
        {
            label: 'Equal',
            value: '=='
        },
        {
            label: 'Not Equal',
            value: '!='
        },
        {
            label: 'Contain',
            value: '%LIKE%'
        },
        {
            label: 'Not Contain',
            value: '!%LIKE%'
        },
    ]
    const twoCondition: any = [
        {
            label: 'Equal',
            value: '=='
        },
        {
            label: 'Not Equal',
            value: '!='
        },
    ]
    function filterArray(data: any) {
        const filteredData = [];
        for (const item of data) {
            if (item.label !== null && item.value !== null) {
                filteredData.push(item);
            }
        }
        return filteredData;
    }
    useEffect(() => {
        setConditionOptions(allCondition)
        data.forEach((element: any) => {
            if (element.code === "type") {
                setSelectOptions(filterArray(element.options))
            } else if (element.code === "brand") {
                setBrandChoiceListOptions(filterArray(element.options))
            } else if (element.code === "categories") {
                setCateChoiceListOptions(filterArray(element.options))
            }
        });
    }, [])
    useEffect(() => {
        setRuleComponent((prevRuleComponent: any) => {
            const updatedRuleComponent = [...prevRuleComponent];
            const index = updatedRuleComponent.findIndex((obj) => obj.id === id);
            if (index !== -1) {
                updatedRuleComponent[index] = {
                    ...updatedRuleComponent[index],
                    str: {
                        type: type,
                        condition: condition,
                        value: value,
                    },
                };
            }
            return updatedRuleComponent;
        });
    }, [type, condition, value])
    return (
        <FlexLayout halign="fill" spacing="loose">
            <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="33">
                <Select
                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                    onChange={(e) => {
                        setState({
                            ...state,
                            type: e
                        })
                        if (e === "title") {
                            setConditionOptions(allCondition)
                        } else {
                            setConditionOptions(twoCondition)
                        }

                    }}
                    onblur={function noRefCheck() { }}
                    options={[
                        {
                            label: 'Title',
                            value: 'title'
                        },
                        {
                            label: 'Sku',
                            value: 'sku'
                        },
                        {
                            label: 'Product Type',
                            value: 'type'
                        },
                        {
                            label: 'Brand',
                            value: 'brand'
                        },
                        {
                            label: 'Category',
                            value: 'category'
                        },
                    ]}
                    searchEable
                    value={type}
                />
            </FlexChild>
            <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="33">
                <Select
                    helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                    onChange={(e) => {
                        setState({
                            ...state,
                            condition: e
                        })
                    }}
                    onblur={function noRefCheck() { }}
                    options={conditionOptions}
                    searchEable
                    value={condition}
                />
            </FlexChild>
            <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="33">
                <>
                    {type === "title" || type === "sku" ?
                        <TextField
                            placeHolder="Enter Value"
                            onChange={(e) => {
                                setValue(e)

                            }}
                            value={value}
                        /> :
                        type === "type" ?
                            <Select
                                helpIcon={<svg fill="none" height="20" stroke="#c3c3c3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>}
                                onChange={(e) => {
                                    setValue(e)
                                }}
                                onblur={function noRefCheck() { }}
                                options={selectOptions}
                                searchEable
                                value={value}
                            /> :
                            type === "brand" || type === "category" ?
                                <ChoiceList
                                    ellipsis
                                    onChange={(e) => {
                                        let tempArr = []
                                        if (choiseListArr.includes(e)) {
                                            const updatedValue = choiseListArr.filter((item: any) => item !== e);
                                            tempArr = updatedValue
                                            setChoiseListArr(updatedValue);
                                            const string = tempArr.join(',');
                                            setValue(string)
                                        } else {
                                            setChoiseListArr([...choiseListArr, e]);
                                            tempArr = choiseListArr
                                            tempArr.push(e)
                                            const string = tempArr.join(',');
                                            setValue(string)
                                        }
                                    }}
                                    onCreatable={function noRefCheck() { }}
                                    options={type === "brand" ? brandChoiseListOptions : cateChoiseListOptions}
                                    placeholder={choiseListArr.length === 0 ? "Select Value" : ""}
                                    popoverContainer="body"
                                    searchEable
                                    showBadges
                                    thickness="thick"
                                    value={choiseListArr}
                                /> : null
                    }
                </>

            </FlexChild>
        </FlexLayout>
    )
}

export const ViewRules = (_props: any) => {
    const { rule } = _props;
    const [openModal, setOpenModal] = useState<boolean>(false);
    let operator = ""
    let allrule: any = []
    function parseStringToObjectArray(string: any) {
        const conditions: any = {
            "==": "Equals",
            "!=": "Not Equals",
            "%LIKE%": "Contains",
            "!%LIKE%": "Not Contains",
            "<=": "Less Than Equals",
            ">=": "Greater Than Equals",
        };

        const parts = string.split(" ");
        let obj = {}
        if (parts.length >= 3 && parts[1] in conditions) {
            const field = parts.shift();
            const operator = parts.shift();
            const value = parts.join(" ");
            const condition = conditions[operator];
            obj = {
                Rule: field,
                Condition: condition,
                Values: value,
            };
        }
        return obj;
    }
    if (rule.includes("&&")) {
        let step1 = rule.split("( ")
        let step2 = step1[1];
        let step3 = step2.split(" )")
        let step4 = step3[0].split(" && ")
        step4.forEach((element: any) => {
            allrule.push(parseStringToObjectArray(element));
        });
        operator = "All"
    } else if (rule.includes("||")) {
        const string = rule;
        // Remove the outer parentheses
        const stringWithoutParentheses = string.slice(1, -1);
        // Split the string by " || " and remove any leading/trailing spaces
        const arr = stringWithoutParentheses.split(" || ").map((item: any) => item.trim());
        const updatedArray = arr.map((item: any) => item.replace(/^\(\s*|\s*\)$/g, ''));
        updatedArray.forEach((element: any) => {
            allrule.push(parseStringToObjectArray(element));
        });
        operator = "Any"
    } else {
        operator = "Any"
        let step1 = rule.split("( ")
        let step2 = step1;
        let step3 = step2[1].split(" ) ")
        let finalString = step3[0]
        allrule.push(parseStringToObjectArray(finalString));
    }

    return (<>
        <TextLink onClick={() => { setOpenModal(!openModal) }} label={"View Rule"} />
        <FlexLayout >
            <Modal
                close={() => { setOpenModal(!openModal) }}
                heading="Rule Groups"
                modalSize="medium"
                open={openModal}>
                <FlexLayout spacing="loose" direction="vertical">
                    <Alert
                        destroy={false}
                        onClose={function noRefCheck() { }}
                        type="info"
                    >
                        Query Condition - {operator}
                    </Alert>
                    <Card cardType="Subdued">
                        <FlexLayout wrap="noWrap" >
                            <div className="rulesContent">
                                <TextStyles fontweight="bold">
                                    S.No.
                                </TextStyles>
                            </div>
                            <div className="rulesContent">
                                <TextStyles fontweight="bold">
                                    Rule
                                </TextStyles>
                            </div>
                            <div className="rulesContent">
                                <TextStyles fontweight="bold">
                                    Condition
                                </TextStyles>
                            </div>
                            <div className="rulesContent">
                                <TextStyles fontweight="bold">
                                    Values
                                </TextStyles>
                            </div>
                        </FlexLayout>
                    </Card>
                    <Card>
                        <FlexLayout spacing="extraLoose" direction="vertical">
                            {allrule.length !== 0 ?
                                allrule.map((val: any, index: number) => (
                                    <FlexLayout wrap="noWrap" key={index}>
                                        <div className="rulesContent">
                                            <TextStyles utility="rulesContent" fontweight="bold">
                                                {index + 1}
                                            </TextStyles>
                                        </div>
                                        <div className="rulesContent">
                                            <TextStyles utility="rulesContent" fontweight="bold">
                                                {val.Rule}
                                            </TextStyles>
                                        </div>
                                        <div className="rulesContent">
                                            <TextStyles utility="rulesContent" fontweight="bold">
                                                {val.Condition}
                                            </TextStyles>
                                        </div>
                                        <div className="rulesContent">
                                            <TextStyles fontweight="bold">
                                                {val.Values}
                                            </TextStyles>
                                        </div>
                                    </FlexLayout>
                                )) : null}
                        </FlexLayout>
                    </Card>
                </FlexLayout>
            </Modal>
        </FlexLayout>

    </>)
}