import { AutoComplete, Button, Card, FlexChild, FlexLayout, Grid, Loader, PageHeader, Pagination, TextLink } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import { useNavigate } from 'react-router-dom'
import { callApi } from '../../../../core/ApiMethods'
import { CategoryActions, ViewRules } from './CategoryUtility'
import { TemplateData } from './TemplateData'
interface paginationObj {
    activePage: number
    countPerPage: number
}
function Category() {
    const navigate = useNavigate()
    const columns = [
        {
            align: 'left',
            dataIndex: 'name',
            key: 'name',
            title: 'Name',
            width: 100
        },
        {
            align: 'left',
            dataIndex: 'category',
            key: 'category',
            title: 'Category',
            width: 418
        },
        {
            align: 'left',
            dataIndex: 'rules',
            key: 'rules',
            title: "Rule(s)",
            width: 140
        },
        {
            align: 'left',
            dataIndex: 'total_products',
            key: 'total_products',
            title: 'Total Product(s)',
            width: 140
        },
        {
            align: 'center',
            dataIndex: 'actions',
            key: 'actions',
            title: 'Action(s)',
            width: 140
        },
    ]
    const [totalCount, setTotalCount] = useState<number>(0)
    const [data, setData] = useState<any>([]);
    const [loader, setLoader] = useState<boolean>(true)
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
    })
    const { activePage, countPerPage } = pagination;

    useEffect(() => {
        setLoader(true)
        callApi("GET", `connector/profile/getProfileDataCount?activePage=${activePage}&count=${countPerPage}`, {}, "extraHeader")
            .then((res: any) => {
                console.log("getProfileDataCount", res)
                if (res.success === true) {
                    setTotalCount(res.total_count)
                    callApi("GET", `connector/profile/getProfileData?activePage=${activePage}&count=${countPerPage}`, {}, "extraHeader")
                        .then((res: any) => {
                            setLoader(false)
                            console.log("getProfileData", res)
                            if (res.success === true) {
                                const resData = res.data.rows
                                let tempArr: any = []
                                resData.forEach((element: any) => {
                                    let obj = {
                                        name: element.name,
                                        category: element.category_id.label,
                                        // rules: <ViewRules rule={element.rules} />,
                                        rules: <TextLink label="View Rule" />,
                                        // total_products: <TextLink label={element.totalProduct} />,
                                        total_products: element.product_count[0]?.count !== undefined ?
                                            element.product_count[0].count :
                                            element.total_count !== undefined ? element.total_count
                                                : 0,
                                        actions: <CategoryActions />,
                                        key: Math.random() * 91919191
                                    }
                                    tempArr.push(obj)
                                    setData(tempArr)
                                })
                            }
                        })
                }
            })
    }, [pagination])

    /**
    * on count change pagination handler
    * @param val user select from grid 
    */
    const countChangeHandler = (val: any) => {
        setPagination({
            ...pagination,
            countPerPage: val
        })
    }
    /**
    * next page handler
    */
    const nextPageHandler = () => {
        setPagination({
            ...pagination,
            activePage: activePage + 1,
        })
    }
    /**
    * prev page handler function
     */
    const prevPageHandler = () => {
        setPagination({
            ...pagination,
            activePage: activePage - 1,
        })
    }
    /**
   * on enter change handler
   * @param val user press on grid
   */
    const onEnterChange = (val: number) => {
        setPagination({
            ...pagination,
            activePage: val,
        })
    }
    return (
        <>
            <PageHeader title="Category Template"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <Button type='Outlined'>Edit Default Template</Button>
                        <Button onClick={() => { navigate("/panel/category_template") }} type="Primary">Create Template</Button>
                    </FlexLayout>
                }
            />
            <hr></hr>
            <br></br>
            <Card cardType='Bordered'>
                <FlexLayout spacing='loose' direction='vertical'>
                    <FlexChild desktopWidth='33' tabWidth='50' mobileWidth='100'>
                        <AutoComplete
                            clearButton
                            clearFunction={function noRefCheck() { }}
                            extraClass=""
                            onChange={function noRefCheck() { }}
                            onClick={function noRefCheck() { }}
                            onEnter={function noRefCheck() { }}
                            options={[]}
                            placeHolder="Search category template"
                            popoverContainer="body"
                            popoverPosition="right"
                            setHiglighted
                            thickness="thick"
                            value=""
                        />
                    </FlexChild>
                    {loader === true ?
                        <Loader type='Loader1' />
                        :
                        <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                            <>
                                <Grid
                                    columns={columns}
                                    dataSource={data}
                                />
                                <Pagination
                                    countPerPage={countPerPage}
                                    currentPage={activePage}
                                    onCountChange={(e: any) => countChangeHandler(e)}
                                    onEnter={(e: any) => onEnterChange(e)}
                                    onNext={nextPageHandler}
                                    onPrevious={prevPageHandler}
                                    totalitem={totalCount}
                                    optionPerPage={[
                                        {
                                            label: '5',
                                            value: '5'
                                        },
                                        {
                                            label: '10',
                                            value: '10'
                                        },
                                        {
                                            label: '15',
                                            value: '15'
                                        },
                                    ]}
                                />
                            </>
                        </FlexChild>
                    }
                </FlexLayout>
            </Card>
        </>
    )
}

export default Category