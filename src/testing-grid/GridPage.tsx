import { Loader, PageHeader } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import GridUtility from './GridUtility'
interface MyInterface {
    loading: boolean;
    data: any[]
}
function GridPage() {
    // state for holding api data and loading state data
    const [state, setState] = useState<MyInterface>({
        loading: true,
        data: []
    })
    const { loading, data } = state
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((val) => {
                if (val.length !== 0) {
                    const myData = extractData(val);
                    setState({
                        loading: false,
                        data: myData
                    })
                }
            })
    }, [])
    /**
     * In this function, we return the data that I want to display on the grid.
     * @param originalData its an api response data
     * @returns object array
     */
    const extractData = (originalData: any) => {
        return originalData.map((item: any) => {
            const { email, id, name, phone, username, website } = item;
            return { id, name, email, phone, website, username, key: id };
        });
    }
    return (
        <>
            <PageHeader
                description="Implement a componenet through which i can only pass the grid data no need to define the rows and coloumns"
                onClick={function noRefCheck() { }}
                title="Grid Page"
            ></PageHeader>
            {
                loading === true ? <Loader type='Loader2' /> : <GridUtility data={data} />
            }
        </>
    )
}

export default GridPage