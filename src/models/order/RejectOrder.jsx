import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { rejectOrder } from "../../hooks/order/useOrder";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RejectOrder = ({ isVisible, onClose, orderId, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const rejectOrderMutation = useMutation({
    mutationKey: ["rejectOrder"],
    mutationFn: (orderId) => rejectOrder(orderId, role, navigate),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (_, orderId) => {
      setIsLoading(false);
      onConfirm(orderId);
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
      open={isVisible}
      onClose={onClose}
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
            {isLoading ? `Rejecting...` : `Reject`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default RejectOrder;
