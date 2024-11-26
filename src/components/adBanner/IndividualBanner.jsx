import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HStack, Table } from "@chakra-ui/react";

import { toaster } from "@/components/ui/toaster";
import { Switch } from "@/components/ui/switch";

import RenderIcon from "@/icons/RenderIcon";

import ShowSpinner from "@/components/others/ShowSpinner";

import {
  fetchAllIndividualBanner,
  updateIndividualBannerStatus,
} from "@/hooks/adBanner/adBanner";

import AddIndividualBanner from "@/models/marketing/adBanner/AddIndividualBanner";
import EditIndividualBanner from "@/models/marketing/adBanner/EditIndividualBanner";
import DeleteIndividualBanner from "@/models/marketing/adBanner/DeleteIndividualBanner";

const IndividualBanner = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [modal, setModal] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-individual-banner"],
    queryFn: () => fetchAllIndividualBanner(navigate),
  });

  const toggleStatus = useMutation({
    mutationKey: ["toggle-individual-banner"],
    mutationFn: (bannerId) => updateIndividualBannerStatus(bannerId, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-individual-banner"]);
      toaster.create({
        title: "Success",
        description: "Individual banner status updated successfully",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error while updating individual banner status",
        type: "error",
      });
    },
  });

  const toggleModal = (type, id = null) => {
    setSelectedId(id);
    setModal((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = () => {
    setSelectedId(null);
    setModal({
      add: false,
      edit: false,
      delete: false,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mx-10 mt-10">
        <h1 className="text-lg font-bold outline-none focus:outline-none">
          Individual Merchant Ad Banner
        </h1>
        <div>
          <button
            className="bg-teal-800 text-white rounded-md flex items-center px-9 py-2 mb-7"
            onClick={() => toggleModal("add")}
          >
            <RenderIcon iconName="PlusIcon" size={18} loading={6} />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="mt-5 max-h-[30rem]">
        <Table.Root striped interactive stickyHeader>
          <Table.Header>
            <Table.Row className="bg-teal-700 h-14">
              {[
                "Image",
                "Name",
                "Merchant ID",
                "Geofence",
                "Status",
                "Actions",
              ].map((header, index) => (
                <Table.ColumnHeader
                  key={index}
                  color="white"
                  textAlign="center"
                >
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <Table.Row className="h-[70px]">
                <Table.Cell colSpan={6} textAlign="center">
                  <ShowSpinner /> Loading...
                </Table.Cell>
              </Table.Row>
            ) : data?.length === 0 ? (
              <Table.Row className="h-[70px]">
                <Table.Cell colSpan={6} textAlign="center">
                  No App Banner Available
                </Table.Cell>
              </Table.Row>
            ) : isError ? (
              <Table.Row className="h-[70px]">
                <Table.Cell colSpan={6} textAlign="center">
                  Error in fetching App Banner.
                </Table.Cell>
              </Table.Row>
            ) : (
              data?.map((item) => (
                <Table.Row key={item._id} className={`h-[70px]`}>
                  <Table.Cell
                    textAlign="center"
                    className="flex items-center justify-center flex-1"
                  >
                    <figure className="h-[70px] w-[100px]">
                      <img
                        src={item.imageUrl}
                        className="w-full h-full object-contain"
                      />
                    </figure>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{item.name}</Table.Cell>
                  <Table.Cell textAlign="center">{item.merchantId}</Table.Cell>
                  <Table.Cell textAlign="center">{item.geofenceId}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <HStack direction="row" gap="4" justify="center">
                      <Switch
                        colorPalette="teal"
                        checked={item?.status}
                        onChange={() => toggleStatus.mutate(item._id)}
                      />
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack direction="row" gap="4" justify="center">
                      <span
                        onClick={() => toggleModal("edit", item._id)}
                        className="text-gray-600"
                      >
                        <RenderIcon iconName="EditIcon" size={20} loading={6} />
                      </span>

                      <span
                        onClick={() => toggleModal("delete", item._id)}
                        className="text-red-500"
                      >
                        <RenderIcon
                          iconName="DeleteIcon"
                          size={24}
                          loading={6}
                        />
                      </span>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </div>

      <AddIndividualBanner isOpen={modal.add} onClose={closeModal} />
      <EditIndividualBanner
        isOpen={modal.edit}
        onClose={closeModal}
        bannerId={selectedId}
      />
      <DeleteIndividualBanner
        isOpen={modal.delete}
        onClose={closeModal}
        bannerId={selectedId}
      />
    </>
  );
};

export default IndividualBanner;