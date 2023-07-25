import { ActionList, Filter, Alert, AutoComplete, Button, Card, CheckBox, FlexChild, FlexLayout, Grid, Image, Modal, PageHeader, Pagination, Popover, Radio, Select, Tabs, TextField, TextLink, TextStyles, Loader, Tag, FallBack } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { FileText, ChevronDown, Search } from "react-feather"
import productFallbackImg from "../../../../assets/images/png/productFallBack.png"
import { GetRange, makebadgeBgColors, makeIndividualQueryParams, makeTitleForTag, makeURLForTabChange, ProductGridTitle, ProductsActions, ProductsStatus, ProductsTitle } from './ProductUtility';
import { callApi } from '../../../../core/ApiMethods';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../../redux/ReduxSlice';
import { SkProduct } from '../../../skeleton/SkProduct';
import SkTabs from '../../../skeleton/SkTabs';
import NoProductSvg from '../../../../assets/images/svg/NoProductSvg';
interface paginationObj {
    activePage: number
    countPerPage: number
}
interface bulkStateObj {
    chooseCategoryTemplate: string;
    chooseTikTokWarehouse: string;
    profile_id: string;
    warehouse_id: string;
}
function Product() {
    const [products, setProducts] = useState<any>(null)
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
    })
    const [bulkModal, setBulkModal] = useState<boolean>(false)
    const [openExtraColumn, setOpenExtraColumn] = useState<boolean>(false);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [productsStatus, setProductsStatus] = useState<any>([]);
    // state for hold value of seclected tabs
    const [tab, setTabs] = useState<string>("all")
    const [loader, setLoader] = useState<boolean>(true)
    const [expandedRows, setExpandedRows] = useState<any>([]);
    const [bulkState, setBulkState] = useState<bulkStateObj>({
        chooseCategoryTemplate: "",
        profile_id: "",
        chooseTikTokWarehouse: "",
        warehouse_id: ""
    })
    const redux = useSelector((redux: any) => redux.redux.connectorGetAllState.data?.tiktok.installed[0].warehouses)
    const regex = /^\d*$/; // Regular expression to match only digits
    const dispatch = useDispatch()
    const [categoryOptions, setCategoryOptions] = useState<any>([]);
    const [warehouse, setWarehouse] = useState<any>([]);
    const columns = [
        {
            align: 'left',
            dataIndex: 'image',
            key: 'image',
            title: 'Image',
            width: 60
        },
        {
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            title: <ProductGridTitle title="Title" />,
            width: 224
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: <ProductGridTitle title="Price" />,
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'quantity',
            key: 'quantity',
            title: <ProductGridTitle title="Quantity" />,
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            title: 'Status',
            width: 124
        },
        {
            align: 'left',
            fixed: 'right',
            dataIndex: 'actions',
            key: 'actions',
            title: 'Actions',
            width: 50
        }
    ]
    const childColumns = [
        {
            align: 'left',
            dataIndex: 'image',
            key: 'image',
            title: 'Image',
            width: 60
        },
        {
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            title: "Title",
            width: 224
        },
        {
            align: 'left',
            dataIndex: 'price',
            key: 'price',
            title: "Price",
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'quantity',
            key: 'quantity',
            title: "Quantity",
            width: 124
        },
        {
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            title: 'Status',
            width: 60
        }
    ]
    const { activePage, countPerPage, } = pagination;
    const { chooseCategoryTemplate, profile_id, chooseTikTokWarehouse, warehouse_id } = bulkState;
    const [filterState, setFilterState] = useState({
        categoryChoose: '',
        productTypeChoose: '',
        minQuantity: '',
        maxQuantity: '',
        minPrice: '',
        maxPrice: '',
        brand: ''
    });
    const [tag, setTag] = useState<any>([])
    const [errorfilter, setErrorFilter] = useState({
        priceError: false,
        quantityError: false
    })
    const [searchProduct, setSearchProduct] = useState<string>("")
    const { categoryChoose, productTypeChoose, minQuantity, maxQuantity, minPrice, maxPrice, brand } = filterState;
    const { priceError, quantityError } = errorfilter

    const [tabLoader, setTabLoader] = useState<boolean>(false)

    useEffect(() => {
        setTabLoader(true)
        callApi("GET", "connector/profile/getProfileData?count=100", {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    makeCategoryOptions(res.data.rows)
                }
            })
        callApi("POST", "tiktokhome/product/getproductStatus", {}, "extraHeaders")
            .then((res: any) => {
                setTabLoader(false)
                if (res.success === true) {
                    makeProdctsStatusTabs(res.data)
                }
            })
    }, [])
    useEffect(() => {
        if (searchProduct !== "") {
            const getData = setTimeout(() => {
                getRefineProduct(tab)
            }, 3000);
            return () => clearInterval(getData);
        } else {
            getRefineProduct(tab)
        }
    }, [pagination, tab, tag, searchProduct])

    const makeProdctsStatusTabs = (data: any) => {
        const tabs = [
            { status: "All", id: "total" },
            { status: "Not Uploaded", id: "not_uploaded" },
            { status: "In Progress", id: "in_progress" },
            { status: "Live", id: "live" },
            { status: "Reviewing", id: "reviewing" },
            { status: "Failed", id: "failed" },
            { status: "Inactive", id: "inactive" }
        ];
        const customizedResponse = tabs.map((tab) => {
            if (tab.id === "total") {
                return { status: tab.status, count: data.total, id: "all" };
            }
            const matchingStatus = data.status.find((status: any) => status._id === tab.id);
            return { status: tab.status, count: matchingStatus ? matchingStatus.count : 0, id: tab.id };
        });
        const objectArray = customizedResponse.map((item: any) => {
            let badgeContent = item.count.toString();
            let customBgColors = makebadgeBgColors(item.id);
            return {
                content: item.status,
                id: item.id,
                badge: true,
                badgeContent,
                customBgColors
            };
        });
        setProductsStatus(objectArray)
    }
    const makeTiktokWarehouseOptions = (data: any) => {
        let tempArr: any = []
        data.forEach((element: any) => {
            let obj = {
                label: element.warehouse_name,
                value: element.warehouse_name,
                id: element.warehouse_id,
            }
            tempArr.push(obj)
        });
        setWarehouse(tempArr)
    }

    const makeCategoryOptions = (data: any) => {
        let tempArr: any = []
        data.forEach((element: any) => {
            let count = 0
            if (element?.product_count[0]?.count !== undefined) {
                count = element.product_count[0].count
            } else if (element?.total_count !== undefined) {
                count = element.total_count
            }
            let obj = {
                label: element.name,
                value: element.name,
                count: count,
                id: element._id.$oid
            }
            tempArr.push(obj)
        });
        setCategoryOptions(tempArr)
    }

    const getRefineProduct = (value: string) => {
        setLoader(true)
        const url = makeURLForTabChange(value);
        function generateQueryString(data: any) {
            const strKeys = data.filter((obj: any) => typeof obj.title === 'string')
                .map((obj: any) => obj.str);

            return strKeys.join('');
        }
        const filterUrl = tag.length === 0 ? "" : generateQueryString(tag)
        const searchUrl = searchProduct === "" ? "" : `&or_filter[title][3]=${searchProduct}&or_filter[items.sku][3]=${searchProduct}&or_filter[source_product_id][3]=${searchProduct}`;

        callApi("GET", `connector/product/getRefineProductCount?activePage=1&count=10${url}${filterUrl}${searchUrl}`, {}, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    setTotalProducts(res.data.count)

                }
            })
        callApi("GET", `connector/product/getRefineProducts?activePage=${activePage}&count=${countPerPage}${url}${filterUrl}${searchUrl}`, {}, "extraHeaders")
            .then((res: any) => {
                setLoader(false)
                const dataRes = res.data.rows
                let tempArr: any = []
                dataRes.forEach((element: any) => {
                    let obj = {
                        id: element._id,
                        title: ProductsTitle(element.items),
                        image: < Image
                            fit="cover"
                            height={60}
                            radius="corner-radius"
                            src={element.main_image !== "" ? element.main_image : productFallbackImg}
                            width={60}
                        />,
                        price: element.items.length === 1 && element.items[0].hasOwnProperty("price") === false ? "N/A"
                            : GetRange(element.items, "price"),
                        quantity: element.items.length === 1 && element.items[0].hasOwnProperty("quantity") === false ? "N/A"
                            : GetRange(element.items, "quantity"),
                        status: <ProductsStatus status={element.items[0]} />,
                        actions: <ProductsActions id={element._id} />,
                        key: Math.random() * 91919191,
                        childrenRow: element.items.length > 1 ? makeChildrenData(element.items) : undefined
                    }
                    tempArr.push(obj)
                })
                setProducts(tempArr)
            })
    }

    const makeChildrenData = (data: any) => {
        let tempArr: any = []
        data.slice(1).forEach((element: any) => {
            let obj = {
                title: element.title,
                image: < Image
                    fit="cover"
                    height={60}
                    radius="corner-radius"
                    src={element.main_image !== "" ? element.main_image : productFallbackImg}
                    width={60}
                />,
                price: `INR ${element.price}`,
                quantity: element.quantity,
                status: <ProductsStatus status={element} />,
                key: Math.random() * 91919191,
            }
            tempArr.push(obj)
        })
        return tempArr
    }
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

    const bulkUploadHandler = () => {
        let obj = {}
        if (profile_id === "") {
            obj = {
                "source": "bigcommerce",
                "target": "tiktok",
                "warehouse_id": warehouse_id,
                "create_notification": false,
                "marketplace": "tiktok",
                "filter": {
                    "profile.profile_id": {
                        "12": "0"
                    }
                }
            }
        } else {
            obj = {
                "source": "bigcommerce",
                "target": "tiktok",
                "warehouse_id": warehouse_id,
                "create_notification": false,
                "marketplace": "tiktok",
                "profile_id": profile_id
            }
        }
        callApi("POST", "connector/product/upload", obj, "extraHeaders")
            .then((res: any) => {
                if (res.success === true) {
                    dispatch(showToast({
                        type: "success",
                        message: res.message
                    }))
                } else {
                    dispatch(showToast({
                        type: "error",
                        message: res.message
                    }))
                }
            })
    }

    const handleFormChange = (value: string, name: string) => {
        setFilterState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateForm(value, name);
    };
    const validateForm = (value: string, name: string) => {
        if (
            (name === 'minQuantity' && maxQuantity !== '' && parseInt(value) > parseInt(maxQuantity)) ||
            (name === 'maxQuantity' && minQuantity !== '' && parseInt(value) < parseInt(minQuantity)) ||
            (name === 'minPrice' && maxPrice !== '' && parseInt(value) > parseInt(maxPrice)) ||
            (name === 'maxPrice' && minPrice !== '' && parseInt(value) < parseInt(minPrice))
        ) {
            if (name === 'minQuantity' || name === 'maxQuantity') {
                setErrorFilter({
                    ...errorfilter,
                    quantityError: true
                })
            } else if (name === 'minPrice' || name === 'maxPrice') {
                setErrorFilter({
                    ...errorfilter,
                    priceError: true
                })
            }
        } else {
            if (name === 'minQuantity' || name === 'maxQuantity') {
                setErrorFilter({
                    ...errorfilter,
                    quantityError: false
                })
            } else if (name === 'minPrice' || name === 'maxPrice') {
                setErrorFilter({
                    ...errorfilter,
                    priceError: false
                })
            }
        }
    };

    const filterApplyHandler = () => {
        let tempArr: any = [];
        function getKeyByValue(object: any, value: any) {
            return Object.keys(object).find(key => object[key] === value);
        }
        Object.values(filterState)
            .forEach(element => {
                if (element !== '') {
                    const key: any = getKeyByValue(filterState, element);
                    let obj = {
                        title: makeTitleForTag(key),
                        value: element,
                        id: Math.floor(Math.random() * 9191919191),
                        str: makeIndividualQueryParams(key, filterState[key as keyof typeof filterState]),
                        key: key
                    }
                    tempArr.push(obj)
                }
            });
        setTag(tempArr)
    }
    const removeFilerHandler = (id: number, key: string) => {
        function removeItemById(arr: any, id: number) {
            return arr.filter((item: any) => item.id !== id);
        }
        const updatedData = removeItemById(tag, id);
        setFilterState((prevState) => ({
            ...prevState,
            [key]: "",
        }));
        setTag(updatedData)
    }

    const resetAllFilter = () => {
        setTag([])
        setFilterState({
            brand: "",
            categoryChoose: "",
            maxPrice: "",
            maxQuantity: "",
            minPrice: "",
            minQuantity: "",
            productTypeChoose: ""
        })
    }
    return (
        <>
            <PageHeader
                title="Product Listing"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <ActionList
                            activator={<Button icon={<ChevronDown />} iconAlign="right"
                                onClick={() => {
                                }}
                                type="Outlined">More Actions</Button>}
                            onClose={() => {
                            }}
                            options={[
                                {
                                    items: [
                                        {
                                            content: 'Action 1',
                                            id: 'ActionOne',
                                            onClick: function noRefCheck() { }
                                        },
                                        {
                                            content: 'Action 1',
                                            id: 'ActionTwo',
                                            onClick: function noRefCheck() { }
                                        },
                                        {
                                            content: 'Action 1',
                                            id: 'ActionThree',
                                            onClick: function noRefCheck() { }
                                        }
                                    ]
                                }
                            ]}
                        />
                        <Button onClick={() => {
                            setBulkModal(!bulkModal)
                            makeTiktokWarehouseOptions(redux)
                        }} type="Primary">Bulk Upload</Button>
                    </FlexLayout>
                }
            />
            <Card>
                {/* Bulk Upload Modal */}
                <Modal
                    close={() => {
                        setBulkModal(!bulkModal)
                    }}
                    heading="Select a category template to upload product(s) to TikTok Shop."
                    modalSize="large"
                    primaryAction={{
                        content: 'Upload',
                        loading: false,
                        onClick: bulkUploadHandler,
                        disable: chooseTikTokWarehouse !== "" ? false : true
                    }}
                    open={bulkModal}>
                    <FlexLayout direction='vertical' spacing='extraLoose'>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <FlexLayout spacing='extraTight'>
                                    <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>Category Template</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                {categoryOptions.length === 0 ?
                                    <TextStyles>
                                        No Category Template(s) Found
                                    </TextStyles>
                                    :
                                    <Select
                                        onChange={(e, event: any) => {
                                            setBulkState({
                                                ...bulkState,
                                                chooseCategoryTemplate: event.count,
                                                profile_id: event.id
                                            })
                                        }}
                                        onblur={function noRefCheck() { }}
                                        options={categoryOptions}
                                        value={chooseCategoryTemplate}
                                        placeholder='Select'
                                        searchEable
                                        popoverContainer='element'
                                    />
                                }

                            </FlexChild>
                        </FlexLayout>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='33' tabWidth='100' mobileWidth='100'>
                                <FlexLayout spacing='extraTight'>
                                    <TextStyles fontweight='bold' subheadingTypes='XS-1.6'>TikTok Shop Warehouse</TextStyles>
                                    <TextStyles textcolor="negative">*</TextStyles>
                                </FlexLayout>
                            </FlexChild>
                            <FlexChild desktopWidth='66' tabWidth='100' mobileWidth='100'>
                                <Select
                                    onChange={(e, event: any) => {
                                        setBulkState({
                                            ...bulkState,
                                            chooseTikTokWarehouse: e,
                                            warehouse_id: event.id
                                        })
                                    }}
                                    onblur={function noRefCheck() { }}
                                    options={warehouse}
                                    value={chooseTikTokWarehouse}
                                    placeholder='Select'
                                    searchEable
                                    popoverContainer='element'
                                />
                            </FlexChild>
                        </FlexLayout>
                        <FlexChild>
                            <TextStyles content={`Are you sure you want to upload  ${chooseCategoryTemplate} Product(s) ?`} />
                        </FlexChild>
                    </FlexLayout>
                </Modal>
                <FlexLayout spacing='extraLoose' direction='vertical'>
                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                        <Alert
                            destroy={false}
                            onClose={function noRefCheck() { }}
                            type="info"
                        >
                            Want to upload simple product(s)? <TextLink label="Learn More" />
                        </Alert>
                    </FlexChild>
                    {tabLoader === true ? <SkTabs /> : null}
                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                        <Tabs
                            alignment="horizontal"
                            onChange={(e) => {
                                setTabs(e)
                            }}
                            selected={tab}
                            value={productsStatus}
                        >
                            {
                                loader === true ?
                                    <SkProduct />
                                    :
                                    products.length === 0 && searchProduct === "" ?
                                        <FallBack
                                            illustration={<NoProductSvg />}
                                            subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">There is no product found in this page</TextStyles></FlexLayout>}
                                            title="No Product(s) Found"
                                        /> :
                                        <Card cardType='Bordered'>
                                            <FlexLayout spacing='loose' direction='vertical'>
                                                <FlexChild >
                                                    <FlexLayout spacing='loose'>
                                                        <TextField
                                                            placeHolder="Enter Title, ID or SKU"
                                                            thickness="thin"
                                                            innerPreIcon={<Search />}
                                                            onChange={(e) => {
                                                                setSearchProduct(e)
                                                            }}
                                                            value={searchProduct}
                                                            clearButton
                                                            clearFunction={() => {
                                                                setSearchProduct("")
                                                            }}
                                                        />
                                                        <Popover
                                                            activator={<Button thickness='thin' icon={<ChevronDown />} iconAlign="right"
                                                                onClick={() => {
                                                                    setOpenExtraColumn(!openExtraColumn)
                                                                }}
                                                                type="Outlined">Customize Grid</Button>} open={openExtraColumn}                                       >
                                                            <FlexLayout spacing='loose' direction='vertical'>
                                                                <CheckBox
                                                                    id="two"
                                                                    checked={false}
                                                                    labelVal="ID"
                                                                    name="ID"
                                                                    onClick={() => { }}
                                                                />
                                                                <CheckBox
                                                                    id="two"
                                                                    checked={false}
                                                                    labelVal="Price"
                                                                    name="Price"
                                                                    onClick={() => { }}
                                                                />
                                                                <CheckBox
                                                                    id="two"
                                                                    checked={false}
                                                                    labelVal="Quantity"
                                                                    name="Quantity"
                                                                    onClick={() => { }}
                                                                />
                                                                <CheckBox
                                                                    id="two"
                                                                    checked={false}
                                                                    labelVal="SKU"
                                                                    name="SKU"
                                                                    onClick={() => { }}
                                                                />
                                                                <CheckBox
                                                                    id="two"
                                                                    checked={false}
                                                                    labelVal="Category"
                                                                    name="Category"
                                                                    onClick={() => { }}
                                                                />
                                                                <CheckBox
                                                                    id="two"
                                                                    checked={false}
                                                                    labelVal="Status"
                                                                    name="Status"
                                                                    onClick={() => { }}
                                                                />
                                                            </FlexLayout>
                                                        </Popover>
                                                        <Filter
                                                            icon={<FileText size={17} />}
                                                            button="Filters"
                                                            disableApply={false}
                                                            filters={[
                                                                {
                                                                    children: <>
                                                                        <FlexLayout spacing='loose' direction='vertical'>
                                                                            <Select
                                                                                onChange={(e) => {
                                                                                    handleFormChange(e, "categoryChoose")
                                                                                }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={categoryOptions}
                                                                                value={categoryChoose}
                                                                                placeholder='Select'
                                                                                thickness='thin'
                                                                                popoverContainer='element'
                                                                            />
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setFilterState({
                                                                                        ...filterState,
                                                                                        categoryChoose: ""
                                                                                    })
                                                                                }}
                                                                                disable={categoryChoose === "" ? true : false}
                                                                                thickness="extraThin" type='Danger'>
                                                                                Clear
                                                                            </Button>
                                                                        </FlexLayout>
                                                                    </>,
                                                                    name: 'Category Template'
                                                                },
                                                                {
                                                                    children: <>
                                                                        <FlexLayout spacing='loose' direction='vertical'>
                                                                            <Select
                                                                                onChange={(e) => {
                                                                                    handleFormChange(e, "productTypeChoose")
                                                                                }}
                                                                                onblur={function noRefCheck() { }}
                                                                                options={[
                                                                                    {
                                                                                        label: "Simple",
                                                                                        value: "simple"
                                                                                    },
                                                                                    {
                                                                                        label: "Variant",
                                                                                        value: "variation"
                                                                                    }
                                                                                ]}
                                                                                value={productTypeChoose}
                                                                                placeholder='Select'
                                                                                thickness='thin'
                                                                                popoverContainer='element'
                                                                            />
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setFilterState({
                                                                                        ...filterState,
                                                                                        productTypeChoose: ""
                                                                                    })
                                                                                }}
                                                                                disable={productTypeChoose === "" ? true : false}
                                                                                thickness="extraThin" type='Danger'>
                                                                                Clear
                                                                            </Button>
                                                                        </FlexLayout>
                                                                    </>,
                                                                    name: "Product Type"
                                                                },
                                                                {
                                                                    children: <>
                                                                        <FlexLayout
                                                                            wrap='noWrap'
                                                                            spacing='tight'
                                                                        >
                                                                            <TextField
                                                                                autocomplete="off"
                                                                                onChange={(e) => {
                                                                                    if (regex.test(e) || e === '') {
                                                                                        handleFormChange(e, "minQuantity")
                                                                                    }
                                                                                }}
                                                                                placeHolder="From"
                                                                                showHelp='Enter minimum quantity'
                                                                                type="text"
                                                                                value={minQuantity}
                                                                                error={quantityError}
                                                                                clearButton={true}
                                                                                clearFunction={() => {
                                                                                    setFilterState({
                                                                                        ...filterState,
                                                                                        minQuantity: ""
                                                                                    })
                                                                                }}
                                                                            />
                                                                            <TextField
                                                                                autocomplete="off"
                                                                                onChange={(e) => {
                                                                                    if (regex.test(e) || e === '') {
                                                                                        handleFormChange(e, "maxQuantity")
                                                                                    }
                                                                                }}
                                                                                placeHolder="To"
                                                                                showHelp='Enter maximum quantity'
                                                                                type="text"
                                                                                value={maxQuantity}
                                                                                error={quantityError}
                                                                                clearButton={true}
                                                                                clearFunction={() => {
                                                                                    setFilterState({
                                                                                        ...filterState,
                                                                                        maxQuantity: ""
                                                                                    })
                                                                                }}
                                                                            />
                                                                        </FlexLayout>
                                                                    </>,
                                                                    name: "Quantity"
                                                                },
                                                                {
                                                                    children: <>
                                                                        <FlexLayout
                                                                            wrap='noWrap'
                                                                            spacing='tight'
                                                                        >
                                                                            <TextField
                                                                                autocomplete="off"
                                                                                onChange={(e) => {
                                                                                    if (regex.test(e) || e === '') {
                                                                                        handleFormChange(e, "minPrice")
                                                                                    }
                                                                                }}
                                                                                placeHolder="From"
                                                                                showHelp='Enter minimum price'
                                                                                type="text"
                                                                                value={minPrice}
                                                                                error={priceError}
                                                                                clearButton={true}
                                                                                clearFunction={() => {
                                                                                    setFilterState({
                                                                                        ...filterState,
                                                                                        minPrice: ""
                                                                                    })
                                                                                }}
                                                                            />
                                                                            <TextField
                                                                                autocomplete="off"
                                                                                onChange={(e) => {
                                                                                    if (regex.test(e) || e === '') {
                                                                                        handleFormChange(e, "maxPrice")
                                                                                    }
                                                                                }}
                                                                                placeHolder="To"
                                                                                showHelp='Enter maximum price'
                                                                                type="text"
                                                                                value={maxPrice}
                                                                                error={priceError}
                                                                                clearButton={true}
                                                                                clearFunction={() => {
                                                                                    setFilterState({
                                                                                        ...filterState,
                                                                                        minPrice: ""
                                                                                    })
                                                                                }}
                                                                            />
                                                                        </FlexLayout>
                                                                    </>,
                                                                    name: "Price"
                                                                },
                                                                {
                                                                    children: <>
                                                                        <TextField
                                                                            autocomplete="off"
                                                                            onChange={(e) => {
                                                                                handleFormChange(e, "brand")
                                                                            }}
                                                                            placeHolder="Enter Brand"
                                                                            type="text"
                                                                            value={brand}
                                                                            clearButton={true}
                                                                            clearFunction={() => {
                                                                                setFilterState({
                                                                                    ...filterState,
                                                                                    brand: ""
                                                                                })
                                                                            }}
                                                                        />
                                                                    </>,
                                                                    name: "Brand"
                                                                },
                                                            ]}
                                                            heading="Filter"
                                                            onApply={filterApplyHandler}
                                                            type="Outlined"
                                                            resetFilter={() => {
                                                                resetAllFilter()
                                                            }}
                                                            disableReset={false}
                                                        />
                                                    </FlexLayout>
                                                </FlexChild>
                                                <FlexChild>
                                                    <>
                                                        <FlexLayout spacing='loose'>
                                                            {
                                                                tag.length !== 0 ?
                                                                    tag.map((val: any, index: number) => (
                                                                        <Tag key={index} destroy={() => removeFilerHandler(val.id, val.key)}>
                                                                            {val.title} : {val.value}
                                                                        </Tag>
                                                                    ))

                                                                    : null
                                                            }
                                                            {
                                                                tag.length !== 0 ?
                                                                    <Button
                                                                        onClick={() => {
                                                                            resetAllFilter()
                                                                        }}
                                                                        type='Outlined'
                                                                        thickness='extraThin'>
                                                                        Clear all filter
                                                                    </Button> : null
                                                            }

                                                        </FlexLayout>

                                                    </>
                                                </FlexChild>
                                                {products.length === 0 && searchProduct !== "" ?
                                                    <FallBack
                                                        illustration={<NoProductSvg />}
                                                        subTitle={<FlexLayout direction="vertical" halign="center"><TextStyles alignment="center" fontweight="normal" paragraphTypes="MD-1.4" textcolor="light" type="Paragraph" utility="none">There is no product found in this page</TextStyles></FlexLayout>}
                                                        title="No Matching Products Found"
                                                    />
                                                    :
                                                    <FlexChild desktopWidth='100' tabWidth='100' mobileWidth='100'>
                                                        <>
                                                            <Grid
                                                                columns={columns}
                                                                size={"small"}
                                                                scrollX={970}
                                                                dataSource={products}
                                                                rowSelection={{
                                                                    onChange: function noRefCheck() { }
                                                                }}
                                                                expandable={{
                                                                    showExpandColumn: true,
                                                                    rowExpandable: (record: any) => {
                                                                        return record['childrenRow'];
                                                                    },
                                                                    expandedRowKeys: [...expandedRows],
                                                                    expandedRowRender: (record: any) => {
                                                                        return (
                                                                            <Grid
                                                                                tableLayout="auto"
                                                                                size="middle"
                                                                                scrollX={1400}
                                                                                columns={childColumns}
                                                                                dataSource={record['childrenRow']}
                                                                            />
                                                                        );
                                                                    },
                                                                    onExpand: (expanded: any, record: any) => {
                                                                        if (expanded) {
                                                                            setExpandedRows([...expandedRows, record.key]);
                                                                        } else {
                                                                            const tempRows = [...expandedRows];
                                                                            tempRows.forEach((item, index) => {
                                                                                if (item === record.key) {
                                                                                    tempRows.splice(index, 1);
                                                                                }
                                                                            });
                                                                            setExpandedRows(tempRows);
                                                                        }
                                                                    },
                                                                }}
                                                            />
                                                            <br></br>
                                                            <Pagination
                                                                countPerPage={countPerPage}
                                                                currentPage={activePage}
                                                                onCountChange={(e: any) => countChangeHandler(e)}
                                                                onEnter={(e: any) => onEnterChange(e)}
                                                                onNext={nextPageHandler}
                                                                onPrevious={prevPageHandler}
                                                                totalitem={totalProducts}
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
                                                    </FlexChild>}

                                            </FlexLayout>
                                        </Card>
                            }
                        </Tabs>
                    </FlexChild>
                </FlexLayout>
            </Card>
        </>
    )
}

export default Product