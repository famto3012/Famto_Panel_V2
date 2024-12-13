import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { HStack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

import RenderIcon from "@/icons/RenderIcon";

import Error from "@/components/others/Error";
import ShowSpinner from "@/components/others/ShowSpinner";

import { fetchAllOrders } from "@/hooks/order/useOrder";

const AllOrdersTable = ({ filter }) => {
  const [page, setPage] = useState(1);
  const limit = 50;

  const navigate = useNavigate();

  const {
    data: orderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-orders", filter, page, limit],
    queryFn: () => fetchAllOrders(filter, page, limit, navigate),
    placeholderData: keepPreviousData,
  });

  const handleAcceptOrder = useMutation({
    mutationKey: ["acceptOrder"],
    mutationFn: (orderId) => acceptOrder(orderId, role, navigate),
    onMutate: (orderId) => {
      setLoadingOrderId(orderId);
    },
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Order accepted",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Failed to accept order",
        type: "error",
      });
    },
  });

  return (
    <div>
      <Table.Root className="mt-5 z-10">
        <Table.Header>
          <Table.Row className="bg-teal-700 h-14">
            {[
              "Order ID",
              "Order Status",
              "Merchant Name",
              "Customer Name",
              "Delivery Mode",
              "Order Time",
              "Delivery Time",
              "Payment Method",
              "Delivery Option",
              "Amount",
            ].map((header, idx) => (
              <Table.ColumnHeader key={idx} color="white" textAlign="center">
                {header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={10} textAlign="center">
                <ShowSpinner /> Loading...
              </Table.Cell>
            </Table.Row>
          ) : isError ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={10} textAlign="center">
                <Error />
              </Table.Cell>
            </Table.Row>
          ) : orderData?.data?.length === 0 ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={10} textAlign="center">
                No Orders Available
              </Table.Cell>
            </Table.Row>
          ) : (
            orderData?.data?.map((order) => (
              <Table.Row
                key={order.orderId}
                className={`h-[70px] ${
                  order.orderStatus.trim().toLowerCase() === "pending" &&
                  filter.selectedOption === "order"
                    ? "bg-red-500 text-white"
                    : "even:bg-gray-100"
                }`}
              >
                <Table.Cell textAlign="center">
                  <Link
                    to={`/order/${order.orderId}`}
                    className="underline underline-offset-2 cursor-pointer"
                  >
                    {order.orderId}
                  </Link>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {order.orderStatus === "Pending" &&
                  filter.selectedOption === "order" ? (
                    <HStack gap={3} alignItems="center">
                      <span
                        onClick={() => handleAcceptOrder.mutate(order.orderId)}
                        className="cursor-pointer"
                      >
                        <RenderIcon
                          iconName="CheckIcon"
                          size={28}
                          loading={6}
                        />
                      </span>
                      <span
                        onClick={() => openRejectDialog(order.orderId)}
                        className="cursor-pointer"
                      >
                        <RenderIcon
                          iconName="CancelIcon"
                          size={28}
                          loading={6}
                        />
                      </span>
                    </HStack>
                  ) : (
                    <p
                      className={`text-[16px] font-[600] ${
                        order.orderStatus === "Completed"
                          ? "text-green-600"
                          : order.orderStatus === "Cancelled"
                            ? "text-red-600"
                            : order.orderStatus === "On-going"
                              ? "text-orange-600"
                              : ""
                      }`}
                    >
                      {order.orderStatus}
                    </p>
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">{order.merchantName}</Table.Cell>
                <Table.Cell textAlign="center">{order.customerName}</Table.Cell>
                <Table.Cell textAlign="center">{order.deliveryMode}</Table.Cell>
                <Table.Cell textAlign="center">
                  <p>{order.orderDate}</p>
                  <p>{order.orderTime}</p>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <p>{order.deliveryDate}</p>
                  <p>{order.deliveryTime}</p>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {order.paymentMethod}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {order.deliveryOption}
                </Table.Cell>
                <Table.Cell textAlign="center">{order.amount}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      {orderData?.totalCount && (
        <PaginationRoot
          count={orderData.totalCount}
          page={page}
          pageSize={50}
          defaultPage={1}
          onPageChange={(e) => setPage(e.page)}
          variant="solid"
          className="py-[30px] flex justify-center"
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      )}
    </div>
  );
};

export default AllOrdersTable;
