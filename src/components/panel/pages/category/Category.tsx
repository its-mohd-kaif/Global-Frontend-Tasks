import { AutoComplete, Button, Card, FlexChild, FlexLayout, Grid, PageHeader, Pagination, TextLink } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import { useNavigate } from 'react-router-dom'
import { CategoryActions, ViewRules } from './CategoryUtility'
import { TemplateData } from './TemplateData'
interface paginationObj {
    activePage: number
    countPerPage: number
    start: number
    end: number
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
    const [allData, setAllData] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
        start: 0,
        end: 5,
    })
    const { activePage, countPerPage, start, end } = pagination;
    useEffect(() => {
        const resData = TemplateData
        let tempArr: any = []
        resData.forEach((element: any) => {
            let obj = {
                name: element.name,
                category: element.category,
                rules: <ViewRules rule={element.rules} />,
                total_products: <TextLink label={element.totalProduct} />,
                actions: <CategoryActions />,
                key:Math.random()*91919191
            }
            tempArr.push(obj)
            setAllData(tempArr)
            setData(tempArr.slice(start, end))
        })
    }, [start, end])
    /**
   * on count change pagination handler
   * @param val user select from grid 
   */
    const countChangeHandler = (val: any) => {
        let newGrid = allData.slice(0, val)
        setPagination({
            ...pagination,
            countPerPage: val
        })
        setData(newGrid)
    }
    /**
    * next page handler
    */
    const nextPageHandler = () => {

        let start = countPerPage * activePage;
        let end = countPerPage * activePage + countPerPage;
        setPagination({
            ...pagination,
            activePage: activePage + 1,
            start: start,
            end: end
        })
    }
    /**
    * prev page handler function
     */
    const prevPageHandler = () => {
        //for delay active state value we more decrement value by one
        let start = countPerPage * (activePage - 1) - countPerPage;
        let end = countPerPage * (activePage - 1);
        setPagination({
            ...pagination,
            activePage: activePage - 1,
            start: start,
            end: end
        })
    }
    /**
   * on enter change handler
   * @param val user press on grid
   */
    const onEnterChange = (val: number) => {
        let start = countPerPage * val - countPerPage;
        let end = countPerPage * val;
        setPagination({
            ...pagination,
            activePage: val,
            start: start,
            end: end
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
                        totalitem={allData.length}
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
                </FlexLayout>
            </Card>
        </>
    )
}

export default Category