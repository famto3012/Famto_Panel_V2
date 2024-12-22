import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { createContext, useContext, useEffect, useState } from "react";

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const secretKey = import.meta.env.VITE_APP_LOCALSTORAGE_KEY;

const encryptStorage = new EncryptStorage(secretKey, {
  prefix: "FAMTO",
});

export const SoundProvider = ({ children }) => {
  const playNewOrderNotificationSound = () => {
    const newOrderSoundUrl = new Audio(
      "https://res.cloudinary.com/dajlabmrb/video/upload/v1724931153/orderCreateAndRejectAudio_dg1rle.mp3"
    );
    newOrderSoundUrl.play();
  };

  const playNewNotificationSound = () => {
    const playNewNotification = new Audio(
      "https://res.cloudinary.com/dajlabmrb/video/upload/v1724931165/46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound_gyz5ux.mp3"
    );
    playNewNotification.play();
  };

  const [showBadge, setShowBadge] = useState(false);
  const [newOrder, setNewOrder] = useState("");
  const [orderRejected, setOrderRejected] = useState("");
  const [scheduledOrder, setScheduledOrder] = useState("");
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const token = encryptStorage.getItem("token");

    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/admin/notification/notification-setting/context`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const { data } = response.data;

          const newOrderNotification = data.filter(
            (item) => item.event === "newOrderCreated"
          );

          const orderRejectedNotification = data.filter(
            (item) => item.event === "orderRejected"
          );

          const scheduledOrderNotification = data.filter(
            (item) => item.event === "scheduledOrderCreated"
          );
          // Set the titles in respective useState hooks
          setNewOrder(newOrderNotification[0]?.title || "");
          setOrderRejected(orderRejectedNotification[0]?.title || "");
          setScheduledOrder(scheduledOrderNotification[0]?.title || "");

          setNotification(data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      }
    };

    fetchData();
  }, []);

  return (
    <SoundContext.Provider
      value={{
        playNewOrderNotificationSound,
        playNewNotificationSound,
        setShowBadge,
        showBadge,
        newOrder,
        setNewOrder,
        orderRejected,
        setOrderRejected,
        scheduledOrder,
        setScheduledOrder,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
