import ShowSpinner from "@/components/others/ShowSpinner";
import {
  getAgentMyName,
  getAllAgents,
} from "@/hooks/deliveryManagement/useDeliveryManagement";
import { agentDeliveryManagementStatusOptions } from "@/utils/defaultData";
import { Card } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AllAgent = ({ showAgentLocationOnMap }) => {
  const [agentFilter, setAgentFilter] = useState("Free");
  const [agentData, setAgentData] = useState([]);
  const [agentName, setAgentName] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  const { data: filteredAgentData, isLoading: filterAgentLoading } = useQuery({
    queryKey: ["get-all-agents", agentFilter],
    queryFn: () => getAllAgents(agentFilter, navigate),
    enabled: !!agentFilter,
  });

  const { data: searchedAgentData, isLoading: searchAgentLoading } = useQuery({
    queryKey: ["get-agent-by-name", agentName],
    queryFn: () => (debouncedSearch ? getAgentMyName(agentName, navigate) : []),
    enabled: !!debouncedSearch,
  });

  const selectChange = (option) => {
    const selectedTask = option.value;
    setAgentFilter(selectedTask);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setAgentData(searchedAgentData);
    } else {
      setAgentData(filteredAgentData);
    }
  }, [filteredAgentData, searchedAgentData, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(agentName);
    }, 500);

    return () => clearTimeout(handler);
  }, [agentName]);

  const isLoading = filterAgentLoading || searchAgentLoading;

  return (
    <div className="w-1/4 rounded-lg bg-white  pb-5">
      <div className="bg-teal-800 text-white p-5 xl:px-[25px] rounded-t-lg flex items-center justify-between">
        <p>Agents</p>
        <p className="bg-white text-teal-800 font-bold rounded-full w-[25px] h-[25px] flex justify-center items-center">
          {agentData?.length}
        </p>
      </div>

      <div className="w-full p-2 bg-white ">
        <Select
          options={agentDeliveryManagementStatusOptions}
          value={agentDeliveryManagementStatusOptions.find(
            (option) => option.value === agentFilter
          )}
          onChange={selectChange}
          className="rounded-lg w-full focus:outline-none mt-4 outline-none"
          placeholder="Select agent status"
          isSearchable={false}
          isMulti={false}
          styles={{
            control: (provided) => ({
              ...provided,
              paddingRight: "",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: "10px",
            }),
          }}
        />

        <input
          type="search"
          className="border-2 border-zinc-200 bg-white rounded-lg mt-5 p-2 w-full focus:outline-none"
          name="search"
          placeholder="Search agent name"
          onChange={(e) => {
            setAgentName(e?.target?.value);
          }}
        />
      </div>

      {isLoading ? (
        <ShowSpinner />
      ) : (
        <div className="px-5 max-h-[300px] overflow-y-auto">
          {agentData?.length === 0 ? (
            <p className="text-center mt-[20px]">No Agents Found.</p>
          ) : (
            agentData?.map((data) => (
              <Card.Root
                className="bg-zinc-100 mt-3 flex"
                key={data?._id}
                onClick={() =>
                  showAgentLocationOnMap({
                    coordinates: data?.location,
                    fullName: data?.fullName,
                    Id: data?._id,
                    phoneNumber: data?.phoneNumber,
                  })
                }
              >
                <div className="flex justify-between">
                  <div className="w-2/3">
                    <Card.Header className="h-[50px]">
                      <Card.Title className="text-[17px] font-semibold">
                        {data?._id}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title className="text-[17px]">
                        {data?.fullName}
                      </Card.Title>

                      <Card.Title className="text-[16px]">
                        {data?.phoneNumber}
                      </Card.Title>
                    </Card.Body>
                  </div>

                  <div className="w-1/3 flex justify-center items-center">
                    <div className="bg-teal-800 rounded-full h-[40px] w-[40px] flex justify-center items-center text-white">
                      {data?.taskCompleted}
                    </div>
                  </div>
                </div>
              </Card.Root>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllAgent;
