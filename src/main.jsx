import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import CustomRouter from "./routes/CustomRouter.jsx";
import { Provider } from "@/components/ui/provider.jsx";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomRouter>
          <App />
        </CustomRouter>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
  // </StrictMode>
);
