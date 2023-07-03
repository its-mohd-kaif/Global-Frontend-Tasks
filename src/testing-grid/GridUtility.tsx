import { Grid } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
interface gridInterface {
    rows: any[],
    columns: any[]
}
function GridUtility(props: any) {
    const { data } = props;
    const [state, setState] = useState<gridInterface>({
        rows: [],
        columns: []
    })
    const { rows, columns } = state
    useEffect(() => {
        setState({
            columns: makeDynamicColumns(Object.keys(data[0])),
            rows: data,
        })
    }, [])
    /**
    * In this function, we create columns object array 
    * @param data its an api response Object.keys(data[0])
    * @returns object array
    */
    const makeDynamicColumns = (data: any) => {
        let tempColumns: any = [];
        data.forEach((element: any) => {
            if (element !== "key") {
                let objOfColumns = {
                    align: 'center',
                    dataIndex: element.toLowerCase(),
                    key: element.toLowerCase(),
                    title: element.charAt(0).toUpperCase() + element.slice(1).toLowerCase(),
                    width: 100
                }
                tempColumns.push(objOfColumns)
            }
        });
        return tempColumns
    }
    return (
        <>
            <Grid
                columns={columns}
                dataSource={rows}
            />
        </>
    )
}

export default GridUtility