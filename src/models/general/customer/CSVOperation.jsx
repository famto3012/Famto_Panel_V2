import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import {
  DialogRoot,
  DialogContent,
  DialogCloseTrigger,
  DialogBody,
} from "@/components/ui/dialog";
import RenderIcon from "@/icons/RenderIcon";

// TODO: Implement CSV Operation
const CSVOperation = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const selectedCSVFile = null;

  return (
    <DialogRoot
      open={isOpen}
      onInteractOutside={onClose}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent>
        <DialogCloseTrigger onClick={onClose} />

        <DialogBody>
          <div className="flex rounded-xl justify-between p-10">
            <div className="flex flex-col">
              <label
                htmlFor="uploadCSV"
                className="flex gap-2 p-3 w-fit bg-cyan-200 px-5 font-[500] rounded-xl border cursor-pointer"
              >
                <RenderIcon iconName="UploadIcon" size={20} loading={6} />
                Upload
              </label>
              <input
                id="uploadCSV"
                type="file"
                className="hidden"
                onClick={() => {}}
              />
              <p
                onClick={() => {}}
                className="text-gray-500 hover:underline mx-2 mt-2 underline-offset-2 cursor-pointer"
              >
                Download Sample CSV
              </p>
              {selectedCSVFile && (
                <div className="flex items-center gap-4 mt-[20px]">
                  <p>{selectedCSVFile?.name}</p>
                  <RenderIcon iconName="UploadIcon" size={20} loading={6} />
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => {}}
                className="flex gap-2 p-3 bg-teal-800 rounded-xl px-5 border text-white cursor-pointer"
              >
                <div className="flex items-center gap-[10px]">
                  <RenderIcon iconName="DownloadIcon" size={20} loading={6} />
                  <span>Download CSV</span>
                </div>
              </button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default CSVOperation;
