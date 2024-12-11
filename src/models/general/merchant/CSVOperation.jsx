import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DialogRoot,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { toaster } from "@/components/ui/toaster";

const CSVOperation = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
          <DialogTitle className="font-[600] text-[18px]"> </DialogTitle>
        </DialogHeader>

        <DialogBody>CSV</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default CSVOperation;
