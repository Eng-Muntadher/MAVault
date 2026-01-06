import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./pages/ErrorPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorComponent}
      onReset={() => window.location.replace("/")}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 6000,
            style: {
              borderRadius: "12px",
              padding: "18px 28px",
              fontSize: "1.05rem",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              color: "white",
              maxWidth: "350px",
              background:
                "linear-gradient(170deg, #155dfc 0%, #9810fa 50%, #e60076 100%)",
            },
          }}
        />
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
