import { Card, FlexLayout, Skeleton } from "@cedcommerce/ounce-ui";
import React from "react";

export const SkCategory = () => {
  return (
    <Card cardType="Bordered">
      <FlexLayout direction="vertical" spacing="loose">
        <FlexLayout direction="vertical" spacing="tight">
          <FlexLayout spacing="extraLoose" wrap="noWrap">
            {/* {["150px"].map((ele, index) => ( */}
              <Skeleton
                height="40px"
                line={1}
                type="custom"
                width={"300px"}
              />
            {/* ))} */}
          </FlexLayout>
          <FlexLayout direction="vertical" spacing="loose" wrap="noWrap">
            {["1", "2", "3", "4", "5"].map((ele, index) => (
              <div style={{ marginRight: "3rem" }} key={index}>
                <FlexLayout halign="evenly" spacing="extraLoose">
                  <Skeleton
                    height="30px"
                    line={1}
                    type="custom"
                    width="100px"
                  />
                  <Skeleton
                    height="30px"
                    line={1}
                    type="custom"
                    width="350px"
                  />
                  <Skeleton
                    height="30px"
                    line={1}
                    type="custom"
                    width="100px"
                  />
                  <Skeleton height="30px" line={1} type="custom" width="100px" />
                  <Skeleton height="40px" line={1} type="custom" width="40px" />
                </FlexLayout>
              </div>
            ))}
          </FlexLayout>
        </FlexLayout>
      </FlexLayout>
    </Card>
  );
};