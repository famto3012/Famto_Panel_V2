import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import CustomRouter from "./routes/CustomRouter.jsx";
import { Provider } from "@/components/ui/provider.jsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <CustomRouter>
        <App />
      </CustomRouter>
    </Provider>
  </StrictMode>
);
