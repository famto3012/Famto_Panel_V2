import { Table } from "@chakra-ui/react";

const OrderItems = () => {
  const orderDetail = {
    deliveryMode: "Pick and Drop",
  };

  return (
    <>
      <h1 className="text-[18px] font-semibold m-5">Order Details</h1>

      <div className=" max-w-[96%] mx-auto">
        {/* Pick and Drop */}
        {orderDetail.deliveryMode === "Pick and Drop" && (
          <Table.Root size="lg">
            <Table.Header>
              <Table.Row className="bg-teal-700 h-[70px]" textAlign="center">
                {["Items Type", "Dimensions", "Weight Range"].map((header) => (
                  <Table.ColumnHeader color="white" textAlign="center">
                    {header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row key={""} className="h-[70px]">
                <Table.Cell textAlign="center">Name</Table.Cell>
                <Table.Cell textAlign="center">width</Table.Cell>
                <Table.Cell textAlign="center">Weight</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        )}

        {/* Custom Order */}
        {orderDetail.deliveryMode === "Custom Order" && (
          <Table.Root size="lg">
            <Table.Header>
              <Table.Row className="bg-teal-700 h-[70px]" textAlign="center">
                {["Items", "Quantity", "Unit", "Image"].map((header) => (
                  <Table.ColumnHeader color="white" textAlign="center">
                    {header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row key={""} className="h-[70px]">
                <Table.Cell textAlign="center">Name</Table.Cell>
                <Table.Cell textAlign="center">Qty</Table.Cell>
                <Table.Cell textAlign="center">Unit</Table.Cell>
                <Table.Cell textAlign="center">Image</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        )}

        {/* Home Delivery and Take Away */}
        {(orderDetail.deliveryMode === "Take Away" ||
          orderDetail.deliveryMode === "Home Delivery") && (
          <Table.Root size="lg">
            <Table.Header>
              <Table.Row className="bg-teal-700 h-[70px]" textAlign="center">
                {["Items", "Quantity", "Amount"].map((header) => (
                  <Table.ColumnHeader color="white" textAlign="center">
                    {header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row key={""} className="h-[70px]">
                <Table.Cell textAlign="center">Name</Table.Cell>
                <Table.Cell textAlign="center">Qty</Table.Cell>
                <Table.Cell textAlign="center">Amount</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        )}
      </div>
    </>
  );
};

export default OrderItems;
