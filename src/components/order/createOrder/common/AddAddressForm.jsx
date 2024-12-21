import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { toaster } from "@/components/ui/toaster";

import Map from "@/models/common/Map";

const AddAddressForm = ({ onAddCustomerAddress }) => {
  const [formData, setFormData] = useState({
    type: "",
    fullName: "",
    phoneNumber: "",
    flat: "",
    area: "",
    landmark: "",
    saveAddress: false,
    latitude: null,
    longitude: null,
  });
  const [showButton, setShowButton] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, [formData]);

  const handleChangeAddress = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectLocation = (data) => {
    setFormData({ ...formData, latitude: data[0], longitude: data[1] });
  };

  const handleAddNewAddress = () => {
    const requiredFields = ["type", "fullName", "phoneNumber", "flat", "area"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (!formData.latitude || !formData.longitude) {
      missingFields.push("Location");
    }

    if (missingFields.length > 0) {
      const errorMessages = missingFields.map((field) => {
        const formattedField = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        return `${formattedField} is required`;
      });

      const formattedErrors = errorMessages.map((msg) => `• ${msg}`).join("\n");

      toaster.create({
        title: "Error",
        description: formattedErrors,
        type: "error",
      });
      return;
    }

    onAddCustomerAddress(formData);
    setShowButton(false);
  };

  return (
    <div className="flex mt-5">
      <label className="w-1/3"></label>
      <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row space-x-2 justify-around">
            {["home", "work", "others"].map((button) => (
              <button
                key={button}
                type="button"
                onClick={() => setFormData({ ...formData, type: button })}
                className={`px-5 p-2 rounded capitalize flex-1 ${
                  formData.type === button
                    ? "bg-teal-700 text-white"
                    : "bg-transparent border border-teal-700 text-teal-700"
                }`}
              >
                {button}
              </button>
            ))}
          </div>

          {[
            { label: "Full Name", name: "fullName" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Flat/House no/Floor", name: "flat" },
            { label: "Area/Locality", name: "area" },
            { label: "Nearby Landmark", name: "landmark", required: false },
          ].map(({ label, name, required = true }) => (
            <div className="flex items-center" key={name}>
              <label className="w-1/3 text-md font-medium">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name={name}
                placeholder={label}
                className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none"
                value={formData[name]}
                onChange={handleChangeAddress}
              />
            </div>
          ))}

          <div className="flex items-center">
            <label className="w-1/3 text-md font-medium">Location</label>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={`${formData.latitude && formData.longitude ? "bg-transparent text-teal-700" : "bg-teal-700 text-white"} font-medium border border-teal-700 w-2/3 rounded-md mx-auto py-2`}
            >
              {formData.latitude && formData.longitude
                ? `Location Marked`
                : `Mark location`}
            </button>
            <Map
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onLocationSelect={handleSelectLocation}
            />
          </div>

          <div className="flex">
            <Checkbox
              checked={formData.saveAddress}
              onCheckedChange={(e) =>
                setFormData({ ...formData, saveAddress: !!e.checked })
              }
            >
              Save this address to address book
            </Checkbox>
          </div>

          {showButton && (
            <div className="flex justify-end mt-5 gap-3">
              <button
                type="button"
                className="bg-teal-700 text-white px-4 py-2 rounded w-1/2"
                onClick={handleAddNewAddress}
              >
                Add Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAddressForm;
