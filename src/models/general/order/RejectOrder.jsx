import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@chakra-ui/react";

import AuthContext from "../../../context/AuthContext";

import { rejectOrder } from "../../../hooks/order/useOrder";

const RejectOrder = ({ isOpen, onClose, orderId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const rejectOrderMutation = useMutation({
    mutationKey: ["rejectOrder"],
    mutationFn: (orderId) => rejectOrder(orderId, role, navigate),
    onSuccess: () => {
      setIsLoading(false);
      queryClient.invalidateQueries(["orders", "search-order"]);
      onClose();
      toaster.create({
        title: "Success",
        description: "Order rejected",
        type: "success",
      });
    },
    onError: () => {
      setIsLoading(false);
      toaster.create({
        title: "Error",
        description: "Failed to reject order",
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
        <DialogHeader className="text-[16px] font-[600]">Reject?</DialogHeader>
        <DialogBody>Do you want to reject this order?</DialogBody>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-gray-200 p-2 text-black outline-none focus:outline-none"
          >
            Cancel
          </Button>

          <Button
            className="bg-red-500 p-2 text-white"
            onClick={() => rejectOrderMutation.mutate(orderId)}
          >
            {rejectOrderMutation.isPending ? `Rejecting...` : `Reject`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default RejectOrder;
