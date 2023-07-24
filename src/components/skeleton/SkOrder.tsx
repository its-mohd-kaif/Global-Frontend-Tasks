import { Card, FlexLayout, Skeleton } from "@cedcommerce/ounce-ui";
import React from "react";
function SkOrder() {
    return (
        <Card cardType="Bordered">
            <FlexLayout direction="vertical" spacing="loose">
                <FlexLayout spacing="tight">
                    <Skeleton height="40px" line={1} type="custom" width="300px" />
                    <Skeleton height="40px" line={1} type="custom" width="220px" />
                </FlexLayout>
                <FlexLayout direction="vertical" spacing="tight">
                    <FlexLayout halign="around" spacing="loose">
                        {["1", "2", "3", "4", "5"].map((ele, index) => (
                            <Skeleton
                                height="30px"
                                line={1}
                                type="custom"
                                width="150px"
                                key={index}
                            />
                        ))}
                    </FlexLayout>
                    <FlexLayout direction="vertical" spacing="loose">
                        {["1", "2", "3", "4", "5"].map((ele, index) => (
                            <div style={{ marginRight: "3rem" }} key={index}>
                                <FlexLayout halign="around" spacing="loose">
                                    <Skeleton
                                        height="30px"
                                        line={1}
                                        type="custom"
                                        width="200px"
                                    />
                                    <Skeleton
                                        height="30px"
                                        line={1}
                                        type="custom"
                                        width="200px"
                                    />
                                    <Skeleton height="30px" line={1} type="custom" width="70px" />
                                    <Skeleton
                                        height="30px"
                                        line={1}
                                        type="custom"
                                        width="160px"
                                    />
                                    <Skeleton
                                        height="30px"
                                        line={1}
                                        type="custom"
                                        width="160px"
                                    />
                                </FlexLayout>
                            </div>
                        ))}
                    </FlexLayout>
                </FlexLayout>
            </FlexLayout>
        </Card>
    )
}

export default SkOrder