import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { HeaderMenu } from "./Components/Header.tsx";
import { BrowserRouter } from "react-router-dom";
import { Stack } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <Stack>
          <HeaderMenu />
          <App />
        </Stack>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
