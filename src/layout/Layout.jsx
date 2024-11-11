import { useLocation } from "react-router-dom";

import Routers from "../routes/Routers";

import MainSideBar from "../components/sideBar/MainSideBar";
import SmallSideBar from "../components/sideBar/SmallSideBar";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const pathsForNoSideBar = ["sign-in", "sign-up"];
  const pathsForSmallSidebar = ["delivery-management", "payout", "order"];

  const noSidebar = pathsForNoSideBar.some((p) => path.includes(p));
  const showSmallSidebar = pathsForSmallSidebar.some((p) => path.includes(p));

  return (
    <>
      {!noSidebar && (showSmallSidebar ? <SmallSideBar /> : <MainSideBar />)}
      <main
        className={`h-screen w-full ${
          noSidebar ? "" : showSmallSidebar ? "ps-[4rem]" : "ps-[270px]"
        }`}
      >
        <Routers />
      </main>
    </>
  );
};

export default Layout;
