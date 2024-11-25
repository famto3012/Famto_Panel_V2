import { useEffect, useState } from "react";
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

import ModalLoader from "@/components/others/ModalLoader";

import { getAllGeofence } from "@/hooks/geofence/useGeofence";
import {
  fetchSingleIndividualBanner,
  updateIndividualBannerDetail,
} from "@/hooks/adBanner/adBanner";

import RenderIcon from "@/icons/RenderIcon";

const EditIndividualBanner = ({ isOpen, onClose, bannerId }) => {
  const [formData, setFormData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

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

  const {
    data: bannerData,
    isLoading: bannerLoading,
    isError: bannerError,
  } = useQuery({
    queryKey: ["individual-banner-detail", bannerId],
    queryFn: ({ queryKey }) => {
      const [_, id] = queryKey;
      return fetchSingleIndividualBanner(id, navigate);
    },
    enabled: isOpen,
  });

  const handleEditBanner = useMutation({
    mutationKey: ["edit-individual-banner"],
    mutationFn: ({ bannerId, formDataObject }) =>
      updateIndividualBannerDetail(bannerId, formDataObject, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-individual-banner"]);
      setFormData({
        name: "",
        merchantId: "",
        geofenceId: "",
      });
      setSelectedFile(null);
      setPreviewURL(null);
      onClose();
      toaster.create({
        title: "Success",
        description: "Updated Individual Banner detail",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error in updating individual banner detail",
        type: "error",
      });
    },
  });

  const handleSave = () => {
    const formDataObject = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataObject.append(key, value);
    });
    selectedFile && formDataObject.append("bannerImage", selectedFile);

    handleEditBanner.mutate({ bannerId, formDataObject });
  };

  useEffect(() => {
    bannerData && setFormData(bannerData);
  }, [bannerData]);

  const geofenceOptions = allGeofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const showLoading = geofenceLoading || bannerLoading;
  const showError = geofenceError || bannerError;

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
            Add App Banner
          </DialogTitle>
        </DialogHeader>

        <DialogBody>
          {showLoading ? (
            <ModalLoader />
          ) : showError ? (
            <>
              <p>Error</p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <label htmlFor="name" className="w-1/3">
                    Name<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300  rounded p-2 w-2/3 outline-none focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="merchantId" className="w-1/3">
                    Merchant ID<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Merchant ID"
                    id="merchantId"
                    name="merchantId"
                    value={formData.merchantId}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300  rounded p-2 w-2/3 outline-none focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="geofenceId" className="w-1/3">
                    Geofence<span className="text-red-600 ml-2">*</span>
                  </label>

                  <Select
                    options={geofenceOptions}
                    value={geofenceOptions?.find(
                      (option) => option.value === formData.geofenceId
                    )}
                    onChange={(option) =>
                      setFormData({
                        ...formData,
                        geofenceId: option.value,
                      })
                    }
                    className="rounded w-2/3 outline-none focus:outline-none"
                    placeholder="Select geofence"
                    isSearchable={true}
                    isMulti={false}
                    menuPlacement="auto"
                  />
                </div>

                <div className="flex items-center mt-5">
                  <label className="w-1/3">
                    Banner Image <span className="text-red-600 ml-2">*</span>{" "}
                    <br /> (342px x 160px)
                  </label>

                  <div className="flex items-center gap-[30px]">
                    <figure>
                      <img
                        src={previewURL || formData?.imageUrl}
                        alt={formData.name}
                        className="h-[80px] w-[175px] rounded-md object-cover"
                      />
                    </figure>

                    <input
                      type="file"
                      name="bannerImage"
                      id="bannerImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleSelectImage}
                    />
                    <label
                      htmlFor="bannerImage"
                      className="cursor-pointer bg-teal-700 p-5  text-white rounded-md"
                    >
                      <RenderIcon iconName="CameraIcon" size={20} loading={6} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-4 rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-teal-700 text-white py-2 px-4 rounded-md"
                >
                  {handleEditBanner.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default EditIndividualBanner;
