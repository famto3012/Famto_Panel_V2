import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { HStack } from "@chakra-ui/react";

import {
  DialogRoot,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { toaster } from "@/components/ui/toaster";

import ModalLoader from "@/components/others/ModalLoader";

import RenderIcon from "@/icons/RenderIcon";

import { getAllGeofence } from "@/hooks/geofence/useGeofence";
import { fetchMerchantsForDropDown } from "@/hooks/merchant/useMerchant";
import { createNewPromoCode } from "@/hooks/promocode/usePromocode";

import { promoCodeModeOptions } from "@/utils/defaultData";

import "react-datepicker/dist/react-datepicker.css";

const AddPromoCode = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    promoCode: "",
    promoType: "",
    discount: "",
    description: "",
    fromDate: "",
    toDate: "",
    applicationMode: "",
    maxDiscountValue: "",
    minOrderAmount: "",
    maxAllowedUsers: "",
    appliedOn: "",
    merchantId: [],
    geofenceId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: allMerchants,
    isLoading: merchantLoading,
    isError: merchantError,
  } = useQuery({
    queryKey: ["merchant-dropdown"],
    queryFn: () => fetchMerchantsForDropDown(navigate),
    enabled: isOpen,
  });

  const {
    data: allGeofence,
    isLoading: geofenceLoading,
    isError: geofenceError,
  } = useQuery({
    queryKey: ["all-geofence"],
    queryFn: () => getAllGeofence(navigate),
    enabled: isOpen,
  });

  const handleAddPromoCode = useMutation({
    mutationKey: ["add-promo-code"],
    mutationFn: (promoData) => createNewPromoCode(promoData, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-promo-codes"]);
      onClose();
      toaster.create({
        title: "Success",
        description: "New promo code added",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error in creating new promo code",
        type: "error",
      });
    },
  });

  const handleSave = () => {
    const formDataObject = new FormData();

    console.log(selectedFile);

    Object.entries(formData).forEach(([key, value]) => {
      formDataObject.append(key, value);
    });
    selectedFile && formDataObject.append("promoImage", selectedFile);

    handleAddPromoCode.mutate(formDataObject);
  };

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

  const merchantOptions = allMerchants?.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  const geofenceOptions = allGeofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const showLoading = merchantLoading || geofenceLoading;
  const showError = merchantError || geofenceError;

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
            Add Promo code
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
            <div className="flex flex-col p-2 justify-between">
              <div className="h-[30rem] overflow-y-auto">
                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Code<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="promoCode"
                    className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex mt-5">
                  <label className="w-1/2 text-gray-500">
                    Promotion Type<span className="text-red-600 ml-2">*</span>
                  </label>
                  <RadioGroup
                    value={formData.promoType}
                    onValueChange={(e) =>
                      setFormData({ ...formData, promoType: e.value })
                    }
                    className="w-2/3"
                    size="sm"
                    colorPalette="teal"
                    variant="solid"
                  >
                    <HStack gap="8" direction="row">
                      <Radio value="Flat-discount">Flat discount</Radio>
                      <Radio value="Percentage-discount">
                        Percentage discount
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Discount<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="number"
                    name="discount"
                    className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                    value={formData.discount}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Description Max 150 characters.
                  </label>
                  <input
                    type="text"
                    name="description"
                    maxLength={150}
                    className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center mt-5">
                  <label className="w-4/5 text-gray-500">
                    From<span className="text-red-600">*</span>
                  </label>

                  <div className="flex justify-start w-full">
                    <DatePicker
                      selected={formData.fromDate}
                      onChange={(date) =>
                        setFormData({ ...formData, fromDate: date })
                      }
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      className="border-2 border-gray-300 rounded focus:outline-none p-2 w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center mt-5">
                  <label className="w-4/5 text-gray-500">
                    To<span className="text-red-600">*</span>
                  </label>

                  <div className="flex justify-start w-full">
                    <DatePicker
                      selected={formData.toDate}
                      onChange={(date) =>
                        setFormData({ ...formData, toDate: date })
                      }
                      minDate={
                        formData?.fromDate
                          ? new Date(
                              new Date(formData?.fromDate).getTime() +
                                24 * 60 * 60 * 1000
                            )
                          : new Date()
                      }
                      dateFormat="yyyy-MM-dd"
                      className="border-2 border-gray-300 rounded focus:outline-none p-2 w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Promo Application Mode
                    <span className="text-red-600 ml-2">*</span>
                  </label>

                  <Select
                    options={promoCodeModeOptions}
                    value={promoCodeModeOptions?.find(
                      (option) => option.value === formData.applicationMode
                    )}
                    onChange={(option) =>
                      setFormData({
                        ...formData,
                        applicationMode: option.value,
                      })
                    }
                    className="border-gray-100 rounded focus:outline-none w-2/3"
                    placeholder="Select application mode"
                    isSearchable={true}
                    isMulti={false}
                  />
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Max discount value
                    <span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxDiscountValue"
                    value={formData.maxDiscountValue}
                    className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Minimum order amount
                    <span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="minOrderAmount"
                    value={formData.minOrderAmount}
                    className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Maximum number of allowed users
                    <span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxAllowedUsers"
                    value={formData.maxAllowedUsers}
                    className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex mt-5">
                  <label className="w-1/2 text-gray-500">
                    Applied on<span className="text-red-600 ml-2">*</span>
                  </label>

                  <RadioGroup
                    value={formData.appliedOn}
                    onValueChange={(e) =>
                      setFormData({ ...formData, appliedOn: e.value })
                    }
                    className="w-2/3"
                    size="sm"
                    colorPalette="teal"
                    variant="solid"
                  >
                    <HStack gap="8" direction="row">
                      <Radio value="Cart-value">Cart value</Radio>
                      <Radio value="Delivery-charge">Delivery charge</Radio>
                    </HStack>
                  </RadioGroup>
                </div>

                <div className="flex gap-4 mt-5">
                  <label className="w-1/2 text-gray-500">
                    Assign Merchant<span className="text-red-600 ml-2">*</span>
                  </label>

                  <Select
                    options={merchantOptions}
                    value={merchantOptions?.filter((option) =>
                      formData.merchantId?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      setFormData({
                        ...formData,
                        merchantId: selectedOptions.map(
                          (option) => option.value
                        ),
                      })
                    }
                    className="border-gray-100 rounded focus:outline-none w-2/3"
                    placeholder="Select merchants"
                    isSearchable
                    isMulti
                    isClearable
                    menuPlacement="top"
                  />
                </div>

                <div className="flex gap-4 mt-5 ">
                  <label className="w-1/2 text-gray-500">
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
                    className="border-gray-100 rounded focus:outline-none w-2/3"
                    placeholder="Select geofence"
                    isSearchable={true}
                    isMulti={false}
                    menuPlacement="top"
                  />
                </div>

                <div className="flex items-center mt-5">
                  <label className=" w-1/2">
                    Image (342px x 160px)
                    <span className="text-red-600">*</span>
                  </label>
                  <div className=" flex items-center w-2/3 gap-2">
                    {!previewURL ? (
                      <div className="h-[66px] w-[66px] bg-gray-200 rounded-md"></div>
                    ) : (
                      <figure>
                        <img
                          src={previewURL}
                          alt={formData.promoCode}
                          className="h-[66px] w-[66px] object-cover rounded-md"
                        />
                      </figure>
                    )}

                    <input
                      type="file"
                      name="promoImage"
                      id="promoImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleSelectImage}
                    />

                    <label
                      htmlFor="promoImage"
                      className="cursor-pointer bg-teal-700 text-white h-[66px] w-[66px] flex items-center justify-center rounded-md"
                    >
                      <RenderIcon iconName="CameraIcon" size={24} loading={6} />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-10  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                  >
                    {handleAddPromoCode.isPending ? `Saving...` : `Save`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddPromoCode;
