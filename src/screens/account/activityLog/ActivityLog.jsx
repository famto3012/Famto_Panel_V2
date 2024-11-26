import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Table } from "@chakra-ui/react";

import GlobalSearch from "@/components/others/GlobalSearch";
import ShowSpinner from "@/components/others/ShowSpinner";

import { fetchAllActivityLogs } from "@/hooks/activityLog/activityLog";

const ActivityLog = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["activity-log"],
    queryFn: () => fetchAllActivityLogs(navigate),
  });

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="py-4 flex items-center">
        <p className="ps-4 text-[20px] font-[600]">
          Account Logs
          <span className="text-gray-400 text-[16px] ms-2">
            ( Last 10 days )
          </span>
        </p>
      </div>

      <Table.Root striped interactive stickyHeader>
        <Table.Header>
          <Table.Row className="bg-teal-700 h-[70px]">
            <Table.ColumnHeader color="white" textAlign="center" colSpan={2}>
              Date and Time
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" textAlign="center" colSpan={6}>
              Description
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={8} textAlign="center">
                <ShowSpinner /> Loading...
              </Table.Cell>
            </Table.Row>
          ) : data?.length === 0 ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={8} textAlign="center">
                No Activity logs available
              </Table.Cell>
            </Table.Row>
          ) : isError ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={8} textAlign="center">
                Error
              </Table.Cell>
            </Table.Row>
          ) : (
            data?.map((item, index) => (
              <Table.Row key={index} className={`h-[70px]`}>
                <Table.Cell textAlign="center" colSpan={2}>
                  {item.date} at {item.time}
                </Table.Cell>
                <Table.Cell textAlign="start" colSpan={6}>
                  {item.description}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ActivityLog;
