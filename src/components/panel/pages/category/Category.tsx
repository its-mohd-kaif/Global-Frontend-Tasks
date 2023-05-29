import { AutoComplete, Button, Card, FlexChild, FlexLayout, Grid, PageHeader, TextLink } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import { useNavigate } from 'react-router-dom'
import { CategoryActions } from './CategoryUtility'
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
        console.log(resData)
        let tempArr: any = []
        resData.forEach((element: any) => {
            let obj = {
                name: element.name,
                category: element.category,
                rules: <TextLink label={element.rules} />,
                total_products: <TextLink label={element.totalProduct} />,
                actions: <CategoryActions />
            }
            tempArr.push(obj)
            setAllData(tempArr)
            setData(tempArr.slice(start, end))
        })
    }, [start, end])
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
            <Card>
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
                </FlexLayout>
            </Card>
        </>
    )
}

export default Category