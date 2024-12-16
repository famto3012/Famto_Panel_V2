import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import CustomRouter from "@/routes/CustomRouter.jsx";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { DataProvider } from "@/context/DataContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <CustomRouter>
            <App />
          </CustomRouter>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
  // </StrictMode>
);
