import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "../components/others/Loader";

const SignUp = lazy(() => import("../screens/auth/SignUp"));
const SignIn = lazy(() => import("../screens/auth/SignIn"));

const AuthRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
    </Routes>
  </Suspense>
);

export default AuthRoutes;
