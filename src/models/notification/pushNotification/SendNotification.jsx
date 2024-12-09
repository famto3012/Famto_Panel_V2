import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";

const SendNotification = ({ isOpen, onClose, selectedId }) => {
  return (
    <DialogRoot
      open={isOpen}
      onInteractOutside={onClose}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent>
        <DialogCloseTrigger onClick={onClose} />
        <DialogHeader className="text-[16px] font-[600]">
          Send push notification
        </DialogHeader>
        <DialogBody>
          <p className="font-semibold text-[18px] mb-5">
            Are you sure you want to Send?
          </p>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end">
            <form>
              <Button
                type="button"
                className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={(e) => sendNotification(e, currentId)}
                className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"
              >
                {dataLoading ? "Sending..." : "Send"}
              </Button>
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SendNotification;
