import Select from "react-select";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import { formatDate, formatTime } from "@/utils/formatter";
import {
  getTaskAccordingToFilter,
  getTaskByDateRange,
  searchTaskAccordingToOrderId,
} from "@/hooks/deliveryManagement/useDeliveryManagement";
import { taskStatusOptions } from "@/utils/defaultData";
import AssignAgent from "@/models/general/deliverymanagement/AssignAgent";
import { Card } from "@chakra-ui/react";
import ShowSpinner from "@/components/others/ShowSpinner";
import TaskDetails from "@/models/general/deliverymanagement/TaskDetails";

const AllTask = ({ onShowShopLocationOnMap, onDate }) => {
  const [taskFilter, setTaskFilter] = useState("Unassigned");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [taskData, setTaskData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modal, setModal] = useState({
    assignAgent: false,
    viewDetail: false,
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [datesAvailable, setDatesAvailable] = useState(false);

  const navigate = useNavigate();

  const { data: filteredTaskData, isLoading: isFilterLoading } = useQuery({
    queryKey: ["get-all-task", taskFilter],
    queryFn: () => getTaskAccordingToFilter(taskFilter, navigate),
    enabled: !!taskFilter,
  });

  const { data: taskDataByDate, isLoading: isDateLoading } = useQuery({
    queryKey: ["get-task-by-date", startDate, endDate],
    queryFn: () => getTaskByDateRange(startDate, endDate, navigate),
    enabled: datesAvailable,
  });

  const handleSearchTaskByOrderId = useMutation({
    mutationKey: ["search-task-by-order-id"],
    mutationFn: (orderId) => searchTaskAccordingToOrderId(orderId, navigate),
    onSuccess: (data) => {
      setTaskData(data || []);
    },
    onError: (error) => {
      toaster.create({
        title: "Error",
        description: error.message || "Error fetching tasks.",
        type: "error",
      });
    },
  });

  const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((orderId) => {
      if (orderId.trim()) {
        handleSearchTaskByOrderId.mutate(orderId);
      }
    }, 300),
    []
  );

  const selectChange = (option) => {
    setTaskFilter(option.value);
  };

  const toggleModal = (type, id = null) => {
    setSelectedTask(id);
    setModal((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModal({ assignAgent: false, viewDetail: false });
  };

  useEffect(() => {
    if (onDate) {
      setStartDate(new Date(onDate[0]));
      setEndDate(new Date(onDate[1]));
      setDatesAvailable(true);
    }

    if (datesAvailable && taskDataByDate) {
      setTaskData(
        taskDataByDate.filter((item) => item.taskStatus === taskFilter)
      );
    } else if (filteredTaskData) {
      setTaskData(filteredTaskData);
    }
  }, [filteredTaskData, onDate, taskDataByDate, taskFilter, datesAvailable]);

  const isLoading =
    isFilterLoading || isDateLoading || handleSearchTaskByOrderId.isPending;

  return (
    <>
      <div className="w-1/4 rounded-lg bg-white">
        <div className="bg-teal-800 text-white p-5 xl:px-[25px] rounded-lg flex items-center justify-between">
          <p>Tasks</p>
          <p className="bg-white text-teal-800 font-bold rounded-full w-[25px] h-[25px] flex justify-center items-center">
            {taskData.length}
          </p>
        </div>

        <div className="w-full p-2 mt-4">
          <Select
            options={taskStatusOptions}
            value={taskStatusOptions.find(
              (option) => option.value === taskFilter
            )}
            onChange={selectChange}
            className="rounded-lg w-full"
            placeholder="Select Task status"
            isSearchable={false}
          />

          <input
            type="search"
            className="border-2 border-zinc-200 bg-white rounded-lg mt-5 mb-5 p-2 w-full focus:outline-none"
            placeholder="Search order Id"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              debouncedSearch(e.target.value);
            }}
          />

          <div className="bg-white max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <ShowSpinner />
            ) : taskData?.length === 0 ? (
              <p className="text-center mt-[20px]">No Tasks Found.</p>
            ) : (
              taskData.map((data) => (
                <Card.Root
                  className="bg-zinc-100 mt-3 h-[200px]"
                  key={data?._id}
                >
                  <Card.Header className="h-[50px]">
                    <Card.Title className="text-[17px] font-semibold">
                      {`${formatDate(data?.createdAt)} ${formatTime(data?.createdAt)}`}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      {data?.pickupDetail?.pickupAddress?.fullName || "N/A"}
                    </p>
                    <p>{data?.pickupDetail?.pickupAddress?.area || "N/A"}</p>
                  </Card.Body>
                  <Card.Footer className="flex justify-between">
                    <Button
                      className="bg-gray-200 text-black text-[12px] p-4 font-semibold"
                      onClick={() =>
                        onShowShopLocationOnMap({
                          coordinates: data?.pickupDetail?.pickupLocation,
                          fullName: data?.pickupDetail?.pickupAddress?.fullName,
                          Id: data?.orderId,
                        })
                      }
                    >
                      View on Map
                    </Button>

                    {data?.taskStatus === "Assigned" ||
                    data?.taskStatus === "Completed" ? (
                      <Button
                        className="bg-teal-800 text-white text-[12px] p-4 font-semibold"
                        onClick={() => toggleModal("viewDetail", data?._id)}
                      >
                        View Details
                      </Button>
                    ) : (
                      <Button
                        className="bg-teal-800 text-white text-[12px] p-4 font-semibold"
                        onClick={() => toggleModal("assignAgent", data?._id)}
                      >
                        Assign Agent
                      </Button>
                    )}
                  </Card.Footer>
                </Card.Root>
              ))
            )}
          </div>
        </div>
      </div>

      <AssignAgent
        isOpen={modal.assignAgent}
        onClose={closeModal}
        taskId={selectedTask}
      />
      <TaskDetails
        isOpen={modal.viewDetail}
        onClose={closeModal}
        taskId={selectedTask}
      />
    </>
  );
};

export default AllTask;
