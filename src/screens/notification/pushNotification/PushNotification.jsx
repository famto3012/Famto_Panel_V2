import Select from "react-select";
import GlobalSearch from "../../../components/others/GlobalSearch";
import { Switch } from "@/components/ui/switch";
import CropImage from "@/components/others/CropImage";
import { useQuery } from "@tanstack/react-query";
import { getAllGeofence } from "@/hooks/geofence/useGeofence";
import { useNavigate } from "react-router-dom";
import RenderIcon from "@/icons/RenderIcon";
import { userTypeForPushNotificationOptions } from "@/utils/defaultData";
import { useRef, useState } from "react";
import { Table } from "@chakra-ui/react";
import ShowSpinner from "@/components/others/ShowSpinner";

const PushNotification = () => {
  const [pushNotification, setPushNotification] = useState({
    title: "",
    description: "",
    geofenceId: "",
    customer: false,
    merchant: false,
    driver: false,
    pushNotificationImage: "",
  });
  const [imgSrc, setImgSrc] = useState("");
  const [type, setType] = useState("");
  const [croppedFile, setCroppedFile] = useState(null);
  const previewCanvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const { data: geofences } = useQuery({
    queryKey: ["all-geofence"],
    queryFn: () => getAllGeofence(navigate),
  });

  const geofenceOptions = geofences?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleInputChange = (e) => {
    setPushNotification({
      ...pushNotification,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (name, checked) => {
    setPushNotification({
      ...pushNotification,
      [name]: checked ? true : false,
    }); //INFO: Changed
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  }

  const handleCropComplete = (croppedFile) => {
    setCroppedFile(croppedFile);
    // setSelectedFile(croppedFile); // Get the cropped image file
    console.log("Cropped image file:", croppedFile);
  };

  const handleModalClose = () => {
    setCroppedFile(null); // Reset the selected file to allow new selection
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="p-5">
          <GlobalSearch />
        </div>
        <header className="font-bold ml-5">Push Notifications</header>

        <div className="bg-white text-[16px] mx-5 rounded-lg mt-5 text-gray-700">
          <form onSubmit={submitAction}>
            <div className="flex">
              <label className="mt-10 ml-10">
                Title<span className="text-red-500 ms-2">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={pushNotification?.title}
                className="border-2 border-gray-300 rounded ml-60 mt-10  w-96 p-2 outline-none focus:outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10 w-48">
                Description (This note will be shown in notification.{" "}
                <span className="text-red-500">[Visibility 30 characters]</span>
                )<span className="text-red-500 ms-2">*</span>
              </label>
              <input
                type="text"
                name="description"
                value={pushNotification?.description}
                className="border-2 border-gray-300 rounded  mt-10 ml-[94px]  w-96 outline-none focus:outline-none p-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">
                Geofence<span className="text-red-500 ms-2">*</span>
              </label>

              <Select
                options={geofenceOptions}
                value={geofenceOptions?.find(
                  (option) => option.value === pushNotification?.geofenceId
                )}
                onChange={(option) =>
                  setPushNotification({
                    ...pushNotification,
                    geofenceId: option.value,
                  })
                }
                className=" rounded ml-52 mt-10 w-96 focus:outline-none"
                placeholder="Select geofence"
                isSearchable={true}
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
            </div>
            <div className="flex">
              <label className="mt-16 ml-10">
                Image (342px x 160px)
                <span className="text-red-500 ms-2">*</span>
              </label>
              <div className=" flex items-center gap-[30px]">
                {!croppedFile && (
                  <div className="bg-gray-400 ml-[115px] mt-10 h-20 w-20 rounded-md" />
                )}
                {!!croppedFile && (
                  <figure className="ml-[115px] mt-10 h-20 w-20 rounded-md relative">
                    <img
                      ref={previewCanvasRef}
                      src={URL.createObjectURL(croppedFile)}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="pushNotificationImage"
                  id="pushNotificationImage"
                  className="hidden"
                  accept="image/*"
                  onChange={onSelectFile}
                />
                <label
                  htmlFor="pushNotificationImage"
                  className="cursor-pointer "
                >
                  <RenderIcon iconName="CameraIcon" size={16} loading={6} />
                </label>
                {imgSrc && (
                  <CropImage
                    selectedImage={img}
                    aspectRatio={16 / 9} // Optional, set aspect ratio (1:1 here)
                    onCropComplete={handleCropComplete}
                    onClose={handleModalClose} // Pass the handler to close the modal and reset the state
                  />
                )}
              </div>
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Customer App</label>
              <Switch
                onCheckedChange={(checked) => onChange("customer", checked)}
                colorPalette="teal"
                variant="solid"
                checked={pushNotification?.customer}
                className="mt-11 ml-[185px]"
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Merchant App</label>
              <Switch
                className="mt-11 ml-[185px]"
                onChange={(checked) => onChange("merchant", checked)}
                name="merchant"
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Driver App</label>
              <Switch
                className="mt-11 ml-[210px]"
                onChange={(checked) => onChange("driver", checked)}
                name="driver"
              />
            </div>
            <div className="flex justify-end  mb-10 gap-4">
              <button
                className="bg-gray-200 rounded-lg px-8 py-2 right-10 mb-5 mr-5 font-semibold justify-end"
                type="submit"
              >
                Cancel
              </button>
              <button
                className="bg-teal-800 rounded-lg px-8 py-2 right-5 mb-5 mr-10 text-white font-semibold justify-end"
                type="submit"
              >
                {isDataLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>

        <p className="font-bold ml-5">Push Notification log</p>

        <div className="bg-white mx-5 rounded-lg mt-5 flex p-8 justify-between">
          <Select
            options={userTypeForPushNotificationOptions}
            value={userTypeForPushNotificationOptions.find(
              (option) => option.value === type
            )}
            onChange={(option) => onTypeChange(option.value)}
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Type of user"
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
          <div>
            <input
              type="search"
              name="search"
              placeholder="Search push notification name"
              className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px] ml-5 w-72"
              value={searchFilter}
              onChange={onSearchChange}
            />
          </div>
        </div>

        <Table.Root striped interactive>
          <Table.Header>
            <Table.Row className="bg-teal-700 h-[70px]">
              {[
                "Type of User",
                "Description",
                "Image",
                "Customer App",
                "Driver App",
                "Merchant App",
                "Action",
              ].map((header) => (
                <Table.ColumnHeader
                  key={header}
                  color="white"
                  textAlign="center"
                >
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading && (
              <Table.Row className="h-[70px]">
                <Table.Cell colSpan={6} textAlign="center">
                  <ShowSpinner /> Loading...
                </Table.Cell>
              </Table.Row>
            )}

            {!isLoading && data?.length === 0 && (
              <Table.Row className="h-[70px]">
                <Table.Cell colSpan={6} textAlign="center">
                  No data available
                </Table.Cell>
              </Table.Row>
            )}

            {!isLoading &&
              data?.map((data) => (
                <Table.Row
                  key={data?._id}
                  className="text-center h-20 even:bg-gray-200"
                >
                  <Table.Cell textAlign="center">
                    {data?.customer && data?.driver && data?.merchant
                      ? "All"
                      : type}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {" "}
                    {data?.description.length > 30
                      ? `${data?.description?.substring(0, 30)}...`
                      : data?.description}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <figure className="h-[70px] w-[100px]">
                      <img
                        src={data?.imageUrl}
                        className="w-full h-full object-contain"
                      />
                    </figure>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Switch checked={data?.customer} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Switch checked={data?.driver} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Switch checked={data?.merchant} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => showModal(data?._id)}>
                        <RenderIcon
                          iconName="UploadIcon"
                          size={16}
                          loading={6}
                          className="bg-green-100 text-green-500 text-[35px] p-2  rounded-lg"
                        />
                      </button>
                      <button
                        className="outline-none focus:outline-none"
                        onClick={() => showModalDelete(data?._id)}
                      >
                        <RenderIcon
                          iconName="DeleteIcon"
                          size={16}
                          loading={6}
                          className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]"
                        />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default PushNotification;
