import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routing/AppRouter/AppRouter";
import { Toaster } from "react-hot-toast";
import { AuthUserContextProvider } from "./Context/AuthUserContext/AuthUserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthUserContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthUserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
