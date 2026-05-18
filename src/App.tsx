import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { TooltipProvider } from "../client/components/ui/tooltip";
import { Toaster } from "../client/components/ui/sonner";
import { Toaster as Sonner } from "../client/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./auth/page/Login";
import RegisterPage from "./auth/page/Register";
import IndexPage from "./router";
import QueqePage from "./users/page/Queqe";
import MessagePage from "./users/page/message";
import HistoryPage from "./users/page/history";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <TooltipProvider> */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<IndexPage />} />
            <Route path="/queue" element={<QueqePage />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/history" element={<HistoryPage />} />
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
        {/* </TooltipProvider> */}
      </QueryClientProvider>
    </>
  )
}

export default App
