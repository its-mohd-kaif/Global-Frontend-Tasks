
import { Button, ChoiceList, FlexChild, FlexLayout, Select, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import GrayCheckSvg from '../../../../assets/images/svg/GrayCheckSvg'
import GreenCheckSvg from '../../../../assets/images/svg/GreenCheckSvg'
import { RefreshCcw } from "react-feather"
import { useDispatch, useSelector } from 'react-redux'
import { attributesMappingMethod } from '../../../../redux/ReduxSlice'
/**
 * This Component will help me to achive to nested render when getAttributes api call
 * @param props in props we pass two object
 * row: every element
 * baseAttribute: when values key is undefined in element when we use baseAttribute
 *  its comes from getAttributeOptions call
 * @returns its return every element of UI based on api response data
 */

function AttributeMappingMethod(props: any) {
    const { row, baseAttribute } = props;
    // that redux state will help me to create nested object keys for sending payload 
    let reduxState = useSelector((redux: any) => redux.redux.attributes_mapping)
    const [value, setValue] = useState<any | any[]>(row.is_multiselect === true ? [] : "");
    const [choiceListArr, setChoiceListArr] = useState<any>([]);
    const [selectArr, setSelectArr] = useState<any>([]);
    const [optionTitle, setOptionTitle] = useState<any>([]);
    const [options, setOptions] = useState<any>([]);
    const [selectOptionTitle, setSelectOptionTitle] = useState<string>("0");
    const dispatch = useDispatch()

    useEffect(() => {
        if (row.attribute_type === 3) {
            let obj = {
                [row.id]: {
                    customSelectValuesLength: row.is_multiselect === true || valuePresent() === false ? value.length : 0,
                    displayName: row.name,
                    id: row.id,
                    required: row.required,
                    type: row.input_type === "select" || row.is_multiselect
                        ? "predefined"
                        : "fixed",
                    value: value
                }
            };
            dispatch(attributesMappingMethod(obj))
        } else {
            let obj = {
                [row.name]: {
                    displayName: row.name,
                    id: row.id,
                    required: row.required,
                    type: row.input_type === "select" || row.is_multiselect
                        ? "predefined"
                        : "fixed",
                    value: value
                }
            };
            dispatch(attributesMappingMethod(obj))
        }
    }, [])

    useEffect(() => {
        ChangeValueRedux()
    }, [value])

    const ChangeValueRedux = () => {
        if (row.attribute_type === 3) {
            if (reduxState[row.id]?.id !== undefined) {
                let valueArr = Object.values(reduxState[row.id])
                if (valueArr.includes(row.id)) {
                    if (Object.values(reduxState).some((obj: any) => obj.id === row.id)) {
                        reduxState = {
                            ...reduxState,
                            [row.id]: {
                                ...reduxState[row.id],
                                value: value === undefined ? "" : value
                            }
                        }
                        dispatch(attributesMappingMethod(reduxState))
                    }
                }
            }
        } else {
            if (reduxState[row.name]?.displayName !== undefined) {
                let valueArr = Object.values(reduxState[row.name])
                if (valueArr.includes(row.name)) {
                    if (Object.values(reduxState).some((obj: any) => obj.displayName === row.name)) {
                        reduxState = {
                            ...reduxState,
                            [row.name]: {
                                ...reduxState[row.name],
                                value: value === undefined ? "" : value
                            }
                        }
                        dispatch(attributesMappingMethod(reduxState))
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (row.required === false) {
            setOptionTitle(
                [
                    {
                        label: 'Select TTS Recommended Values',
                        value: '0'
                    }
                ]
            )
        } else if (row.required === true) {
            if (row.value === undefined) {
                setOptionTitle(
                    [
                        {
                            label: 'Select BigCommerce Attributes',
                            value: '0'
                        },
                        {
                            label: 'Set Custom',
                            value: 'Set Custom'
                        }
                    ]
                )
            } else {
                setOptionTitle([])
            }
        }
        if (row.values === undefined) {
            setValue(row.value)
            if (row.option !== undefined) {
                let tempArr: any = []
                row.option.forEach((element: any) => {
                    let obj = {
                        label: element,
                        value: element,
                    }
                    tempArr.push(obj)
                });
                setOptions(tempArr)
            } else {
                let tempArr: any = baseAttribute
                if (row.name.match("Package")) {
                    if (baseAttribute.some((obj: any) => obj.label === row.name.split("Package ")[1])) {
                        setValue(row.name.split("Package ")[1]);
                    } else {
                        let obj = {
                            label: row.name.split("Package ")[1],
                            value: row.name.split("Package ")[1],
                        }
                        tempArr.push(obj);
                        setValue(row.name.split("Package ")[1]);
                    }
                }
                setOptions(tempArr)
            }
        }
        if (row.is_multiselect === true && row.attribute_type === 3) {
            let tempArr: any = []
            row.values.forEach((element: any) => {
                let obj = {
                    label: element.name,
                    value: element.name,
                    id: element.id
                }
                tempArr.push(obj)
            });
            setChoiceListArr(tempArr)
        } else if (row.is_multiselect === false && row.attribute_type === 3) {
            let tempArr: any = []
            row.values.forEach((element: any) => {
                let obj = {
                    label: element.name,
                    value: element.name,
                    id: element.id
                }
                tempArr.push(obj)
            });
            setSelectArr(tempArr)
        }
    }, [])
    const valuePresent = () => {
        if ((Array.isArray(value) && value.length === 0) || value === "" || value === undefined) {
            return true
        }
        return false
    }
    const refreshValueHandler = () => {
        if (Array.isArray(value)) {
            setValue([])
        } else {
            setValue("")
        }
    }
    return (
        <>
            <FlexLayout spacing='loose' valign='baseline' halign='fill'>
                <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                    <FlexLayout spacing='loose'>
                        <FlexChild>
                            {valuePresent() ? <GrayCheckSvg /> : <GreenCheckSvg />}
                        </FlexChild>
                        <FlexChild>

                            <FlexLayout spacing='extraTight'>
                                <TextStyles>{row.name}</TextStyles>
                                {row.required === true ?
                                    <TextStyles textcolor="negative">*</TextStyles>
                                    : null}
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </FlexChild>
                <FlexChild desktopWidth='50' tabWidth='50' mobileWidth='50'>
                    <FlexLayout spacing='loose' desktopWidth='100' tabWidth='100' mobileWidth='100' direction='vertical'>
                        {optionTitle.length !== 0 && row.attribute_type === 3 ?
                            <Select
                                onChange={(e) => {
                                    setSelectOptionTitle(e)
                                }}
                                onblur={function noRefCheck() { }}
                                options={optionTitle}
                                value={selectOptionTitle}
                                placeholder='Select TTS Recommended Values'
                            /> : null}
                        {row.is_multiselect === true ?
                            <ChoiceList
                                ellipsis
                                onChange={(e) => {
                                    if (Array.isArray(value)) {
                                        if (value.includes(e)) {
                                            const updatedValue = value.filter(item => item !== e);
                                            setValue(updatedValue);
                                        } else {
                                            setValue([...value, e]);
                                        }
                                    } else {
                                        let tempArr: any = [];
                                        tempArr.push(e)
                                        setValue(tempArr);
                                    }
                                }}
                                onCreatable={() => { }}
                                options={row.values !== undefined ? choiceListArr : options}
                                placeholder={(Array.isArray(value) && value.length === 0) || value === "" || value === undefined ? "Select items" : ""}
                                popoverContainer="body"
                                searchEable
                                showBadges
                                thickness="thick"
                                value={value}
                            /> :
                            <FlexChild>
                                <FlexLayout valign='center' spacing='tight'>
                                    <FlexChild desktopWidth={valuePresent() ? "100" : "80"} tabWidth={valuePresent() ? "100" : "80"}
                                        mobileWidth={valuePresent() ? "100" : "80"}>
                                        {selectOptionTitle === "Set Custom" ?
                                            <TextField
                                                id=""
                                                onChange={(e) => {
                                                    setValue(e)
                                                }}
                                                type="text"
                                                value={value}
                                                innerSufIcon={row.default_unit[0]}
                                            /> :
                                            <Select
                                                onChange={(e) => {
                                                    setValue(e)
                                                }}
                                                onblur={function noRefCheck() { }}
                                                options={row.values !== undefined ? selectArr : options}
                                                placeholder='Select'
                                                searchEable
                                                value={value}
                                            />}
                                    </FlexChild>
                                    <FlexChild desktopWidth='20' tabWidth='20' mobileWidth='20'>
                                        <>
                                            {valuePresent() ? null : <Button
                                                onClick={refreshValueHandler}
                                                icon={<RefreshCcw size={18} />}
                                                type="Outlined"
                                            />}
                                        </>
                                    </FlexChild>

                                </FlexLayout>
                            </FlexChild>
                        }
                    </FlexLayout>
                </FlexChild>
            </FlexLayout>
        </>
    )
}

export default AttributeMappingMethod