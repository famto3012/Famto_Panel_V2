import { useEffect, useState } from "react";

import RenderIcon from "@/icons/RenderIcon";
import Logout from "@/models/auth/Logout";
import { useSoundContext } from "@/context/SoundContext";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { Avatar, Circle, Float } from "@chakra-ui/react";

const GlobalSearch = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    playNewOrderNotificationSound,
    playNewNotificationSound,
    setShowBadge,
    showBadge,
    newOrder,
    orderRejected,
    scheduledOrder,
  } = useSoundContext();

  const navigate = useNavigate();

  const handleNotificationLog = () => {
    navigate("/notification/logs");
    setShowBadge(false);
  };

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  };

  const handleNotification = (payload) => {
    if (
      payload.notification.title === newOrder ||
      payload.notification.title === orderRejected ||
      payload.notification.title === scheduledOrder
    ) {
      console.log("Handle notification");
      console.log("New order sound");
      console.log("New order sound", newOrder);
      console.log("New order sound", orderRejected);
      console.log("New order sound", scheduledOrder);
      playNewOrderNotificationSound();
      setShowBadge(true);
    } else {
      console.log("Handle notification");
      console.log("New Notification sound");
      playNewNotificationSound();
      setShowBadge(true);
    }
    // addNotificationToTable(payload.notification);
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    console.log("New order sound", newOrder);
    console.log("New order sound", orderRejected);
    console.log("New order sound", scheduledOrder);
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "NOTIFICATION_RECEIVED") {
        console.log("Message received in foreground from background");
        const payload = event.data.payload;
        handleNotification(payload);
        setShowBadge(true);
      }
    });

    // Handle messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log("Received foreground message ", payload);
      handleNotification(payload);
      setShowBadge(true);
    });
  }, []);

  return (
    <div className="flex items-center justify-end pt-[20px] pe-[30px] bg-gray-100">
      <Avatar.Root className="bg-gray-100" variant="subtle">
        <Avatar.Fallback onClick={handleNotificationLog}>
          <span className="bg-white">
            <RenderIcon iconName="NotificationIcon" size={18} loading={6} />
          </span>
        </Avatar.Fallback>
        {showBadge && (
          <Float placement="bottom-end" offsetX="2.5" offsetY="2.5">
            <Circle
              bg="red.500"
              size="10px"
              outline="0.2em solid"
              outlineColor="bg"
            />
          </Float>
        )}
      </Avatar.Root>
      <div className="relative me-4">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
          <span className="text-xl text-gray-500">
            <RenderIcon iconName="SearchIcon" size={22} loading={6} />
          </span>
        </button>
      </div>

      <span onClick={() => setShowModal(!showModal)} className="cursor-pointer">
        <RenderIcon iconName="LogoutIcon" size={24} loading={6} />
      </span>

      <Logout isOpen={showModal} onClose={() => setShowModal(!showModal)} />
    </div>
  );
};

export default GlobalSearch;
