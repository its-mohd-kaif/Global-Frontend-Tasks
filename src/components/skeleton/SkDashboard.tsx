import { Card, FlexChild, FlexLayout, Skeleton } from "@cedcommerce/ounce-ui";
import React from "react";

export const SkDashboard = () => {
  return (
    <FlexLayout spacing="loose">
      <FlexChild desktopWidth="66" tabWidth="66" mobileWidth="100">
        <FlexLayout spacing="loose" direction="vertical">
          <Card>
            <FlexLayout spacing="loose" direction="vertical">
              <Card
                cardType="Subdued"
                title="Product Status"
                extraClass="cardIcon"
              >
                <FlexLayout spacing="loose" halign="fill">
                  {["1", "2", "3", "4"].map((ele: any, index: any) => (
                    <FlexChild
                      desktopWidth="25"
                      tabWidth="50"
                      mobileWidth="100"
                      key={index}
                    >
                      {/* Products status card */}
                      <Card cardType="Default">
                        <FlexLayout direction="vertical" spacing="loose" wrap="wrap">
                          <FlexLayout
                            halign="fill"
                            wrap="noWrap"
                          >
                            <Skeleton
                              height="25px"
                              line={1}
                              type="custom"
                              width="70px"
                            />
                            <Skeleton
                              height="30px"
                              line={1}
                              rounded={true}
                              type="custom"
                              width="30px"
                            />
                          </FlexLayout>
                          <FlexLayout spacing="loose" direction="vertical">
                            <Skeleton
                              height="25px"
                              line={1}
                              type="custom"
                              width="45px"
                            />
                            <Skeleton
                              height="25px"
                              line={1}
                              type="custom"
                              width="100px"
                            />
                          </FlexLayout>
                        </FlexLayout>
                      </Card>
                    </FlexChild>
                  ))}
                </FlexLayout>
              </Card>
              <Card
                cardType="Subdued"
                title="Order Status"
              >
                <FlexLayout spacing="loose" halign="fill">
                  {["1", "2", "3", "4"].map((ele: any, index: any) => (
                    <FlexChild
                      desktopWidth="25"
                      tabWidth="50"
                      mobileWidth="100"
                      key={index}
                    >
                      {/* Order status card */}
                      <Card cardType="Default">
                        <FlexLayout direction="vertical" spacing="loose" wrap="wrap">
                          <FlexLayout
                            halign="fill"
                            wrap="noWrap"
                          >
                            <Skeleton
                              height="25px"
                              line={1}
                              type="custom"
                              width="70px"
                            />
                            <Skeleton
                              height="30px"
                              line={1}
                              rounded={true}
                              type="custom"
                              width="30px"
                            />
                          </FlexLayout>
                          <FlexLayout spacing="loose" direction="vertical">
                            <Skeleton
                              height="25px"
                              line={1}
                              type="custom"
                              width="45px"
                            />
                            <Skeleton
                              height="25px"
                              line={1}
                              type="custom"
                              width="100px"
                            />
                          </FlexLayout>
                        </FlexLayout>
                      </Card>
                    </FlexChild>
                  ))}
                </FlexLayout>
              </Card>
            </FlexLayout>
          </Card>
        </FlexLayout>
      </FlexChild>
      <FlexChild desktopWidth="33" tabWidth="33" mobileWidth="100">
        <FlexLayout
          desktopWidth="100"
          tabWidth="100"
          mobileWidth="100"
          direction="vertical"
          spacing="extraLoose"
        >
          {/* Connected */}
          <Card
            title={
              <Skeleton height="25px" line={1} type="custom" width="180px" />
            }
          >
            <FlexLayout spacing="tight" halign="fill" wrap="noWrap">
              <FlexChild desktopWidth="50" tabWidth="50" mobileWidth="50">
                <FlexLayout spacing="tight" wrap="noWrap">
                  <Skeleton
                    height="40px"
                    line={1}
                    rounded
                    type="custom"
                    width="40px"
                  />
                  <FlexLayout direction="vertical" spacing="extraTight">
                    <Skeleton
                      height="30px"
                      line={1}
                      type="custom"
                      width="120px"
                    />
                    <Skeleton
                      height="30px"
                      line={1}
                      type="custom"
                      width="150px"
                    />
                  </FlexLayout>
                </FlexLayout>
              </FlexChild>
              <FlexChild desktopWidth="33" tabWidth="50" mobileWidth="50">
                <Skeleton height="20px" line={1} type="custom" width="100px" />
              </FlexChild>
            </FlexLayout>
          </Card>
          {/*Three Products Carousel*/}
          <Card
            title="Top Three Products"
            action={
              <Skeleton height="30px" line={1} type="custom" width="90px" />
            }
          >
            <Skeleton height="350px" line={1} type="custom" width="300px" />
          </Card>
        </FlexLayout>
      </FlexChild>
    </FlexLayout>
  );
};




