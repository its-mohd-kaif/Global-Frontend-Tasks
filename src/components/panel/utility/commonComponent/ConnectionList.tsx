import { FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'

function ConnectionList(_props: any) {
    const { list } = _props
    return (
        <FlexLayout direction='vertical' spacing='extraLoose'>
            {list.map((val: string, index: number) => (
                <FlexLayout key={index} spacing='mediumLoose'>
                    <div className='list-circle'>{index + 1}</div>
                    <TextStyles type='Paragraph' paragraphTypes='MD-1.4'>
                        {val}
                    </TextStyles>
                </FlexLayout>
            ))}
        </FlexLayout>
    )
}

export default ConnectionList