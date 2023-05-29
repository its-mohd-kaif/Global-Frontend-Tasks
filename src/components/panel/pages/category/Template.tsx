import { Button, FlexLayout, PageHeader } from '@cedcommerce/ounce-ui'
import React from 'react'
import { FileText } from "react-feather"
function Template() {
    return (
        <>
            <PageHeader title="Category Template"
                action={
                    <FlexLayout valign='center' spacing='tight'>
                        <Button icon={<FileText size={"18"} />} type="Outlined">Guide</Button>
                        <Button onClick={() => { }} type="Primary">Save</Button>
                    </FlexLayout>
                }
            />
            <hr></hr>
            <br></br>
        </>
    )
}

export default Template