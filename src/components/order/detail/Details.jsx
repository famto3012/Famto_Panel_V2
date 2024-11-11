import { Table } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <>
      <div className="mt-10">
        <h1 className="text-[18px] font-semibold ml-5 mb-5">
          Customer Details
        </h1>

        <Table.Root size="lg">
          <Table.Header>
            <Table.Row className="bg-teal-700 h-[70px]" textAlign="center">
              {[
                "Customer Id",
                "Name",
                "Email",
                "Phone",
                "Address",
                "Ratings to Delivery Agent",
                "Rating by Delivery Agent",
              ].map((header) => (
                <Table.ColumnHeader color="white" textAlign="center">
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={""} className="h-[70px]">
              <Table.Cell textAlign="center">
                <Link
                  to={`/customer/45`}
                  className="underline underline-offset-2 cursor-pointer"
                >
                  O24013
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="center">Pending</Table.Cell>
              <Table.Cell textAlign="center">Merchant Name</Table.Cell>
              <Table.Cell textAlign="center">Customer Name</Table.Cell>
              <Table.Cell textAlign="center">Delivery Mode</Table.Cell>
              <Table.Cell textAlign="center">Order Time</Table.Cell>
              <Table.Cell textAlign="center">Delivery Time</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>

      <div className="mt-10">
        <h1 className="text-[18px] font-semibold ml-5 mb-5">
          Merchant Details
        </h1>

        <Table.Root size="lg">
          <Table.Header>
            <Table.Row className="bg-teal-700 h-[70px]" textAlign="center">
              {[
                "Merchant Id",
                "Name",
                "Instructions by Customer",
                "Merchant Earnings",
                "Famto Earnings",
              ].map((header) => (
                <Table.ColumnHeader color="white" textAlign="center">
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={""} className="h-[70px]">
              <Table.Cell textAlign="center">
                <Link
                  to={`/customer/45`}
                  className="underline underline-offset-2 cursor-pointer"
                >
                  O24013
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="center">Pending</Table.Cell>
              <Table.Cell textAlign="center">Merchant Name</Table.Cell>
              <Table.Cell textAlign="center">Customer Name</Table.Cell>
              <Table.Cell textAlign="center">Delivery Mode</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>

      <div className="mt-10">
        <h1 className="text-[18px] font-semibold ml-5 mb-5">
          Delivery Agent Details
        </h1>

        <Table.Root size="lg">
          <Table.Header>
            <Table.Row className="bg-teal-700 h-[70px]" textAlign="center">
              {[
                "Agent Id",
                "Name",
                "Team Name",
                "Instruction by Customer",
                "Time taken",
                "Distance travelled",
                "Delayed by",
              ].map((header) => (
                <Table.ColumnHeader color="white" textAlign="center">
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={""} className="h-[70px]">
              <Table.Cell textAlign="center">
                <Link
                  to={`/customer/45`}
                  className="underline underline-offset-2 cursor-pointer"
                >
                  O24013
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="center">Pending</Table.Cell>
              <Table.Cell textAlign="center">Merchant Name</Table.Cell>
              <Table.Cell textAlign="center">Customer Name</Table.Cell>
              <Table.Cell textAlign="center">Delivery Mode</Table.Cell>
              <Table.Cell textAlign="center">Delivery Mode</Table.Cell>
              <Table.Cell textAlign="center">Delivery Mode</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default Details;
