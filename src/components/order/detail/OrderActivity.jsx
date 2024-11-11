import React from "react";
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepSeparator,
  Box,
  StepTitle,
  StepDescription,
} from "@chakra-ui/react";

const OrderActivity = ({
  orderId,
  orderDetail,
  activeStep,
  steps,
  activeStepIndex,
  mapContainerRef,
  isMapLoaded,
  mapObject,
  PolylineComponent,
}) => {
  return (
    <>
      {orderId.charAt(0) === "O" && (
        <>
          <h1 className="text-[18px] font-semibold m-5">Order Activity Log</h1>
          <div className="bg-white mx-5 p-5 rounded-lg flex justify-between gap-20 items-center">
            <div className="bg-gray-200 rounded-full w-[60px] h-[60px] overflow-hidden">
              <img
                src={orderDetail?.deliveryAgentDetail?.avatar}
                className="w-full h-full object-cover"
                alt="Agent Avatar"
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label className="text-gray-500">Agent Name</label>
              <p className="text-gray-900 font-[500]">
                {orderDetail?.deliveryAgentDetail?.name}
              </p>
            </div>
            <div className="flex flex-col w-1/4">
              <label className="text-gray-500">Total Distance</label>
              <p className="text-gray-900 font-[500]">
                {orderDetail?.deliveryAgentDetail?.distanceTravelled}
              </p>
            </div>
            <div className="flex flex-col w-1/4">
              <label className="text-gray-500">Total Time</label>
              <p className="text-gray-900 font-[500]">
                {orderDetail?.deliveryAgentDetail?.timeTaken}
              </p>
            </div>
          </div>

          <div className="flex m-5 mx-10 gap-5">
            <div className="w-1/2">
              {activeStepIndex !== null && (
                <Stepper
                  index={activeStep}
                  orientation="vertical"
                  height="800px"
                  colorScheme="teal"
                  spacing="20px"
                >
                  {steps?.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      <Box flexShrink="0">
                        <StepTitle>{step?.title}</StepTitle>
                        <div className="flex items-center gap-4">
                          <StepDescription>{step?.description}</StepDescription>
                          <StepDescription>#ID {step?.id}</StepDescription>
                        </div>
                        <StepDescription className="mt-2">
                          {step?.time}
                        </StepDescription>
                      </Box>
                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              )}
            </div>

            <div className="w-3/4 bg-white rounded-lg overflow-hidden">
              <div
                id="map"
                ref={mapContainerRef}
                style={{
                  width: "100%",
                  height: "810px",
                }}
              >
                {isMapLoaded && <PolylineComponent map={mapObject} />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderActivity;
