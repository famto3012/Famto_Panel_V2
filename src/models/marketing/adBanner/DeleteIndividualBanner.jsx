import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@chakra-ui/react";

import {
  DialogRoot,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { toaster } from "@/components/ui/toaster";

import { deleteIndividualBanner } from "@/hooks/adBanner/adBanner";

const DeleteIndividualBanner = ({ isOpen, onClose, bannerId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDeleteBanner = useMutation({
    mutationKey: ["delete-individual-banner", bannerId],
    mutationFn: (bannerId) => deleteIndividualBanner(bannerId, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-individual-banner"]);
      onClose();
      toaster.create({
        title: "Success",
        description: "Individual banner deleted successfully",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error while deleting individual banner",
        type: "error",
      });
    },
  });

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
            Delete app banner
          </DialogTitle>
        </DialogHeader>

        <DialogBody>Do you want to delete this banner?</DialogBody>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-gray-200 p-2 text-black outline-none focus:outline-none"
          >
            Cancel
          </Button>

          <Button
            className="bg-red-500 p-2 text-white"
            onClick={() => handleDeleteBanner.mutate(bannerId)}
          >
            {handleDeleteBanner.isPending ? `Deleting...` : `Delete`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteIndividualBanner;
