import { FlexLayout, Skeleton } from '@cedcommerce/ounce-ui'
import React from 'react'

function SkMapping() {
    return (
        <FlexLayout direction='vertical' spacing='loose'>
            {[1, 2].map((val) => (
                <Skeleton
                    key={val}
                    height="50px"
                    line={1}
                    type="line"
                    width="50px"
                />
            ))}
        </FlexLayout>
    )
}

export default SkMapping