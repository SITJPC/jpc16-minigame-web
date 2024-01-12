import "../app/globals.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SWRConfig } from "swr";
import axios from "axios";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider storageKey="ui-theme">
    <SWRConfig value={{ fetcher: (key: string) => axios.get(key) }}>
      <App />
      <Toaster position="top-center" />
    </SWRConfig>
  </ThemeProvider>
);
