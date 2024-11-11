import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import ProtectedRoute from "./ProtectedRoutes";

import Loader from "../components/others/Loader";

// Lazy load each route component
const AuthRoutes = lazy(() => import("./AuthRoute"));
const HomeRoutes = lazy(() => import("./HomeRoute"));
const OrderRoutes = lazy(() => import("./OrderRoute"));
const MerchantRoutes = lazy(() => import("./MerchantRoute"));
const ProductRoutes = lazy(() => import("./ProductRoute"));
const CustomerRoutes = lazy(() => import("./CustomerRoute"));
const AgentRoutes = lazy(() => import("./AgentRoute"));
const DeliveryRoutes = lazy(() => import("./DeliveryRoute"));
const CommAndSubsRoutes = lazy(() => import("./CommAndSubsRoute"));
const MarketingRoutes = lazy(() => import("./MarketingRoute"));
const NotificationRoutes = lazy(() => import("./NotificationRoute"));
const ConfigureRoutes = lazy(() => import("./ConfigureRoute"));
const CustomizeRoutes = lazy(() => import("./CustomizeRoute"));
const AccountRoutes = lazy(() => import("./AccountRoute"));

const Routers = () => {
  const token = true;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    } else if (
      location.pathname === "/auth/sign-in" ||
      location.pathname === "/auth/sign-up"
    ) {
      navigate("/home");
    }
  }, [token, location.pathname, navigate]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/home/*" element={<HomeRoutes />} />
        <Route path="/order/*" element={<OrderRoutes />} />
        <Route
          path="/merchant/*"
          element={
            <ProtectedRoute requiredRole="Admin">
              <MerchantRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/product/*" element={<ProductRoutes />} />
        <Route path="/customer/*" element={<CustomerRoutes />} />
        <Route
          path="/agent/*"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AgentRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-management/*"
          element={
            <ProtectedRoute requiredRole="Admin">
              <DeliveryRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/comm-and-subs/*" element={<CommAndSubsRoutes />} />
        <Route path="/marketing/*" element={<MarketingRoutes />} />
        <Route path="/notification/*" element={<NotificationRoutes />} />
        <Route
          path="/configure/*"
          element={
            <ProtectedRoute requiredRole="Admin">
              <ConfigureRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customize/*"
          element={
            <ProtectedRoute requiredRole="Admin">
              <CustomizeRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/account/*" element={<AccountRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
