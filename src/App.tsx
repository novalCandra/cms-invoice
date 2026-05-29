import { useState } from "react";
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
import LandingPage from "./landing/page";
import SplashScreen from "./components/SplashScreen";
import AuthRouter from "../provider/Router.js"
const queryClient = new QueryClient();
function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <QueryClientProvider client={queryClient}>
        {/* <TooltipProvider> */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<AuthRouter><IndexPage /></AuthRouter>} />
            <Route path="/queue" element={<AuthRouter><QueqePage /></AuthRouter>} />
            <Route path="/messages" element={<AuthRouter><MessagePage /></AuthRouter>} />
            <Route path="/history" element={<AuthRouter><HistoryPage /></AuthRouter>} />
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
        {/* </TooltipProvider> */}
      </QueryClientProvider>
    </>
  )
}

export default App
