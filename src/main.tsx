import "../app/globals.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider storageKey="ui-theme">
    <App />
    <Toaster position="top-center" />
  </ThemeProvider>
);
