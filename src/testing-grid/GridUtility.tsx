import { Grid } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
interface gridInterface {
    rows: any[],
    columns: any[]
}
interface GridUtilityProps {
    data: any[];
}

interface GridInterface {
    rows: any[];
    columns: any[];
}

function GridUtility(props: GridUtilityProps) {
    const { data } = props;
    const [state, setState] = useState<GridInterface>({
        rows: [],
        columns: []
    });
    const { rows, columns } = state;

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            columns: makeDynamicColumns(Object.keys(data[0])),
            rows: data,
        }));
    }, [data]);

    const makeDynamicColumns = (data: any[]) => {
        let tempColumns: any[] = [];
        data.forEach((element: any) => {
            if (element !== "key") {
                let objOfColumns = {
                    align: 'center',
                    dataIndex: element.toLowerCase(),
                    key: element.toLowerCase(),
                    title: element.charAt(0).toUpperCase() + element.slice(1).toLowerCase(),
                    width: 100
                };
                tempColumns.push(objOfColumns);
            }
        });
        return tempColumns;
    };

    return (
        <>
            <Grid
                columns={columns}
                dataSource={rows}
            />
        </>
    );
}

export default GridUtility;
