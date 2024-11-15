import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "../components/others/Loader";

const Home = lazy(() => import("../screens/general/Home/Home"));

const HomeRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="" element={<Home />} />
    </Routes>
  </Suspense>
);

export default HomeRoutes;
