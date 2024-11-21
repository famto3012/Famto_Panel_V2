const AgentSurge = () => {
  return (
    <>
      <div className="flex items-center justify-between mx-9 mt-8">
        <h1 className="text-md">Surge</h1>
        <div>
          <button
            className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
            onClick={showModalAddSurge}
          >
            <PlusOutlined className="mr-3" /> Add Surge
          </button>
          <AddAgentSurgeModal
            isVisible={isModalVisibleAddSurge}
            handleCancel={handleCancel}
            token={token}
            BASE_URL={BASE_URL}
            geofence={geofence}
            onAddSurge={handleAddSurge}
          />
        </div>
      </div>

      <div className="overflow-auto w-full max-h-[30rem]">
        <table className="w-full mt-[20px]">
          <thead className="sticky top-0 left-0 z-50">
            <tr>
              {[
                "Rule Name",
                "Base Fare",
                "Base Distance Fare",
                "Waiting Fare",
                "Waiting Time",
                "Geofence",
                "Status",
              ].map((header, index) => (
                <th
                  key={index}
                  className="bg-teal-700 text-center text-white px-8 py-3 border-r-2 border-[#eee]/50"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-center h-20">
                  Loading Data...
                </td>
              </tr>
            )}

            {!isLoading && agentsurge?.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <p className="flex items-center justify-center h-20">
                    No data available
                  </p>
                </td>
              </tr>
            )}

            {!isLoading &&
              agentsurge.map((agentsurge) => (
                <tr
                  key={agentsurge._id}
                  className="align-middle even:bg-gray-200 last:border-2 text-center "
                >
                  <td>{agentsurge.ruleName}</td>
                  <td>{agentsurge.baseFare}</td>
                  <td>{agentsurge.baseDistance}</td>
                  <td>{agentsurge.waitingFare}</td>
                  <td>{agentsurge.waitingTime}</td>
                  <td>{agentsurge.geofenceId.name}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div className="z-30">
                        <Switch
                          checked={agentsurge.status}
                          onChange={() => handleToggleSurge(agentsurge._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditSurge(agentsurge._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                      </div>
                      <button
                        onClick={() => showModalDeleteSurge(agentsurge._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentSurge;
