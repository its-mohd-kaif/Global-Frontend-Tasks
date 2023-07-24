import { FlexLayout, Skeleton } from '@cedcommerce/ounce-ui'
import React from 'react'

function SkTabs() {
    return (
        <FlexLayout spacing="mediumLoose">
            {["1", "2", "3", "4", "5", "6", "7"].map((ele, index) => (
                <Skeleton
                    height="30px"
                    line={1}
                    type="custom"
                    width="70px"
                    key={index}
                />
            ))}
        </FlexLayout>
    )
}

export default SkTabs