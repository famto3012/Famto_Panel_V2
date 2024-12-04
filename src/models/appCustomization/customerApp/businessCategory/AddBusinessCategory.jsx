import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";

import {
  DialogRoot,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { toaster } from "@/components/ui/toaster";

import RenderIcon from "@/icons/RenderIcon";

import ModalLoader from "@/components/others/ModalLoader";
import Error from "@/components/others/Error";

import { getAllGeofence } from "@/hooks/geofence/useGeofence";
import { createNewBusinessCategory } from "@/hooks/customerAppCustomization/useBusinessCategory";

const AddBusinessCategory = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    geofenceId: [],
  });
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: allGeofence,
    isLoading: geofenceLoading,
    isError: geofenceError,
  } = useQuery({
    queryKey: ["all-geofence"],
    queryFn: () => getAllGeofence(navigate),
    enabled: isOpen,
  });

  const handleAddCategory = useMutation({
    mutationKey: ["add-business-category"],
    mutationFn: (data) => createNewBusinessCategory(data, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-businessCategory"]);
      setFormData({
        title: "",
        geofenceId: [],
      });
      setPreviewURL(null);
      setSelectedFile(null);
      onClose();
      toaster.create({
        title: "Success",
        description: "New business category created successfully",
        type: "success",
      });
    },
    onError: (data) => {
      toaster.create({
        title: "Error",
        description:
          data?.message || "Error while creating new business category",
        type: "error",
      });
    },
  });

  const handleSave = () => {
    const formDataObject = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => {
          formDataObject.append(key, item);
        });
      } else {
        formDataObject.append(key, formData[key]);
      }
    });

    selectedFile && formDataObject.append("bannerImage", selectedFile);

    handleAddCategory.mutate(formDataObject);
  };

  const geofenceOptions = allGeofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleSelectFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <DialogRoot
      open={isOpen}
      onInteractOutside={onClose}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent>
        <DialogCloseTrigger onClick={onClose} />
        <DialogHeader>
          <DialogTitle className="font-[600] text-[18px]">
            Add Business category
          </DialogTitle>
        </DialogHeader>

        <DialogBody>
          {geofenceLoading ? (
            <ModalLoader />
          ) : geofenceError ? (
            <Error />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="w-1/2 text-gray-500">Service title</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="title"
                  value={formData?.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="w-1/2 text-gray-500">Geofence</label>

                <Select
                  className="w-2/3 outline-none focus:outline-none"
                  value={geofenceOptions?.filter((option) =>
                    formData?.geofenceId?.includes(option.value)
                  )}
                  isMulti={true}
                  isSearchable={true}
                  onChange={(selectedOptions) =>
                    setFormData((prev) => ({
                      ...prev,
                      geofenceId:
                        selectedOptions?.map((option) => option.value) || [],
                    }))
                  }
                  options={geofenceOptions}
                  placeholder="Select geofence"
                  isClearable={true}
                />
              </div>

              <div className="flex items-start">
                <label className="w-1/2 text-gray-500">
                  Image (342px x 160px)
                </label>

                <div className="flex items-center w-2/3 gap-[30px]">
                  {!previewURL ? (
                    <div className="bg-gray-400 h-16 w-16 rounded-md" />
                  ) : (
                    <figure className="h-16 w-16 rounded-md">
                      <img
                        src={previewURL}
                        alt={formData?.title}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </figure>
                  )}

                  <input
                    type="file"
                    name="businessImage"
                    id="businessImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleSelectFile}
                  />
                  <label
                    htmlFor="businessImage"
                    className="cursor-pointer bg-teal-800 text-white flex items-center justify-center h-16 w-16 rounded"
                  >
                    <RenderIcon iconName="CameraIcon" size={24} loading={6} />
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-[20px] gap-4">
                <button
                  className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  disabled={handleAddCategory.isPending}
                  className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                  onClick={handleSave}
                >
                  {handleAddCategory.isPending ? `Saving...` : `Save`}
                </button>
              </div>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
  s;
};

export default AddBusinessCategory;
