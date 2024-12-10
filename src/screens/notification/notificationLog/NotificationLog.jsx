import GlobalSearch from "../../../components/others/GlobalSearch";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTime } from "@/utils/formatters";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { HStack, Table } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { getNotificationLog } from "@/hooks/notification/useNotification";
import Error from "@/components/others/Error";
import ShowSpinner from "@/components/others/ShowSpinner";

const NotificationLog = () => {
  const [notificationLogData, setNotificationLogData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const getNotification = role || page || limit;

  const {
    data: notificationLog,
    isLoading: notificationLogLoading,
    isError,
  } = useQuery({
    queryKey: ["get-all-notification-log", role, page, limit],
    queryFn: () => getNotificationLog({ role, page, limit, navigate }),
    enabled: !!getNotification,
  });

  useEffect(() => {
    if (notificationLog) {
      setNotificationLogData(notificationLog.data);
      setPagination(notificationLog);
    }
  }, [notificationLog]);

  if (isError) return <Error />;

  return (
    <>
      <div className="w-full h-screen bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div>
          <h1 className="text-lg font-bold mt-2 mb-[30px] mx-11 flex">
            Notification Log
          </h1>
        </div>
        <div className="overflow-x-auto">
          <Table.Root striped interactive>
            <Table.Header>
              <Table.Row className="bg-teal-700 h-[70px]">
                {["Order ID / Image", "Notification", "Date & Time"].map(
                  (header, index) => (
                    <Table.ColumnHeader
                      key={index}
                      color="white"
                      textAlign="center"
                    >
                      {header}
                    </Table.ColumnHeader>
                  )
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {notificationLogLoading ? (
                <Table.Row className="h-[70px]">
                  <Table.Cell colSpan={6} textAlign="center">
                    <ShowSpinner /> Loading...
                  </Table.Cell>
                </Table.Row>
              ) : notificationLogData?.length === 0 ? (
                <Table.Row className="h-[70px]">
                  <Table.Cell colSpan={6} textAlign="center">
                    No notification logs available
                  </Table.Cell>
                </Table.Row>
              ) : (
                notificationLogData.map((notification) => (
                  <Table.Row key={notification._id} className="h-[70px]">
                    <Table.Cell textAlign="center">
                      {notification?.orderId ? (
                        <span className="font-semibold">
                          {notification?.orderId}
                        </span>
                      ) : notification?.imageUrl ? (
                        <div className="flex justify-center items-center">
                          <img
                            className="w-[150px] h-[80px] object-cover"
                            src={notification?.imageUrl}
                            alt="Order Image"
                          />
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <span className="font-bold block">
                        {notification?.title}
                      </span>
                      <span className="block">
                        {notification?.description?.length > 30
                          ? `${notification?.description.substring(0, 30)}...`
                          : notification?.description}
                      </span>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {`${formatDate(notification?.createdAt)} ${formatTime(
                        notification?.createdAt
                      )}`}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
          <div className="flex justify-center bg-white mt-5 mb-4">
            <PaginationRoot
              count={pagination.totalDocuments || 0}
              page={page}
              pageSize={30}
              defaultPage={1}
              onPageChange={(e) => setPage(e.page)}
              variant="solid"
              className="py-[50px] flex justify-center"
            >
              <HStack>
                <PaginationPrevTrigger className="bg-gray-200 hover:bg-white" />
                <PaginationItems className="bg-gray-200 hover:bg-white" />
                <PaginationNextTrigger className="bg-gray-200 hover:bg-white" />
              </HStack>
            </PaginationRoot>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationLog;
