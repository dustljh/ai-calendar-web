import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom' // 추가
import { Toaster } from 'sonner';

import "./index.css"
import App from "./App.tsx"
import RootLayout from "../src/page/layout.tsx"
import SignUp from "./page/sign-up/index.tsx"
import SignIn from "./page/sign-in/index.tsx"
import AiCalendar from "./page/ai-calendar/index.tsx"

import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename="/ai-calendar-web">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<App />} />

            <Route path="/ai-calendar" element={<AiCalendar />} />
            <Route path="/ai-calendar/:chatId" element={<AiCalendar />} />

            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </StrictMode>
)