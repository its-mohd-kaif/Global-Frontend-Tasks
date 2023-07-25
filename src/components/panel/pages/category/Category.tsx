import { Button, Card, FallBack, FlexChild, FlexLayout, Grid, Loader, PageHeader, Pagination, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText } from "react-feather"
import { useNavigate } from 'react-router-dom'
import NoTemplateSvg from '../../../../assets/images/svg/NoTemplateSvg'
import { callApi } from '../../../../core/ApiMethods'
import { SkCategory } from '../../../skeleton/SkCategory'
import { CategoryActions, ViewRules } from './CategoryUtility'
interface paginationObj {
    activePage: number;
    countPerPage: number;
    next: string | null;
    prev: string | null;
}
interface helpPaginationObj {
    nextPage: string | null;
    prevPage: string | null;
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
        next: null,
        prev: null
    })
    const [helpPagination, setHelpPagination] = useState<helpPaginationObj>({
        nextPage: "",
        prevPage: ""
    })
    const [search, setSearch] = useState<string>("")
    const [deleteCheck, setDeleteCheck] = useState<boolean>(false)
    const { activePage, countPerPage, next, prev } = pagination;
    const { nextPage, prevPage } = helpPagination

    useEffect(() => {
        setLoader(true)
        setDeleteCheck(false)
        makeApiCall()
    }, [pagination, deleteCheck])

    useEffect(() => {
        if (search !== "") {
            const getData = setTimeout(() => {
                setLoader(true)
                makeApiCall()
            }, 3000);
            return () => clearInterval(getData);
        }
    }, [search])

    const makeApiCall = () => {
        callApi("GET", `connector/profile/getProfileDataCount?activePage=${activePage}&count=${countPerPage}${search !== "" ? `&name=${search}` : ""}`, {}, "extraHeader")
            .then((res: any) => {
                if (res.success === true) {
                    setTotalCount(res.total_count)
                    callApi("GET", `connector/profile/getProfileData?activePage=${activePage}&count=${countPerPage}${next !== null ? `&next=${next}` : ""}${prev !== null ? `&prev=${prev}` : ""}${search !== "" ? `&name=${search}` : ""}`, {}, "extraHeader")
                        .then((res: any) => {
                            setLoader(false)
                            if (res.success === true) {
                                const resData = res.data.rows
                                let tempArr: any = []
                                resData.forEach((element: any) => {
                                    let obj = {
                                        name: element.name,
                                        category: element.category_id.label,
                                        rules: <ViewRules rule={element.query} />,
                                        total_products: element.product_count[0]?.count !== undefined ?
                                            element.product_count[0].count :
                                            element.total_count !== undefined ? element.total_count
                                                : 0,
                                        actions: <CategoryActions id={element._id.$oid} setDeleteCheck={setDeleteCheck} />,
                                        key: Math.random() * 91919191
                                    }
                                    tempArr.push(obj)
                                    setData(tempArr)
                                })
                                setHelpPagination({
                                    nextPage: res.data.next,
                                    prevPage: res.data.prev
                                })
                            }
                        })
                }
            })
    }
    console.log("TOTAL COUNT", totalCount)
    /**
    * next page handler
    */
    const nextPageHandler = () => {
        setPagination({
            ...pagination,
            activePage: activePage + 1,
            next: nextPage,
            prev: null
        })
        setSearch("")
    }
    /**
    * prev page handler function
     */
    const prevPageHandler = () => {
        setPagination({
            ...pagination,
            activePage: activePage - 1,
            next: null,
            prev: prevPage
        })
        setSearch("")
    }
    return (
        <>
            <PageHeader title="Category Template"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <Button type='Outlined'>Edit Default Template</Button>
                        <Button onClick={() => { navigate(`/panel/${sessionStorage.getItem("user_id")}/category_template`) }} type="Primary">Create Template</Button>
                    </FlexLayout>
                }
            />
            <hr></hr>
            <br></br>
            <Card cardType='Bordered'>
                {loader === true ? <SkCategory />
                    :
                    (totalCount === 0 || totalCount === null) && search === "" ?
                        <FallBack
                            illustration={<NoTemplateSvg />}
                            subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">There is no product found in this page</TextStyles></FlexLayout>}
                            title="No Matching Template Found"
                        /> :
                        <FlexLayout spacing='loose' direction='vertical'>
                            <FlexChild desktopWidth='33' tabWidth='50' mobileWidth='100'>
                                <TextField
                                    onChange={(e) => {
                                        setSearch(e)
                                    }}
                                    placeHolder="Search category template"
                                    value={search}
                                    clearButton
                                    clearFunction={() => {
                                        setSearch("")
                                        makeApiCall()
                                        setPagination({
                                            activePage: 1,
                                            countPerPage: 5,
                                            next: null,
                                            prev: null
                                        })
                                    }}
                                />
                            </FlexChild>
                            {(totalCount === 0 || totalCount === null) && search !== "" ?
                                <FallBack
                                    illustration={<NoTemplateSvg />}
                                    subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">There is no product found in this page</TextStyles></FlexLayout>}
                                    title="No Matching Template Found"
                                /> :
                                <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                                    <>
                                        <Grid
                                            columns={columns}
                                            dataSource={data}
                                        />
                                        <Pagination
                                            countPerPage={countPerPage}
                                            currentPage={activePage}
                                            onNext={nextPageHandler}
                                            onPrevious={prevPageHandler}
                                            totalitem={totalCount}
                                            simpleView={true}
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
                }

            </Card>
        </>
    )
}

export default Category

